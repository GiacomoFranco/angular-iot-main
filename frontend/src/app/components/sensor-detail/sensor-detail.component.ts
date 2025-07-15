import { Component, computed, effect, inject, input } from '@angular/core';
import { RESOURCES } from 'src/app/constants/constants';
import { StateTagDirective } from 'src/app/directives/state-tag.directive';
import { SensorStateService } from 'src/app/services/sensor-state.service';

@Component({
  selector: "app-sensor-detail",
  standalone: true,
  imports: [StateTagDirective],
  templateUrl: "./sensor-detail.component.html",
  styleUrl: "./sensor-detail.component.css",
})
export class SensorDetailComponent {
  sensorState = inject(SensorStateService);

  sensorId = input.required<string>();
  sensorData = computed(() =>
    this.sensorState.getSensorbById(this.sensorId())()
  );
  icon = computed(() => RESOURCES[this.sensorData().tipo].svg);

  constructor() {
    effect(() => console.log(this.sensorData()));
  }
}
