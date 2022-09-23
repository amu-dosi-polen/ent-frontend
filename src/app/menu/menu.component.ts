import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from './menu.service';
import { Http, Jsonp, RequestOptions, Headers } from "@angular/http";
import { DomSanitizer } from '@angular/platform-browser';
import { MatPaginator, MatTableDataSource, MatIconRegistry, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatTable} from '@angular/material';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../entite/Menu';
import { IMenu } from '../interface/IMenu';
import { IApplication } from '../interface/IApplication';
import { environment } from "../../environments/environment";
import { Application } from '../entite/Application';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'amu-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MenuService],
})
export class MenuComponent implements OnInit {

  private allMenuURL = environment.allMenuURL;
  private addMenuURL = environment.addMenuURL;
  private deleteMenuURL = environment.deleteMenuURL;
  private updateMenuURL = environment.updateMenuURL;
  private updateMenuPositionURL = environment.updateMenuPositionURL;
  private allApplicationURL = environment.allApplicationURL;
  public isAdmin : boolean = false;
  public isChgtIdentity : boolean = false;
  private fieldsetDisabled : boolean = false;

  applications : IApplication[] = [];
  applicationsSelected : IApplication[] = [];

  private resourcesMenuLoaded:boolean = false;

  dataSourceMenu = new MatTableDataSource<IMenu>();
  displayedColumns = ['name', 'update', 'order', 'delete' ];

  @ViewChild(MatPaginator) paginatorMenu: MatPaginator;
  @ViewChild(MatSort) sortHistoMenu: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

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
    // this.getMenuPermission();
    var token=sessionStorage.getItem('token');
    var decoded = jwt_decode(token);
    var role=decoded['role'];
    if (role == 'ADMIN'){this.isAdmin=true;}
    if (role == 'DOSI') {this.isChgtIdentity=true;}
  }

  ngAfterViewInit() {
    this.dataSourceMenu.paginator = this.paginatorMenu;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceMenu.filter = filterValue;
  }

  onDelete(id: number, name : string){
    let dialogRef = this.dialog.open(DialogDeleteMenuDialog, {
      width: '500px',
      data: { name: name, id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  onUpdate( data : any){
    this.applicationsSelected = [];

    if(data.applications.length !== 0){
      data.applications.forEach((value) => {
        this.applicationsSelected.push(value);
      });
    }
    let dialogRef = this.dialog.open(DialogUpdateMenuDialog, {
      width: '40%',
      // height: '650px',
      data: { id: data.id, name : data.name, applicationsSelected : this.applicationsSelected, applications : this.applications }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  onAdd(): void {
    let dialogRef = this.dialog.open(DialogAddMenuDialog, {
      width: '35%',
      // height: '520px',
      data: { name : "", applications : this.applications }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  getData() : void {
    this.httpClient.get<IMenu[]>(this.allMenuURL)
      // .map(response => response.json())
      .subscribe(result => {
        this.dataSourceMenu.data = result;
        this.resourcesMenuLoaded = true;
        sessionStorage.setItem('dataSourceMenu', JSON.stringify(result));
      }
    );
    this.httpClient.get<IApplication[]>(this.allApplicationURL)
      // .map(response => response.json())
      .subscribe(result => {
        this.applications = result;
        // this.resourcesMenuLoaded = true;
        // sessionStorage.setItem('dataSourceMenu', JSON.stringify(result));
      }
    );
  }

  up(row){
    if(row != 0){
      var dataSourceMenuTemp = this.dataSourceMenu.data.slice();
      this.dataSourceMenu.data[row].position = dataSourceMenuTemp[row].position -1;
      this.dataSourceMenu.data[row -1].position = dataSourceMenuTemp[row].position +1;

      this.dataSourceMenu.data[row -1] = dataSourceMenuTemp[row];
      this.dataSourceMenu.data[row] = dataSourceMenuTemp[row -1];
      this.table.renderRows();

      this.updateMenuPosition(this.dataSourceMenu.data[row]);
      this.updateMenuPosition(this.dataSourceMenu.data[row-1]);

    }
  }

  down(row){
    if(row != this.dataSourceMenu.data.length -1){
      var dataSourceMenuTemp = this.dataSourceMenu.data.slice();
      this.dataSourceMenu.data[row].position = dataSourceMenuTemp[row].position +1;
      this.dataSourceMenu.data[row +1].position = dataSourceMenuTemp[row].position-1;

      this.dataSourceMenu.data[row +1] = dataSourceMenuTemp[row];
      this.dataSourceMenu.data[row] = dataSourceMenuTemp[row +1];
      this.table.renderRows();

      this.updateMenuPosition(this.dataSourceMenu.data[row]);
      this.updateMenuPosition(this.dataSourceMenu.data[row+1]);

    }
  }

  updateMenuPosition(menu){
    this.http.post(this.updateMenuPositionURL, menu)
      .map(response =>
        console.log(response))
      .subscribe(result => {
        console.log("update-menu-position-ok");
      }
    );
  }
}


//popup add Menu
@Component({
  selector: 'menu-add-dialog',
  templateUrl: 'menu-add-dialog.html',
  styleUrls: ['./menu.component.css']
})
export class DialogAddMenuDialog {

  public addMenuURL = environment.addMenuURL;

  private menu : Menu = new Menu("","", []);
  private resourcesUserMenuPermission:boolean = false;
  
  constructor(
    public dialogRef: MatDialogRef<DialogAddMenuDialog>,
    private http: Http,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(data: any): void {
    this.menu.name = data.name;
    this.http.post(this.addMenuURL, this.menu)
      .map(response =>
        console.log(response))
      .subscribe(result => {
        console.log("add-menu-ok");
        this.dialogRef.close();
      }
    );
  }

  onAnnuler(){
    this.dialogRef.close();
  }
}



//popup update menu
@Component({
  selector: 'menu-update-dialog',
  templateUrl: 'menu-update-dialog.html',
  styleUrls: ['./menu.component.css']
})
export class DialogUpdateMenuDialog {

  private updateMenuURL = environment.updateMenuURL;
  private menu : Menu = new Menu("","",[]);
  public isAdmin : boolean = false;
  fieldsetDisabled : boolean = false;
  applicationsSelected : Application[];
  appsForSelection : Application[];


  constructor(
    public dialogRef: MatDialogRef<DialogUpdateMenuDialog>,
    private http: Http,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      // role
      var token=sessionStorage.getItem('token');
      var decoded = jwt_decode(token);
      var role=decoded['role'];
      if (role == 'ADMIN'){this.isAdmin=true;}
      if (role == 'DOSI') {this.fieldsetDisabled=true;}
      // liste de droite
      this.applicationsSelected = data.applicationsSelected;
      this.appsForSelection = [];
      // liste de gauche
      data.applications.forEach(app =>{
        if (!this.applicationsSelected.some((appRight) => appRight.id == app.id)){
          this.appsForSelection.push(app);
        }
      })
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(data: any): void {
    this.menu.id = data.id;
    this.menu.name = data.name;
    if(data.applicationsSelected.length !== 0){
      data.applicationsSelected.forEach((value) => {
         this.menu.applicationsJsonId.push(value.id);
      });
    }
    this.http.post(this.updateMenuURL, this.menu)
      .map(response =>
        console.log(response))
      .subscribe(result => {
        console.log("update-menu-ok");
        this.dialogRef.close();
      }
    );
  }

  onAnnuler(){
    this.dialogRef.close();
  }

  addApp = function() {
    if(this.appsForSelection != undefined && this.appsForSelection !== 0 && this.selectedAppLeft !== undefined){
      this.applicationsSelected.push(this.appsForSelection[this.selectedAppLeft]);
      this.appsForSelection.splice(this.selectedAppLeft, 1);
    }
  }

  removeApp = function() {
    if(this.applicationsSelected != undefined && this.applicationsSelected !== 0 && this.selectedAppRight !== undefined){
      // récupère l'index de l'application pour remettre dans le bon ordre dans la liste de gauche
      let ind = this.data.applications.findIndex(x => x.fname === this.applicationsSelected[this.selectedAppRight].fname);
      this.appsForSelection.splice(ind,0,this.applicationsSelected[this.selectedAppRight]);
      this.applicationsSelected.splice(this.selectedAppRight, 1);
    }
  }
}

//popup delete menu
@Component({
  selector: 'menu-delete-dialog',
  templateUrl: 'menu-delete-dialog.html',
  styleUrls: ['./menu.component.css']
})
export class DialogDeleteMenuDialog {

  private deleteMenuURL = environment.deleteMenuURL;
  private menu : Menu = new Menu("","",[]);

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteMenuDialog>,
    private http: Http,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onDelete(id: number): void {
    this.menu.id = id;
    this.http.post(this.deleteMenuURL, this.menu)
      .map(response =>
        console.log(response))
      .subscribe(result => {
        console.log("delete-menu-ok");
      }
    );
    this.dialogRef.close();
  }

  onAnnuler(){
    this.dialogRef.close();
  }
}
