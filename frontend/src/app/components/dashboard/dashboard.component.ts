import { Component } from '@angular/core';
import { SensorListComponent } from '../sensor-list/sensor-list.component';
import { AlertsPanelComponent } from '../alerts-panel/alerts-panel.component';
import { SensorFilterComponent } from "../sensor-filter/sensor-filter.component";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [SensorListComponent, AlertsPanelComponent, SensorFilterComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent {
}
