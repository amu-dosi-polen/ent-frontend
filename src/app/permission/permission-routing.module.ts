import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PermissionComponent } from './permission.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'permission', component: PermissionComponent }
    ])
  ],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }
