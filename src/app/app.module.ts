import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MAT_DATE_LOCALE } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CdkTableModule } from '@angular/cdk/table';
import { JsonpModule, Jsonp, HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule }  from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GestionnaireModule } from './gestionnaire/gestionnaire.module';
import { PermissionModule } from './permission/permission.module';
import { ApplicationModule } from './application/application.module';
import { MenuModule } from './menu/menu.module';
import { TableauBordModule } from './tableauBord/tableau-bord.module';
import { NavbarModule } from './navbar/navbar.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { httpFactory } from "./http.factory";
import { AddTokenInterceptor } from "./httpclient.interceptor";
import { DragDropModule} from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollDispatchModule} from '@angular/cdk/scrolling';
import { WindowRef } from './WindowRef';
import { UserService } from './services/user.service';
import { SharedService } from './services/sharedService';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  exports: [
  CdkTableModule, MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule,
  MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule,
  MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule,
  MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, ReactiveFormsModule, ScrollingModule, ScrollDispatchModule
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    GestionnaireModule,
    PermissionModule,
    ApplicationModule,
    MenuModule,
    TableauBordModule,
    NavbarModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    NgxMaterialTimepickerModule.forRoot(),
    DragDropModule,
    FontAwesomeModule,
    // BsDropdownModule.forRoot()
  ],
  providers: [
    { provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    },
    {  provide: HTTP_INTERCEPTORS,
       useClass: AddTokenInterceptor,
       multi: true
    },
    { provide: MAT_DATE_LOCALE,
      useValue: 'fr-FR'
    },
    WindowRef,
    UserService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
