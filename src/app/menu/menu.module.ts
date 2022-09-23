import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
// import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { MenuComponent, DialogAddMenuDialog, DialogDeleteMenuDialog, DialogUpdateMenuDialog } from './menu.component';
import { MenuRoutingModule } from './menu-routing.module';
import { NavbarModule } from '../navbar/navbar.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  imports: [CommonModule, RouterModule, BrowserModule, MenuRoutingModule, FormsModule, ReactiveFormsModule, CdkTableModule, MatAutocompleteModule,
    MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule,
    MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
    MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,
    MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, NavbarModule,
    BsDropdownModule.forRoot(), DragDropModule,ScrollingModule, ScrollDispatchModule
  ],
  declarations: [
    MenuComponent,
    DialogAddMenuDialog,
    DialogDeleteMenuDialog,
    DialogUpdateMenuDialog
  ],
  providers: [],
  entryComponents: [
    DialogAddMenuDialog,
    DialogDeleteMenuDialog,
    DialogUpdateMenuDialog,
  ]
})
export class MenuModule { }
