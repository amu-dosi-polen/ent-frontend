import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApplicationComponent } from './application.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'application', component: ApplicationComponent }
    ])
  ],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
