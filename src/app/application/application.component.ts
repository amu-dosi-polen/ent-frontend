import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from './application.service';
import { Http, Jsonp, RequestOptions, Headers } from "@angular/http";
import { DomSanitizer } from '@angular/platform-browser';
import { MatPaginator, MatTableDataSource, MatIconRegistry, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Application } from '../entite/Application';
import { ApplicationPermission } from '../entite/ApplicationPermission';
import { IApplication } from '../interface/IApplication';
import { IApplicationPermission } from '../interface/IApplicationPermission';
import { environment } from "../../environments/environment";
import jwt_decode from "jwt-decode";


@Component({
  selector: 'amu-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
  providers: [ApplicationService],
})
export class ApplicationComponent implements OnInit {

  private allApplicationURL = environment.allApplicationURL;
  private addApplicationURL = environment.addApplicationURL;
  private deleteApplicationURL = environment.deleteApplicationURL;
  private updateApplicationURL = environment.updateApplicationURL;
  private getLdapApplicationPermissionURL = environment.getLdapApplicationPermissionURL;
  private getUserApplicationPermissionURL = environment.getUserApplicationPermissionURL;
  private getAllGroupsLdapURL = environment.getAllGroupsLdapURL;
  public isAdmin : boolean = false;

  ldapApplicationsPermissionSelected : IApplicationPermission[] = [];
  userApplicationsPermissionSelected : IApplicationPermission[] = [];
  ldapIdsPermissionSelected : IApplicationPermission[] = [];
  userIdsPermissionSelected : IApplicationPermission[] = [];

  private resourcesApplicationLoaded:boolean = false;

  dataSourceApplication = new MatTableDataSource<IApplication>();
  displayedColumns = ['actif', 'name', 'fname', 'url', 'description', 'suppr'];

  @ViewChild(MatPaginator) paginatorApplication: MatPaginator;
  @ViewChild(MatSort) sortHistoApplication: MatSort;

  constructor(private http: Http,
              private httpClient : HttpClient,
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
    // this.getApplicationPermission();
    // role
    var token=sessionStorage.getItem('token');
    var decoded = jwt_decode(token);
    var role=decoded['role'];
    if (role == 'ADMIN'){this.isAdmin=true;}
  }

  ngAfterViewInit() {
    this.dataSourceApplication.paginator = this.paginatorApplication;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceApplication.filter = filterValue;
  }

  onDelete(id: number, nom : string){
    let dialogRef = this.dialog.open(DialogDeleteApplicationDialog, {
      width: '500px',
      data: { name: nom, id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  onUpdate( data : any){
    this.ldapApplicationsPermissionSelected = [];
    this.userApplicationsPermissionSelected = [];
    data.timeDebut = "00:00";
    data.timeFin = "23:59";
    if(data.dateDebut != undefined){
      data.dateDebut = new Date(data.dateDebut);
      data.timeDebut = data.dateDebut.toTimeString().substr(0,5);
    }
    if(data.dateFin != undefined){
      data.dateFin = new Date(data.dateFin);
      data.timeFin = data.dateFin.toTimeString().substr(0,5);
    }

    if(data.applicationsPermission.length !== 0){
      data.applicationsPermission.forEach((value) => {
        if(value.typeAccess == "GROUP_LDAP"){
          this.ldapApplicationsPermissionSelected.push(value);
        } else {
          this.userApplicationsPermissionSelected.push(value);
        }
      });
    }
    if(data.conditionAffichage == 'mandatory'){
      data.conditionAffichageId = '1';
    } else if(data.conditionAffichage == 'mandatory-etu'){
      data.conditionAffichageId = '2';
    } else if(data.conditionAffichage == 'mandatory-pers'){
      data.conditionAffichageId = '3';
    } else if(data.conditionAffichageId == 'mandatory-alum'){
      data.conditionAffichageId = '4';
    }


    let dialogRef = this.dialog.open(DialogUpdateApplicationDialog, {
      width: '90%',
      // height: '650px',
      data: { id: data.id, uid : data.uid, name : data.name, fname : data.fname, url : data.url,
      requete : data.requete,key : data.key, timer : data.timer, color : data.color, icon : data.icon,
      action : data.action, dateDebut : data.dateDebut, dateFin : data.dateFin, timeDebut : data.timeDebut,
      timeFin : data.timeFin, actif : data.actif,
      conditionAffichageId : data.conditionAffichageId, description : data.description,
      groupesSelected : this.ldapApplicationsPermissionSelected,
      usersSelected : this.userApplicationsPermissionSelected, tous : data.tous,
      tousEtu : data.tousEtu, tousEmployee : data.tousEmployee, tousAlum : data.tousAlum,
      tousFaculty : data.tousFaculty, tousResearch : data.tousResearch, tousAffiliate : data.tousAffiliate, tousRetired : data.tousRetired }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }



  onAdd(): void {
    let dialogRef = this.dialog.open(DialogAddApplicationDialog, {
      width: '90%',
      // height: '15em',
      data: { uid : "", fname : "", timeDebut: "00:00", timeFin :"23:59", actif : false,
              tous : false, tousEtu : false, tousAlum : false, tousEmployee : false,
              tousFaculty : false, tousResearch : false, tousAffiliate : false, tousRetired : false }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  getData() : void {
    this.httpClient.get<IApplication []>(this.allApplicationURL)
      // .map(response => response.json())
      .subscribe(result => {
        this.dataSourceApplication.data = result;
        this.resourcesApplicationLoaded = true;
        sessionStorage.setItem('dataSourceApplication', JSON.stringify(result));
      }
    );
  }
}


//popup add Application
@Component({
  selector: 'application-add-dialog',
  templateUrl: 'application-add-dialog.html',
  styleUrls: ['./application.component.css']
})
export class DialogAddApplicationDialog {

  public addApplicationURL = environment.addApplicationURL;
  private getAllGroupsLdapURL = environment.getAllGroupsLdapURL;
  private getUsersLdapURL = environment.getUsersLdapURL;
  conditionsAffichage = [ { id:'0', value:'Aucune'},
                                  { id:'1', value:'Obligatoire'},
                                  { id:'2', value:'Obligatoire pour étudiants'},
                                  { id:'3', value:'Obligatoire pour personnels'},
                                  { id:'4', value:'Obligatoire pour alums'}];
  timers = [1,3,5,10,15,30];
  private application : Application = new Application("","","","","",0,"","","","","", [],"","","","",false,false,false,false,false,false,false,false,false);

  // public formRoles = new FormControl("ADMIN");
  private resourcesUserApplicationPermission:boolean = false;

  ldapApplicationsPermission : [string];
  newLdapApplicationPermission ="";
  userApplicationsPermission : [string];
  newUserApplicationPermission ="";
  ldapApplicationsPermissionSelected : [string];
  userApplicationsPermissionSelected : [string];
 
  groupesSelected= [];
  usersSelected= [];
  groupesForSelection : [string];
  groupSearch : string = "";
  usersForSelection : [string];
  userSearch : string = "";
  selectedGroupRigth : number;
  selectedGroupLeft : number;
  selectedUserRigth : number;
  selectedUserLeft : number;

  constructor(
    public dialogRef: MatDialogRef<DialogAddApplicationDialog>,
    private http: Http,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(data: any): void {
    this.application.name = data.name;
    this.application.fname = data.fname;
    this.application.url = data.url;
    this.application.requete = data.requete;
    this.application.key = data.key;
    if(data.timer != undefined){
      this.application.timer = data.timer;
    } else {
      //10 minutes par défaut
      this.application.timer = 10;
    }
    this.application.description = data.description;
    if(data.dateDebut != undefined) {
      this.application.dateDebut = data.dateDebut.setHours(data.timeDebut.substr(0, 2));
      this.application.dateDebut = data.dateDebut.setMinutes(data.timeDebut.substr(3, 2));
    }
    if(data.dateFin != undefined) {
      this.application.dateFin = data.dateFin.setHours(data.timeFin.substr(0, 2));
      this.application.dateFin = data.dateFin.setMinutes(data.timeFin.substr(3, 2));
    }
    this.application.actif = data.actif;
    this.application.tous = data.tous;
    this.application.tousEmployee = data.tousEmployee;
    this.application.tousFaculty = data.tousFaculty;
    this.application.tousResearch = data.tousResearch;
    this.application.tousAffiliate = data.tousAffiliate;
    this.application.tousRetired = data.tousRetired;
    this.application.tousEtu = data.tousEtu;
    this.application.tousAlum = data.tousAlum;
    this.application.icon = data.icon;
    this.application.color = data.color;
    this.application.action = data.action;
    if(data.conditionAffichage != undefined){
      if(data.conditionAffichage == '1'){
        this.application.conditionAffichage = 'mandatory';
      } else if(data.conditionAffichage == '2'){
        this.application.conditionAffichage = 'mandatory-etu';
      } else if(data.conditionAffichage == '3'){
        this.application.conditionAffichage = 'mandatory-pers';
      } else if(data.conditionAffichage == '4'){
        this.application.conditionAffichage = 'mandatory-alum';
      }
    }

    if(this.groupesSelected.length !== 0){
      this.groupesSelected.forEach((groupeSelected) => {
          var applicationPermission = new ApplicationPermission("GROUP_LDAP", groupeSelected.cn);
          this.application.applicationsPermission.push(applicationPermission);
        });
    }
    if(this.usersSelected.length !== 0){
      this.usersSelected.forEach((userSelected) => {
          var applicationPermission = new ApplicationPermission("USER", userSelected.uid);
          this.application.applicationsPermission.push(applicationPermission);
        });
    }

    this.http.post(this.addApplicationURL, this.application)
      .map(response =>
        console.log(response))
      .subscribe(result => {
        console.log("add-application-ok");
        this.dialogRef.close();
      }
    );
  }

  onAnnuler(){
    this.dialogRef.close();
  }
  changeListeLdap = function (tabIds){
    this.ldapApplicationsPermissionSelected = [];
    tabIds.forEach((value) => {
      this.ldapApplicationsPermissionSelected.push(value);
    });
  }
  changeListeUser = function (tabIds){
    this.userApplicationsPermissionSelected = [];
    tabIds.forEach((value) => {
      this.userApplicationsPermissionSelected.push(value);
    });
  }
  selectGroup = function() {
    var find : boolean = false;
    if(this.groupesForSelection != undefined && this.groupesForSelection.length !== 0 && this.selectedGroupLeft !== undefined){
      this.groupesSelected.forEach((groupeSelected) => {
        if( groupeSelected.cn === this.groupesForSelection[this.selectedGroupLeft].cn) {
            find = true;
        }
      });
      if(find == false) {
        this.groupesSelected.push(this.groupesForSelection[this.selectedGroupLeft]);
        this.groupesForSelection.splice(this.selectedGroupLeft, 1);
      }
    }
  }
  selectUser = function() {
    var find : boolean = false;
    if(this.usersForSelection != undefined && this.usersForSelection.length !== 0 && this.selectedUserLeft !== undefined){
      this.usersSelected.forEach((userSelected) => {
        if( userSelected.uid === this.usersForSelection[this.selectedUserLeft].uid) {
            find = true;
        }
      });
      if(find == false) {
        this.usersSelected.push(this.usersForSelection[this.selectedUserLeft]);
        this.usersForSelection.splice(this.selectedUserLeft, 1);
      }
    }
  }
  removeGroup = function (){

    var find : boolean = false;
    if(this.groupesSelected != undefined && this.groupesSelected.length !== 0  && this.selectedGroupRigth !== undefined){
      this.groupesForSelection.forEach((groupeForSelection) => {
        if( groupeForSelection.cn === this.groupesSelected[this.selectedGroupRigth].cn) {
            find = true;
        }
      });
      if(find == false) {
        this.groupesForSelection.splice(0, 0, this.groupesSelected[this.selectedGroupRigth]);
        this.groupesSelected.splice(this.selectedGroupRigth, 1);
      } else {
        this.groupesSelected.splice(this.selectedGroupRigth, 1);
      }
    }
  }

  removeUser = function (){

    var find : boolean = false;
    if(this.usersSelected != undefined && this.usersSelected.length !== 0 && this.selectedUserRigth !== undefined){
      this.usersForSelection.forEach((userForSelection) => {
        if( userForSelection.uid === this.usersSelected[this.selectedUserRigth].uid) {
            find = true;
        }
      });
      if(find == false) {
        this.usersForSelection.splice(0, 0, this.usersSelected[this.selectedUserRigth]);
        this.usersSelected.splice(this.selectedUserRigth, 1);
      } else {
        this.usersSelected.splice(this.selectedUserRigth, 1);
      }
    }
  }

  searchGroup = function (){
    if(this.groupSearch !== "")
    this.http.post(this.getAllGroupsLdapURL, this.groupSearch)
      .map(response => response.json())
      .subscribe(result => {
        this.groupesForSelection = result;
      }
    );
  }

  searchUid = function (){
    if(this.userSearch !== "")
    this.http.post(this.getUsersLdapURL, this.userSearch)
      .map(response => response.json())
      .subscribe(result => {
        this.usersForSelection = result;
      }
    );
  }

}

//popup update application
@Component({
  selector: 'application-update-dialog',
  templateUrl: 'application-update-dialog.html',
  styleUrls: ['./application.component.css']
})
export class DialogUpdateApplicationDialog {

  private updateApplicationURL = environment.updateApplicationURL;
  private application : Application = new Application("","","","","",0,"","","","","", [],"","","","",false,false,false,false,false,false,false,false,false);
  private getAllGroupsLdapURL = environment.getAllGroupsLdapURL;
  private getUsersLdapURL = environment.getUsersLdapURL;
  public isAdmin : boolean = false;
  fieldsetDisabled : boolean =false;

  groupesSelected= [];
  usersSelected= [];
  groupesForSelection : [string];
  groupSearch : string = "";
  usersForSelection : [string];
  userSearch : string = "";
  selectedGroupRigth : number;
  selectedGroupLeft : number;
  selectedUserRigth : number;
  selectedUserLeft : number;
  conditionsAffichage = [ { id:'0', value:'Aucune'},
                                  { id:'1', value:'Obligatoire'},
                                  { id:'2', value:'Obligatoire pour étudiants'},
                                  { id:'3', value:'Obligatoire pour personnels'},
                                  { id:'4', value:'Obligatoire pour alums'}];
  timers = [1,3,5,10,15,30,60,120];

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateApplicationDialog>,
    private http: Http,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      // role
      var token=sessionStorage.getItem('token');
      var decoded = jwt_decode(token);
      var role=decoded['role'];
      if (role == 'ADMIN'){this.isAdmin=true;}
      if (role == 'DOSI') {this.fieldsetDisabled=true;}
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(data: any): void {

    this.application.id = data.id;
    this.application.name = data.name;
    this.application.fname = data.fname;
    this.application.url = data.url;
    this.application.requete = data.requete;
    this.application.key = data.key;
    this.application.timer = data.timer;
    if(data.conditionAffichageId != undefined){
      if(data.conditionAffichageId == '1'){
        this.application.conditionAffichage = 'mandatory';
      } else if(data.conditionAffichageId == '2'){
        this.application.conditionAffichage = 'mandatory-etu';
      } else if(data.conditionAffichageId == '3'){
        this.application.conditionAffichage = 'mandatory-pers';
      } else if(data.conditionAffichageId == '4'){
        this.application.conditionAffichage = 'mandatory-alum';
      }
    }
    if(data.dateDebut != undefined) {
      this.application.dateDebut = data.dateDebut.setHours(data.timeDebut.substr(0, 2));
      this.application.dateDebut = data.dateDebut.setMinutes(data.timeDebut.substr(3, 2));
    }
    if(data.dateFin != undefined) {
      this.application.dateFin = data.dateFin.setHours(data.timeFin.substr(0, 2));
      this.application.dateFin = data.dateFin.setMinutes(data.timeFin.substr(3, 2));
    }
    this.application.actif = data.actif;
    this.application.tous = data.tous;
    this.application.tousEmployee = data.tousEmployee;
    this.application.tousFaculty = data.tousFaculty;
    this.application.tousResearch = data.tousResearch;
    this.application.tousAffiliate = data.tousAffiliate;
    this.application.tousRetired = data.tousRetired;
    this.application.tousEtu = data.tousEtu;
    this.application.tousAlum = data.tousAlum;
    this.application.description = data.description;
    if(data.dateDebut != undefined) {
      this.application.dateDebut = data.dateDebut.setHours(data.timeDebut.substr(0, 2));
      this.application.dateDebut = data.dateDebut.setMinutes(data.timeDebut.substr(3, 2));
    }
    if(data.dateFin != undefined) {
      this.application.dateFin = data.dateFin.setHours(data.timeFin.substr(0, 2));
      this.application.dateFin = data.dateFin.setMinutes(data.timeFin.substr(3, 2));
    }
    if(data.actif == undefined){
      this.application.actif = false;
    } else {
      this.application.actif = data.actif;
    }
    this.application.icon = data.icon;
    this.application.color = data.color;
    this.application.action = data.action;
    if(data.groupesSelected.length !== 0){
        data.groupesSelected.forEach((value) => {
          this.application.applicationsPermission.push(value);
      });
    }
    if(data.usersSelected.length !== 0){
        data.usersSelected.forEach((value) => {
          this.application.applicationsPermission.push(value);
      });
    }

    this.http.post(this.updateApplicationURL, this.application)
      .map(response =>
        console.log(response))
      .subscribe(result => {
        console.log("update-application-ok");
        this.dialogRef.close();
      }
    );

  }

  onAnnuler(){
    this.dialogRef.close();
  }

  changeListeLdap = function (tabIds){
    this.ldapApplicationsPermissionSelected = [];
    tabIds.forEach((value) => {
      this.ldapApplicationsPermissionSelected.push(value);
    });
  }
  changeListeUser = function (tabIds){
    this.userApplicationsPermissionSelected = [];
    tabIds.forEach((value) => {
      this.userApplicationsPermissionSelected.push(value);
    });
  }
  selectGroup = function(data) {
    var find : boolean = false;
    if(this.groupesForSelection != undefined && this.groupesForSelection.length !== 0 && this.selectedGroupLeft !== undefined){
      data.groupesSelected.forEach((groupeSelected) => {
        if( groupeSelected.value === this.groupesForSelection[this.selectedGroupLeft].cn) {
            find = true;
        }
      });
      if(find == false) {
        var applicationPermission = new ApplicationPermission("GROUP_LDAP", this.groupesForSelection[this.selectedGroupLeft].cn);
        data.groupesSelected.push(applicationPermission);
        this.groupesForSelection.splice(this.selectedGroupLeft, 1);
      }
    }
  }
  selectUser = function(data) {
    var find : boolean = false;
    if(this.usersForSelection != undefined && this.usersForSelection.length !== 0 && this.selectedUserLeft !== undefined){
      data.usersSelected.forEach((userSelected) => {
        if( userSelected.value === this.usersForSelection[this.selectedUserLeft].uid) {
            find = true;
        }
      });
      if(find == false) {
        var applicationPermission = new ApplicationPermission("USER", this.usersForSelection[this.selectedUserLeft].uid);
        data.usersSelected.push(applicationPermission);
        this.usersForSelection.splice(this.selectedUserLeft, 1);
      }
    }
  }
  removeGroup = function (data){

    var find : boolean = false;
    if(data.groupesSelected != undefined && data.groupesSelected.length !== 0  && this.selectedGroupRigth !== undefined){
      if(this.groupesForSelection !== undefined) {
        this.groupesForSelection.forEach((groupeForSelection) => {
          if( groupeForSelection.cn === data.groupesSelected[this.selectedGroupRigth].value) {
              find = true;
          }
        });
      }
      if(find == false) {
        if(this.groupesForSelection !== undefined) {
          var groupeTemp = JSON.stringify(this.groupesForSelection);
          groupeTemp = '[{"cn":"' +data.groupesSelected[this.selectedGroupRigth].value + '"},{'+ groupeTemp.substring(2);
          this.groupesForSelection = JSON.parse(groupeTemp);
        }
        data.groupesSelected.splice(this.selectedGroupRigth, 1);
      } else {
        data.groupesSelected.splice(this.selectedGroupRigth, 1);
      }
    }
  }

  removeUser = function (data){

    var find : boolean = false;
    if(data.usersSelected != undefined && data.usersSelected.length !== 0 && this.selectedUserRigth !== undefined){
      data.usersSelected.splice(this.selectedUserRigth, 1);
    }
  }

  searchGroup = function (){
    if(this.groupSearch !== "")
    this.http.post(this.getAllGroupsLdapURL, this.groupSearch)
      .map(response => response.json())
      .subscribe(result => {
        this.groupesForSelection = result;
      }
    );
  }

  searchUid = function (){
    if(this.userSearch !== "")
    this.http.post(this.getUsersLdapURL, this.userSearch)
      .map(response => response.json())
      .subscribe(result => {
        this.usersForSelection = result;
      }
    );
  }

  goToGroupie = function(groupLdap: string){
    var groupieUrl = "https://groupie.univ.fr/group/see/"+groupLdap+"/false/all";
    window.open(groupieUrl, "_blank");
  }
}

//popup delete application
@Component({
  selector: 'application-delete-dialog',
  templateUrl: 'application-delete-dialog.html',
  styleUrls: ['./application.component.css']
})
export class DialogDeleteApplicationDialog {

  private deleteApplicationURL = environment.deleteApplicationURL;
  private application : Application = new Application("","","","","",0,"","","","","", [],"","","","",false,false,false,false,false,false,false,false,false);

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteApplicationDialog>,
    private http: Http,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onDelete(id: number): void {
    this.application.id = id;
    this.http.post(this.deleteApplicationURL, this.application)
      .map(response =>
        console.log(response))
      .subscribe(result => {
        console.log("delete-application-ok");
      }
    );
    this.dialogRef.close();
  }

  onAnnuler(){
    this.dialogRef.close();
  }
}
