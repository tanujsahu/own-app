import { Routes } from "@angular/router";
import { EventComponent } from "./event/event.component";
import { UpcomminComponent } from "./upcommin/upcommin.component";

export const EventRouting: Routes = [
    { path: '', component: EventComponent },
    { path: 'upcomming-event', component: UpcomminComponent }
]