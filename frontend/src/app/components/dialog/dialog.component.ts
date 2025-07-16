import { Component, computed, inject } from '@angular/core';
import { RESOURCES } from 'src/app/constants/constants';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  dialogService = inject(DialogService);
  dialogMessage = computed(() => this.dialogService.dialogMessage());
  icon = computed(() => RESOURCES[this.dialogMessage().datos.severidad].svg);
  isSeverityHigh = computed(() => this.dialogMessage().datos.severidad === 'alta');
}
