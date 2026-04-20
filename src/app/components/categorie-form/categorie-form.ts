import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-categorie-form',
  imports: [ReactiveFormsModule],
  templateUrl: './categorie-form.html',
  styleUrl: './categorie-form.scss',
})
export class CategorieForm {

  formulaire: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService){
    this.formulaire = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  soumettre(): void {
    if (this.formulaire.valid) {
      this.apiService.postCategorie(this.formulaire.value).subscribe({
        next: (response) => {
          console.log(response);
        }
      });
      console.log('Formulaire valide !');
      console.log(this.formulaire.value);
    } else {
      console.log('Formulaire invalide');
    }
  }

}