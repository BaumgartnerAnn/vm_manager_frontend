import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';

const components = [
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatChipsModule,
  MatSliderModule,
  MatFormFieldModule,
  MatDialogModule,
  MatDividerModule,
  MatListModule,
  MatCheckboxModule,
  MatSelectModule,
  MatOptionModule,
  CdkVirtualScrollViewport,
  MatTableModule,
  MatSortModule,
  MatSnackBarModule
];


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ...components
  ],
  exports: components,
})
export class MaterialModule { }
