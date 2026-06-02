import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { AuthService } from './services/auth-service';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('angular_autopote');
  
  isLoaded = signal<boolean>(false);
  constructor(private monAuthService: AuthService) {}

  ngOnInit(): void {
    this.monAuthService.fetchJwtToken().subscribe({
      next: (response) => {
        this.isLoaded.set(true);
        console.log(response);
      },
      error: (err) => {
        console.error('Impossible de récupérer le JWT');
        console.log(err);
      }
    });
  }

}