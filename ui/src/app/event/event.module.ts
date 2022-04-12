import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event/event.component';
import { RouterModule } from '@angular/router';
import { EventRouting } from './event.routing';
import { MaterialModuleModule } from 'app/common/material-module.module';
import { AddEventComponent } from './add-event/add-event.component';
import { UpcomminComponent } from './upcommin/upcommin.component';

@NgModule({
  declarations: [EventComponent, AddEventComponent, UpcomminComponent],
  imports: [CommonModule, RouterModule.forChild(EventRouting), MaterialModuleModule],
})

export class EventModule { }
