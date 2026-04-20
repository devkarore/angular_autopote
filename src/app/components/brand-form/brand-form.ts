import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api-service';
@Component({
  selector: 'app-brand-form',
  imports: [ReactiveFormsModule],
  templateUrl: './brand-form.html',
  styleUrl: './brand-form.scss',
})
export class BrandForm {

  formulaire: FormGroup;
  constructor(private fb: FormBuilder, private apiService: ApiService) {

    this.formulaire = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      country: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]]
    });

  }

  soumettre() {
    if(this.formulaire.valid) {
      this.apiService.postBrand(this.formulaire.value).subscribe({
        next: (response) => {
        }
      });
    } else {
      console.log('Formulaire invalide')!
    }
  }
}