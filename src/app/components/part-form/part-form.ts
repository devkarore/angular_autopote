import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api-service';
import { BrandCollection, CategoryCollection } from '../../interfaces/part.interface';
@Component({
  selector: 'app-brand-form',
  imports: [ReactiveFormsModule],
  templateUrl: './part-form.html',
  styleUrl: './part-form.scss',
})
export class PartForm implements OnInit {

  formulaire: FormGroup;
  brands = signal<BrandCollection>({member: [], totalItems: 0});
  categories = signal<CategoryCollection>({member: [], totalItems: 0});

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.formulaire = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],
      brandId: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.apiService.getBrands().subscribe({
      next: (response) => {
        this.brands.set(response);
      }
    });
    this.apiService.getCategories().subscribe({
      next: (response) => {
        this.categories.set(response);
      }
    });
  }

  soumettre() {
    if(this.formulaire.valid) {
      const payload = {
        ...this.formulaire.value,
        brandId: Number(this.formulaire.value.brandId), 
        categoryId: Number(this.formulaire.value.categoryId)
      }
      this.apiService.postPart(payload).subscribe({
        next: (response) => {
          console.log(response);
        }
      });
    } else {
      console.log('Formulaire invalide')!
    }
  }
}