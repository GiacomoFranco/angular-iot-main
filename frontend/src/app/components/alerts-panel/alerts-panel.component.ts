import { Component, inject } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { AlertDetailComponent } from "../alert-detail/alert-detail.component";

@Component({
  selector: 'app-alerts-panel',
  standalone: true,
  imports: [AlertDetailComponent],
  templateUrl: './alerts-panel.component.html',
  styleUrl: './alerts-panel.component.css'
})
export class AlertsPanelComponent {
  alerts = inject(AlertsService).history
}
