import { Component, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { Part, Brand, Category } from '../../interfaces/part.interface';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-part-list',
  standalone: true,
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './part-list.html',
  styleUrl: './part-list.scss'
})
export class PartListComponent implements OnInit {

  parts = signal<Part[]>([]);
  brands = signal<Brand[]>([]);
  categories = signal<Category[]>([]);

  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 12;

  selectedBrandId: number | null = null;
  selectedCategoryId: number | null = null;
  
  isLoading = signal<boolean>(false);

  constructor(private partService: ApiService) {}

  ngOnInit(): void {
    this.loadBrands();
    this.loadCategories();
    this.loadParts();
  }

  /********************************************
 * 
 * 
 *                API CALLS
 * 
 * 
 *******************************************/

  loadBrands(): void {
    this.partService.getBrands().subscribe({
      next: (data) => {
        this.brands.set(data.member)
      },
      error: (err) => console.error('Erreur chargement marques', err)
    });
  }

  loadCategories(): void {
    this.partService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data.member)
      },
      error: (err) => console.error('Erreur chargement catégories', err)
    });
  }

  loadParts(): void {
    const brandIri = this.selectedBrandId
      ? `/api/brands/${this.selectedBrandId}`
      : undefined;

    const categoryIri = this.selectedCategoryId
      ? `/api/categories/${this.selectedCategoryId}`
      : undefined;

    this.isLoading.set(true);
    this.partService.getParts(this.currentPage, brandIri, categoryIri).subscribe({
      next: (data) => {
        this.parts.set(data.member);
        this.isLoading.set(false);
        this.totalItems = data.totalItems;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des pièces', err);
        this.isLoading.set(false);
      }
    });
  }


  /********************************************
   * 
   * 
   *                FILTRES
   * 
   * 
   *******************************************/

  onFilterChange(): void {
    this.currentPage = 1; // Toujours revenir à la page 1 quand on filtre
    this.loadParts();
  }

  /********************************************
   * 
   * 
   *                PAGINATION
   * 
   * 
   *******************************************/
  

  goToPage(page: number): void {
    if (page < 1 || page > this.nbPages) return;
    this.currentPage = page;
    this.loadParts();
  }

  get nbPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get lastItemIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }


  /********************************************
   * 
   * 
   *                AFFICHAGE
   * 
   * 
   *******************************************/

  getStockClass(part: Part): string {
    if (part.stock === 0) return 'danger';
    if (part.stock <= 3) return 'warning';
    return 'success';
  }

  getStockLabel(part: Part): string {
    if (part.stock === 0) return 'Rupture';
    if (part.stock <= 3) return `Stock faible (${part.stock})`;
    return `En stock (${part.stock})`;
  }

}