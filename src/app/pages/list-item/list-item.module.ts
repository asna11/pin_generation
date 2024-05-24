import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from '../list-item/list-item.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ListItemComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [
    ListItemComponent
  ]
})
export class ListItemModule { }
