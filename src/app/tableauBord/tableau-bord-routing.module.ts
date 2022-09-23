import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableauBordComponent } from './tableau-bord.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'tableau-bord', component: TableauBordComponent }
    ])
  ],
  exports: [RouterModule]
})
export class TableauBordRoutingModule { }
