import { SidebarModule } from 'ng-sidebar';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule,
  MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,
  MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatBadgeModule } from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

import { NavbarComponent } from './navbar.component';
import { DialogEntInfoDialog } from './navbar.component';
import { DialogChangeIdentityDialog } from './navbar.component';


@NgModule({
  imports: [CommonModule, RouterModule, BrowserModule, FormsModule, CdkTableModule, MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule,
    MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule,
    MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule,
    MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule,
    MatBadgeModule, SidebarModule.forRoot()],
  declarations: [NavbarComponent, DialogEntInfoDialog, DialogChangeIdentityDialog],
  exports: [NavbarComponent],
  providers: [],
  entryComponents: [
    DialogEntInfoDialog,
    DialogChangeIdentityDialog
  ]
})
export class NavbarModule { }
