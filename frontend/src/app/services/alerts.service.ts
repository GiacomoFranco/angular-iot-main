import { inject, Injectable, signal } from '@angular/core';
import { MensajeErrorSensor } from '../types/sensor.types';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: "root",
})
export class AlertsService {
  private historySignal = signal<MensajeErrorSensor[]>([]);
  private dialogService = inject(DialogService);
  public history = this.historySignal.asReadonly();
  private alertTimeout: any;

  public handleError(error: MensajeErrorSensor): void {
    this.alertTimeout && clearTimeout(this.alertTimeout);
    this.dialogService.openDialog(error);
    this.updateHistory(error);

    this.alertTimeout = setTimeout(() => {
      this.dialogService.closeDialog();
    }, 5000);
  }

  private updateHistory(error: any): void {
    this.historySignal.update((prev) => [...prev, error]);
  }
}
