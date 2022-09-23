import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GestionnaireComponent } from './gestionnaire.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'gestionnaire', component: GestionnaireComponent }
    ])
  ],
  exports: [RouterModule]
})
export class GestionnaireRoutingModule { }
