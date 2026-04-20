import { Injectable } from '@angular/core';
// Import de toutes les classes dont l'intercepteur aura besoin
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  // Deux propriétés importantes : la requête HTTP en soi et un gestionnaire de requêtes HTTP, le Handler.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // On récupère le token depuis le service d'authentification
    const token = this.authService.getToken();
    if (!token) {
      return next.handle(req);
    }
    // Si on a bien passé le premier test et qu'on a bien un token, alors on rajoute le token par dessus les headers de la requête interceptée
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(authReq);
  }
}