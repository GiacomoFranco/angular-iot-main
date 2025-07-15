import { DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RESOURCES } from 'src/app/constants/constants';
import { MensajeErrorSensor } from 'src/app/types/sensor.types';

@Component({
  selector: "app-alert-detail",
  standalone: true,
  imports: [DatePipe],
  templateUrl: "./alert-detail.component.html",
  styleUrl: "./alert-detail.component.css",
})
export class AlertDetailComponent {
  alert = input.required<MensajeErrorSensor>();
  icon = computed(() => RESOURCES[this.alert().datos.severidad].svg);
}
