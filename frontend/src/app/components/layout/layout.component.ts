import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogService } from 'src/app/servicios/dialog.service';

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [HeaderComponent, DialogComponent],
  templateUrl: "./layout.component.html",
  styleUrl: "./layout.component.css",
})
export class LayoutComponent {
  isDialogOpen = inject(DialogService).isDialogOpen
}
