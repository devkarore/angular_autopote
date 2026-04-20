import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}
  // On appelle l'URL de login
  fetchJwtToken() {
    return this.http.post<{ token: string }>(
      'https://localhost:8000/api/login',
      {
        email: "admin@autopote.fr", // ATTENTION NE JAMAIS ECRIRE DES IDENTIFIANTS EN DUR DANS LE CODE
        password: "password123" // LE TYPESCRIPT EST VISIBLE POUR LES UTILISATEURS QUI INSPECTENT LE CODE
      }
    ).pipe(
      tap(response => {
        localStorage.setItem('api_jwt', response.token);
      })
    );
  }
  getToken(): string | null {
    return localStorage.getItem('api_jwt');
  }
  clearToken(): void {
    localStorage.removeItem('api_jwt');
  }
}