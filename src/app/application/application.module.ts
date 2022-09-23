import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
// import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ApplicationComponent, DialogAddApplicationDialog, DialogDeleteApplicationDialog, DialogUpdateApplicationDialog } from './application.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { NavbarModule } from '../navbar/navbar.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AmazingTimePickerModule } from 'amazing-time-picker';


@NgModule({
  imports: [CommonModule, RouterModule, BrowserModule, ApplicationRoutingModule, FormsModule, ReactiveFormsModule, CdkTableModule, MatAutocompleteModule,
    MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule,
    MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
    MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,
    MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, NavbarModule,
    BsDropdownModule.forRoot(), DragDropModule,ScrollingModule, ScrollDispatchModule, AmazingTimePickerModule
  ],
  declarations: [
    ApplicationComponent,
    DialogAddApplicationDialog,
    DialogDeleteApplicationDialog,
    DialogUpdateApplicationDialog
  ],
  providers: [],
  entryComponents: [
    DialogAddApplicationDialog,
    DialogDeleteApplicationDialog,
    DialogUpdateApplicationDialog,
  ]
})
export class ApplicationModule { }
