import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient, HttpParams } from  "@angular/common/http";
import { Http, Jsonp, RequestOptions, Headers, URLSearchParams, RequestOptionsArgs } from "@angular/http";
import { Gestionnaire } from '../entite/Gestionnaire';
import { environment } from "../../environments/environment";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';
import { IUser } from '../interface/IUser';
import { IGestionnaire } from '../interface/IGestionnaire';
import { IMenu } from '../interface/IMenu';
import { SharedService } from '../services/sharedService';
import jwt_decode from "jwt-decode";

/**
 * This class represents the navigation bar component.
 */
@Component({
  // moduleId: module.id,
  selector: 'amu-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  private infoGestionnaireURL = environment.infoGestionnaireURL;
  private currentUidURL = environment.currentUidURL;
  private listeEntInfoURL = environment.listeEntInfoURL;
  private logoutURL = environment.logoutURL;

  public isAdmin : boolean = false;
  public isChgtIdentity : boolean = false;
  public gestionnaire : Gestionnaire;
  private entInfos = [];
  public nbMessageEntInfos = 0;
  private name : String;
  private firstname : String;
  private uid : String;

  subscription: Subscription;

  constructor(
    private httpClient: HttpClient,
    private http: Http,
    public dialog: MatDialog,
    private userService :UserService,
    private sharedService: SharedService)
    {  }

  ngOnInit() {
    var token=sessionStorage.getItem('token');
    var decoded = jwt_decode(token);
    this.uid=decoded['sub'];
    this.name=decoded['name'];
    this.firstname=decoded['firstname'];
    var role=decoded['role'];
    if (role == 'ADMIN'){this.isAdmin=true;}
    if (role == 'DOSI') {this.isChgtIdentity=true;}
    
    /*
    this.httpClient.get<IGestionnaire>(this.infoGestionnaireURL)
                // .map(response => response.json())
                .subscribe(
                  result => {
                    this.gestionnaire = result;
                    if(this.gestionnaire.role == 'ADMIN'){
                      this.isAdmin = true;
                    }
                    if(this.gestionnaire.role == 'IDENTITE'){
                      this.isChgtIdentity = true;
                    }
                    //gestion des annonces
                    this.getEntInfos(this.gestionnaire.uid);
                  }, error => {
                    if(error.error != undefined){
                      if(error.error.exception == "io.jsonwebtoken.ExpiredJwtException"){
                        this.sharedService.initialLogin();
                      }
                    }
                  });

    
    const tempo_10_min = interval(6000000);
    this.subscription = tempo_10_min.subscribe(val => this.getEntInfos(this.uid));
*/
  }

  getEntInfos(uid){

       this.httpClient.get<String []>(this.listeEntInfoURL + '?uid=' + uid + '&getAll=true')
    // , this.getRequestOptionArgs())
    // );
    // this.httpClient.get<String []>(this.listeEntInfoURL + '?uid=' + uid + '&getAll=true')
      // .map(response => response.json())
      .subscribe(result => {
        this.entInfos = result;
        this.nbMessageEntInfos = result.length;
      });
  }

  openLink(link, target){
    window.open(link, target);
  }
  // private getRequestOptionArgs() : RequestOptionsArgs {
  //     var options = new RequestOptions();
  //     options.headers = new Headers();
  //     options.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  //     return options;
  // }

  openDialogEntInfo(){
    const dialogRef = this.dialog.open(DialogEntInfoDialog, {
      width: '40%',
      height: '500px',
      data: { entInfos: this.entInfos }
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  changeIdentity(){
    const dialogRef = this.dialog.open(DialogChangeIdentityDialog, {
      width: '40%',
      height: '30%',
      data: { uid: this.uid }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.name = result.name;
      this.firstname = result.firstname;
      this.uid = result.uid;
      this.sharedService.changeAppliBureauWithOtherUser(result);
    });
  }

  logout(){
    sessionStorage.clear();
    this.httpClient.get<String>(this.logoutURL, {observe:'response'})
      .subscribe(result => {
          window.location.href = result.headers.get("Location");
      });
  }
}

@Component({
  selector: 'ent-info-dialog',
  templateUrl: '../entInfo/ent-info-annonces-dialog.html',
  styleUrls: ['../entInfo/ent-info.component.css']
})
export class DialogEntInfoDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogEntInfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onAnnuler(){
      this.dialogRef.close();
    }
}

@Component({
  selector: 'chgt-identity-dialog',
  templateUrl: '../identity/chgt-identity-dialog.html',
  styleUrls: ['../identity/chgt-identity.component.css']
})
export class DialogChangeIdentityDialog {

  constructor(
    private httpClient: HttpClient,
    public dialogRef: MatDialogRef<DialogChangeIdentityDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    public uid :string;
    private menuURL = environment.menuURL;
    private menu : IMenu;
    onAnnuler(){
      this.dialogRef.close(this.menu);
    }

    changeIdentity(){
      if(this.uid != undefined){
        this.httpClient.get<IMenu>(this.menuURL + "?changeIdentity=" + this.uid)
          .subscribe(result => {
            this.menu = result;
            this.dialogRef.close(this.menu);
          }
        );

      }
    }

    retrieveIdentity(){
      // this.httpClient.get<IMenu[]>(this.allMenuURL + "&changeIdentity=" + uid)
      //   .subscribe(result => {
      //     this.dataSourceMenu.data = result;
      //     this.resourcesMenuLoaded = true;
      //     sessionStorage.setItem('dataSourceMenu', JSON.stringify(result));
      //     sessionStorage.setItem('changeIdentity', uid);
      //   }
      // );
      // sessionStorage.setItem('changeIdentity', undefined);

    }
}
