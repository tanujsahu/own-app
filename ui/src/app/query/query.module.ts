import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { PopupComponent } from './popup/popup.component';
import { MaterialModuleModule } from 'app/common/material-module.module';
import { RouterModule } from '@angular/router';
import { QueryRoute } from './query.routing';
import { AnswerComponent } from './answer/answer.component';

@NgModule({
  declarations: [ListComponent, CreateComponent, PopupComponent, AnswerComponent],
  imports: [
    CommonModule, MaterialModuleModule, RouterModule.forChild(QueryRoute)
  ]
})
export class QueryModule { }
