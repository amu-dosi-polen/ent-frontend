import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService } from './permission.service';
import { Http, Jsonp, RequestOptions, Headers } from "@angular/http";
import { DomSanitizer } from '@angular/platform-browser';
import { MatPaginator, MatTableDataSource, MatIconRegistry, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApplicationPermission } from '../entite/ApplicationPermission';
import { IPermission } from '../interface/IPermission';
import { environment } from "../../environments/environment";

@Component({
  selector: 'amu-permission-form',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css'],
  providers: [PermissionService],
})
export class PermissionComponent implements OnInit {


  private getUserApplicationPermissionURL = environment.getUserApplicationPermissionURL;
  private allPermissionURL = environment.allPermissionURL;
  private addPermissionURL = environment.addPermissionURL;
  private deletePermissionURL = environment.deletePermissionURL;
  private updatePermissionURL = environment.updatePermissionURL;

  private resourcesPermissionLoaded:boolean = false;

  private roles = ['ADMIN'];

  dataSourcePermission = new MatTableDataSource<IPermission>();
  displayedColumns = ['name', 'value', 'action'];

  @ViewChild(MatPaginator) paginatorPermission: MatPaginator;
  @ViewChild(MatSort) sortHistoPermission: MatSort;

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

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSourcePermission.paginator = this.paginatorPermission;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourcePermission.filter = filterValue;
  }

  onDelete( id : string,  name : string){
    let dialogRef = this.dialog.open(DialogDeletePermissionDialog, {
      width: '500px',
      data: { id: id, name: name }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  onUpdate( data : any){

    let dialogRef = this.dialog.open(DialogUpdatePermissionDialog, {
      width: '40%',
      // height: '650px',
      data: { id : data.id, name : data.name, value : data.value}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  onAdd(): void {
    let dialogRef = this.dialog.open(DialogAddPermissionDialog, {
      width: '35%',
      // height: '520px',
      data: { name : "", value : "" }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  getData() : void {
    this.httpClient.get<IPermission[]>(this.getUserApplicationPermissionURL)
      // .map(response => response.json())
      .subscribe(result => {
        this.dataSourcePermission.data = result;
        this.resourcesPermissionLoaded = true;
        sessionStorage.setItem('dataSourcePermission', JSON.stringify(result));
      }
    );
  }
}


//popup add Permission
@Component({
  selector: 'permission-add-dialog',
  templateUrl: 'permission-add-dialog.html',
  styleUrls: ['./permission.component.css']
})
export class DialogAddPermissionDialog {

  public addPermissionURL = environment.addPermissionURL;
  public permission : ApplicationPermission = new ApplicationPermission("","");

  typeAccessSelected :string;

  constructor(
    public dialogRef: MatDialogRef<DialogAddPermissionDialog>,
    private http: Http,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(data: any): void {
    this.permission.typeAccess = "USER";
    this.permission.value = data.value;

    this.http.post(this.addPermissionURL, this.permission)
      .map(response =>
        console.log(response))
      .subscribe(result => {
        console.log("add-permission-ok");
      }
    );
    this.dialogRef.close();
  }
  onAnnuler(){
    this.dialogRef.close();
  }

}

//popup update permission
@Component({
  selector: 'permission-update-dialog',
  templateUrl: 'permission-update-dialog.html',
  styleUrls: ['./permission.component.css']
})
export class DialogUpdatePermissionDialog {

  private updatePermissionURL = environment.updatePermissionURL;
  private permission : ApplicationPermission = new ApplicationPermission("","");

  constructor(
    public dialogRef: MatDialogRef<DialogUpdatePermissionDialog>,
    private http: Http,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(data: any): void {
    this.permission.id = data.id;
    // this.permission.name = data.name;
    this.permission.typeAccess = "USER";
    this.permission.value = data.value;

    this.http.post(this.updatePermissionURL, this.permission)
      .map(response =>
        console.log(response))
      .subscribe(result => {
        console.log("update-permission-ok");
      }
    );
    this.dialogRef.close();
  }

  onAnnuler(){
    this.dialogRef.close();
  }
}

//popup delete permission
@Component({
  selector: 'permission-delete-dialog',
  templateUrl: 'permission-delete-dialog.html',
  styleUrls: ['./permission.component.css']
})
export class DialogDeletePermissionDialog {

  private deletePermissionURL = environment.deletePermissionURL;
  private permission : ApplicationPermission = new ApplicationPermission("","");

  constructor(
    public dialogRef: MatDialogRef<DialogDeletePermissionDialog>,
    private http: Http,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onDelete(id: number): void {
    this.permission.id = id;
    this.http.post(this.deletePermissionURL, this.permission)
      .map(response =>
        console.log(response))
      .subscribe(result => {
        console.log("delete-permission-ok");
      }
    );
    this.dialogRef.close();
  }

  onAnnuler(){
    this.dialogRef.close();
  }
}
