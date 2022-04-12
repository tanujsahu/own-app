import { Routes } from "@angular/router";
import { ForgotComponent } from "./forgot/forgot.component";

export const ForgotRoutes: Routes = [
    { path: '', component: ForgotComponent },
    { path: 'forgot', component: ForgotComponent }
]