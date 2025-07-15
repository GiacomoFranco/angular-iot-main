import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: "app-app",
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  webSocketService = inject(WebSocketService);
}
