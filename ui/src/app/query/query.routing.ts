import { Routes } from "@angular/router";
import { CreateComponent } from "./create/create.component";
import { ListComponent } from "./list/list.component";
import { PopupComponent } from "./popup/popup.component";

export const QueryRoute: Routes = [
    { path: '', component: ListComponent },
    { path: 'create', component: CreateComponent },
    { path: 'popup', component: PopupComponent }


]