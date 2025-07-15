import { SensorDatos } from "src/app/types/sensor.types";
import { Component, inject, Signal } from "@angular/core";
import { SensorStateService } from "src/app/services/sensor-state.service";
import { SensorDetailComponent } from "../sensor-detail/sensor-detail.component";

@Component({
  selector: "app-sensor-list",
  standalone: true,
  imports: [SensorDetailComponent],
  templateUrl: "./sensor-list.component.html",
  styleUrl: "./sensor-list.component.css",
})
export class SensorListComponent {
  sensorState = inject(SensorStateService);
  sensorsList: Signal<SensorDatos[]> = this.sensorState.sensorsList;
}
