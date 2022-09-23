import { SidebarModule } from 'ng-sidebar';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule,
  MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,
  MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatBadgeModule } from '@angular/material';

import { TableauBordRoutingModule } from './tableau-bord-routing.module';
import { TableauBordComponent } from './tableau-bord.component';
import { NavbarModule } from '../navbar/navbar.module';
import {CdkTableModule} from '@angular/cdk/table';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogEntInfoDialog } from './tableau-bord.component';

@NgModule({
  imports: [CommonModule, RouterModule, BrowserModule, TableauBordRoutingModule, MatAutocompleteModule,
    MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule,
    MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
    MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,
    MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, NavbarModule,
    FormsModule, AngularFontAwesomeModule, SidebarModule.forRoot(), DragDropModule, MatBadgeModule
  ],
  declarations: [
    TableauBordComponent,
    DialogEntInfoDialog,
  ],
  providers: [],
  entryComponents: [
    DialogEntInfoDialog,
  ]
})
export class TableauBordModule { }
