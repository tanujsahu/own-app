import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TrimPipePipe } from './trim-pipe.pipe';
import { RemoveWhitespacePipe } from './remove-whitespace.pipe';

const module = [MatSnackBarModule,MatNativeDateModule, MatDatepickerModule, MatSelectModule, MatSortModule, MatTooltipModule, MatPaginatorModule, MatCardModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatDividerModule, MatIconModule, MatTableModule, MatDialogModule]

@NgModule({
  declarations: [
    TrimPipePipe,
    RemoveWhitespacePipe
  ],
  imports: [CommonModule, module],
  exports: [module]
})

export class MaterialModuleModule { }
