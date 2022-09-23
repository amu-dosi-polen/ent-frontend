import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
// import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { PermissionComponent, DialogAddPermissionDialog, DialogDeletePermissionDialog, DialogUpdatePermissionDialog } from './permission.component';
import { PermissionRoutingModule } from './permission-routing.module';
import { NavbarModule } from '../navbar/navbar.module';


@NgModule({
  imports: [CommonModule, RouterModule, BrowserModule, PermissionRoutingModule, FormsModule, ReactiveFormsModule, CdkTableModule, MatAutocompleteModule,
    MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule,
    MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
    MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,
    MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, NavbarModule,
    BsDropdownModule.forRoot(), 
  ],
  declarations: [
    PermissionComponent,
    DialogAddPermissionDialog,
    DialogDeletePermissionDialog,
    DialogUpdatePermissionDialog
  ],
  providers: [],
  entryComponents: [
    DialogAddPermissionDialog,
    DialogDeletePermissionDialog,
    DialogUpdatePermissionDialog,
  ]
})
export class PermissionModule { }
