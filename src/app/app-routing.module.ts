import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableauBordComponent } from './tableauBord/tableau-bord.component';
import { GestionnaireComponent } from './gestionnaire/gestionnaire.component';
import { PermissionComponent } from './permission/permission.component';
import { ApplicationComponent } from './application/application.component';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      /* define app module routes here, e.g., to lazily load a module
         (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
       */
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
