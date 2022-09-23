import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Jsonp, RequestOptions, Headers } from "@angular/http";
import { DomSanitizer } from '@angular/platform-browser';
import { MatPaginator, MatTableDataSource, MatIconRegistry, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Gestionnaire } from '../entite/Gestionnaire';
import { IGestionnaire } from '../interface/IGestionnaire';
import {environment} from "../../environments/environment";

@Component({
  selector: 'amu-gestionnaire-form',
  templateUrl: './gestionnaire.component.html',
  styleUrls: ['./gestionnaire.component.css'],
  providers: [],
})
export class GestionnaireComponent implements OnInit {

  private allGestionnaireURL = environment.allGestionnaireURL;
  private addGestionnaireURL = environment.addGestionnaireURL;
  private deleteGestionnaireURL = environment.deleteGestionnaireURL;
  private updateGestionnaireURL = environment.updateGestionnaireURL;

  private resourcesGestionnaireLoaded:boolean = false;

  private roles = ['ADMIN','IDENTITE'];

  dataSourceGestionnaire = new MatTableDataSource<IGestionnaire>();
  displayedColumns = ['name', 'firstname', 'role', 'action'];

  @ViewChild(MatPaginator) paginatorGestionnaire: MatPaginator;
  @ViewChild(MatSort) sortHistoGestionnaire: MatSort;

  constructor(private http: Http,
              private httpClient: HttpClient,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              public dialog: MatDialog)
              {
                iconRegistry.addSvgIcon('delete', sanitizer.bypassSecurityTrustResourceUrl('assets/img/24/delete.svg'));
                iconRegistry.addSvgIcon('add', sanitizer.bypassSecurityTrustResourceUrl('assets/img/24/add.svg'));
                iconRegistry.addSvgIcon('update', sanitizer.bypassSecurityTrustResourceUrl('assets/img/24/update.svg'));
                iconRegistry.addSvgIcon('check', sanitizer.bypassSecurityTrustResourceUrl('assets/img/24/check.svg'));
  }
  onHidden(): void {
    console.log('Dropdown is hidden');
  }
  onShown(): void {
    console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    console.log('Dropdown state is changed');
  }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSourceGestionnaire.paginator = this.paginatorGestionnaire;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceGestionnaire.filter = filterValue;
  }

  onDelete(id: number, name : string){
    let dialogRef = this.dialog.open(DialogDeleteGestionnaireDialog, {
      width: '500px',
      data: { name: name, id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  onUpdate( data : any){

    let dialogRef = this.dialog.open(DialogUpdateGestionnaireDialog, {
      width: '40%',
      // height: '650px',
      data: { id: data.id, uid : data.uid, name : data.name, firstname : data.firstname, roles : this.roles, role : data.role }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  onAdd(): void {
    let dialogRef = this.dialog.open(DialogAddGestionnaireDialog, {
      width: '35%',
      // height: '520px',
      data: { uid : "", name : "", firstname : "", roles : this.roles }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  getData() : void {
    this.httpClient.get<IGestionnaire[]>(this.allGestionnaireURL)
      // .map(response => response.json())
      .subscribe(result => {
        this.dataSourceGestionnaire.data = result;
        this.resourcesGestionnaireLoaded = true;
        sessionStorage.setItem('dataSourceGestionnaire', JSON.stringify(result));
      }
    );
  }
}


//popup add Gestionnaire
@Component({
  selector: 'gestionnaire-add-dialog',
  templateUrl: 'gestionnaire-add-dialog.html',
  styleUrls: ['./gestionnaire.component.css']
})
export class DialogAddGestionnaireDialog {

  public addGestionnaireURL = environment.addGestionnaireURL;
  public gestionnaire : Gestionnaire = new Gestionnaire("","","","");
  public formRoles = new FormControl("ADMIN");

  constructor(
    public dialogRef: MatDialogRef<DialogAddGestionnaireDialog>,
    private http: Http,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(data: any): void {
    this.gestionnaire.uid = data.uid;
    this.gestionnaire.name = data.name;
    this.gestionnaire.firstname = data.firstname;
    this.gestionnaire.role = this.formRoles.value;

    this.http.post(this.addGestionnaireURL, this.gestionnaire)
      .map(response =>
        console.log(response))
      .subscribe(result => {
        console.log("add-gestionnaire-ok");
        this.dialogRef.close();
      }
    );
  }
  onAnnuler(){
    this.dialogRef.close();
  }
}

//popup update gestionnaire
@Component({
  selector: 'gestionnaire-update-dialog',
  templateUrl: 'gestionnaire-update-dialog.html',
  styleUrls: ['./gestionnaire.component.css']
})
export class DialogUpdateGestionnaireDialog {

  private updateGestionnaireURL = environment.updateGestionnaireURL;
  private gestionnaire : Gestionnaire = new Gestionnaire("","","","");

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateGestionnaireDialog>,
    private http: Http,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(data: any): void {

    this.gestionnaire.id = data.id;
    this.gestionnaire.uid = data.uid;
    this.gestionnaire.name = data.name;
    this.gestionnaire.firstname = data.firstname;
    this.gestionnaire.role = data.role;
    this.http.post(this.updateGestionnaireURL, this.gestionnaire)
      .map(response =>
        console.log(response))
      .subscribe(result => {
        console.log("update-gestionnaire-ok");
        this.dialogRef.close();
      }
    );
  }

  onAnnuler(){
    this.dialogRef.close();
  }
}

//popup delete gestionnaire
@Component({
  selector: 'gestionnaire-delete-dialog',
  templateUrl: 'gestionnaire-delete-dialog.html',
  styleUrls: ['./gestionnaire.component.css']
})
export class DialogDeleteGestionnaireDialog {

  private deleteGestionnaireURL = environment.deleteGestionnaireURL;
  private gestionnaire : Gestionnaire = new Gestionnaire("","","","");

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteGestionnaireDialog>,
    private http: Http,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onDelete(id: number): void {
    this.gestionnaire.id = id;
    this.http.post(this.deleteGestionnaireURL, this.gestionnaire)
      .map(response =>
        console.log(response))
      .subscribe(result => {
        console.log("delete-gestionnaire-ok");
      }
    );
    this.dialogRef.close();
  }

  onAnnuler(){
    this.dialogRef.close();
  }
}
