import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PartCollection } from '../interfaces/part.interface';
import { BrandCollection } from '../interfaces/part.interface';
import { CategoryCollection } from '../interfaces/part.interface';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiUrl = 'https://localhost:8000/api';

  constructor(private http: HttpClient, private monAuthService: AuthService) {}

  getParts(page: number = 1, brandIri?: string, categoryIri?: string): Observable<PartCollection> {

    let params = new HttpParams().set('page', page);

    if (brandIri) {
      params = params.set('brand', brandIri);
    }

    if (categoryIri) {
      params = params.set('category', categoryIri);
    }

    return this.http.get<PartCollection>(`${this.apiUrl}/parts`, { params });
  }

  getBrands(): Observable<BrandCollection> {
    
    return this.http.get<BrandCollection>(`${this.apiUrl}/brands`);
  }

  getCategories(): Observable<CategoryCollection> {
    return this.http.get<CategoryCollection>(`${this.apiUrl}/categories`);
  }

  postCategorie(formValues: FormData) {
    return this.http.post(`${this.apiUrl}/categories`, formValues);
  }

  postBrand(formValues: FormData) {
    return this.http.post(`${this.apiUrl}/brands`, formValues);
  }
}