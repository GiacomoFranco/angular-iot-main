import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

export const routeConfig: Routes = [
  {
    path: "",
    component: DashboardComponent,
    title: "Dashboard",
  },
];
