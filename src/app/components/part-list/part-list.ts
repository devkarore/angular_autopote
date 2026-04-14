import { Component, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { Part, Brand, Category} from '../../interfaces/part.interface';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-part-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './part-list.html',
  styleUrl: './part-list.scss'
})
export class PartListComponent implements OnInit {

  // On prépare les tableaux qui vont recevoir les pièces ou les brands
  parts = signal<Part[]>([]);
  brands = signal<Brand[]>([]);
  category = signal<Category[]>([]);

  // Les variables qui vont nous aider à paginer
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 12;

  // La variable qui va contenir la valeur du select 
  selectedBrandId: number | null = null;
  selectedCategoryId: number | null = null;
  
  // État du chargement
  isLoading = signal<boolean>(false);

  constructor(private partService: ApiService) {}

  ngOnInit(): void {
    this.loadBrands();
    this.loadCategory();
    this.loadParts();
  }

  /********************************************
 * 
 * 
 *                API CALLS
 * 
 * 
 *******************************************/

  // Chargement des Category
  loadCategory(): void {
    this.partService.getCategory().subscribe({
      next: (data) => {
        this.category.set(data.member)
      },
      error: (err) => console.error('Erreur chargement catégories', err)
    });
  }

  // Chargement des Brands
  loadBrands(): void {
    this.partService.getBrands().subscribe({
      next: (data) => {
        this.brands.set(data.member)
      },
      error: (err) => console.error('Erreur chargement marques', err)
    });
  }

  // Chargement des pièces
  loadParts(): void {

    // Construction de l'IRI de la Brand
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

  // Méthode lancée dès que le select des Brand est modifié
  onBrandChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedBrandId = value ? Number(value) : null;
    this.currentPage = 1; // Quand on change un filtre, on repasse en page 1 (c'est une règle générale)
    this.loadParts();
  }
  onCategoryChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedCategoryId = value ? Number(value) : null;
    this.currentPage = 1; // Quand on change un filtre, on repasse en page 1 (c'est une règle générale)
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
   *       AFFICHAGE / GESTION DE CLASSE
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