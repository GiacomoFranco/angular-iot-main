import { Injectable, signal } from '@angular/core';
import { MensajeErrorSensor } from '../types/sensor.types';

@Injectable({
  providedIn: "root",
})
export class DialogService {
  protected isDialogOpenSignal = signal<boolean>(false);
  isDialogOpen = this.isDialogOpenSignal.asReadonly();
  dialogMessage = signal<MensajeErrorSensor>({} as MensajeErrorSensor);

  openDialog(error: MensajeErrorSensor) {
    this.dialogMessage.set(error);
    this.isDialogOpenSignal.set(true);
  }

  closeDialog() {
    this.isDialogOpenSignal.set(false);
  }
}
