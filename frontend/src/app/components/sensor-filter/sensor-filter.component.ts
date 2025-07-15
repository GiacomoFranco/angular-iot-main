import { TitleCasePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, computed, inject } from '@angular/core';
import { SensorFilterService } from 'src/app/services/sensor-filter.service';

@Component({
  selector: 'app-sensor-filter',
  standalone: true,
  imports: [TitleCasePipe, ReactiveFormsModule],
  templateUrl: './sensor-filter.component.html',
  styleUrl: './sensor-filter.component.css'
})
export class SensorFilterComponent {
  filteredSensorsService = inject(SensorFilterService);
  sensors = computed(() => this.filteredSensorsService.filteredSensors());
}
