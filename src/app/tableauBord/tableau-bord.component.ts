import { Component, OnInit, ViewChild, Inject, ViewChildren, QueryList, AfterViewInit, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MAT_DIALOG_DATA, MatSort, MatIconRegistry, MatDialogRef, MatDialog, MatAccordion } from '@angular/material';
import { Http, Jsonp, RequestOptions, Headers, URLSearchParams, RequestOptionsArgs } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { environment } from "../../environments/environment";
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { CdkDropList, CdkDragDrop, CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';
import { interval, Subscription } from 'rxjs';
import { IMessage } from '../interface/IMessage';
import { IUser } from '../interface/IUser';
import { IAlerte } from '../interface/IAlerte';
import { IMenu } from '../interface/IMenu';
import { ICompteur } from '../interface/ICompteur';
import { Gestionnaire } from '../entite/Gestionnaire';
import { Favoris } from '../entite/Favoris';
import { FnameUid } from '../entite/FnameUid';
import { Application } from '../entite/Application';
import { CompteurClick } from '../entite/CompteurClick';
import { ApplicationPermission } from '../entite/ApplicationPermission';
// import { UserService } from '../services/user.service';
import { CloseEntInfoService } from '../entInfo/ent-info.close.service';
import { SharedService } from '../services/sharedService';
import jwt_decode from "jwt-decode";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'amu-tableau-bord',
  templateUrl: './tableau-bord.component.html',
  styleUrls: ['./tableau-bord.component.css'],
  providers: [
    //UserService,
    CloseEntInfoService],

})
export class TableauBordComponent implements OnInit, AfterViewInit {

  @ViewChild('myaccordion') myPanels: MatAccordion;

  private menuURL = environment.menuURL;
  private getURL = environment.getURL;
  private addFavorisURL = environment.addFavorisURL;
  private deleteFavorisURL = environment.deleteFavorisURL;
  private deleteCompteurClickURL = environment.deleteCompteurClickURL;
  private applicationsFavoritesURL = environment.applicationsFavoritesURL;
  private applicationsMoreClickedURL = environment.applicationsMoreClickedURL;
  private addCompteurClickURL = environment.addCompteurClickURL;
  private siamuURL = environment.siamuURL;
  private listeEntInfoURL = environment.listeEntInfoURL;
  private currentUidURL = environment.currentUidURL;
  private closeEntInfoURL = environment.closeEntInfoURL;

  public opened: boolean = false;
  private isMenuOpen: boolean = false;
  private isAdmin: boolean = false;
  private gestionnaire: Gestionnaire;
  private compteurAlertes = 0;
  private favoris: Favoris = new Favoris(null, null, null, null);
  private compteurClick: CompteurClick = new CompteurClick(null, null);
  private entInfos = [];
  private user: IUser;
  private uid: String;
  public nbMessageEntInfos = 0;
  private affichage: String;
  private isDelete = false;
  private isUp = false;
  public upDown = "fa fa-angle-double-down";
  intervalId: number;

  person = '';
  menus = [];
  menusSave = [];
  applications = [];
  applicationsFavorites = [];
  applicationsMoreClicked = [];
  subscription: Subscription;

  constructor(private router: Router,
    private http: Http,
    private httpClient: HttpClient,
    private jsonp: Jsonp,
    // private userService : UserService,
    private closeEntInfoService: CloseEntInfoService,
    public dialog: MatDialog,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.recupAppliBureau();
    /*this.getAlertesSiamu();
    const tempo_3_min = interval(180000);
    this.subscription = tempo_3_min.subscribe(val => this.getAlertesSiamu());
*/
    this.sharedService.change.subscribe(result => {
      this.person = result.firstname + ' ' + result.name;
      this.menus = result.menu;
      this.menusSave = this.menus;
      this.applications = result.applicationsMandatory;
      this.applicationsFavorites = result.applicationsFavorites;
      this.applicationsMoreClicked = result.applicationsMoreClicked;
    });
    // this.userService.getCurentUid(this.getEntInfos, this.entInfoURL);
  }
  opensnack(text) {
    // I've just commented this so that you're not bombarded with an alert.
    // alert(text);
    console.log(text);
  }
  ngAfterViewInit() {
    this.getEntInfos();
    //rafraichissement du menu toute les 15 minutes
    const tempo = interval(900000);
    this.subscription = tempo.subscribe(val => this.getAlertesSiamu());
  }

  affichageDelete(fname) {
    this.affichage = fname;
  }
  suppressionDelete() {
    this.affichage = "";
  }
  isAffichage(fname) {
    if (this.affichage == fname) {
      return {
        'display-none': false
      };
    } else {
      return {
        'display-none': true
      };
    }
  }
  deleteApplicationFavoris(application) {
    this.isDelete = true;
    this.deleteFavorite(application)
  }

  deleteApplicationMoreClicked(application) {
    this.isDelete = true;
    this.deleteMoreClicked(application)
  }
  getEntInfos() {
    var token = sessionStorage.getItem('token');
    var decoded = jwt_decode(token);
    this.uid = decoded['sub'];
    this.httpClient.get<String[]>(this.listeEntInfoURL + '?uid=' + this.uid)
      .subscribe(result => {
        this.entInfos = result;
        if (this.entInfos.length != 0) {
          this.openDialogEntInfo();
        }
      });

  }

  openDialogEntInfo() {

    const dialogRef = this.dialog.open(DialogEntInfoDialog, {
      width: '40%',
      height: '500px',
      data: { entInfos: this.entInfos }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.httpClient.get(this.closeEntInfoURL + "?uid=" + this.uid + "&closed=true")
        // , this.getRequestOptionArgs())
        .subscribe();
      // this.httpClient.get(this.closeEntInfoURL + "?uid=" + this.uid  + "&closed=true").subscribe();

    });
  }

  getAlertesSiamu() {
    this.httpClient.get<IAlerte[]>(this.siamuURL)
      // .subscribe(response => {
      // this.http.get(this.siamuURL, this.getRequestOptionArgs())
      // .map(response => response.json())
      .subscribe(alertes => {
        //si alerte presente
        if (alertes.length > 0) {
          //alors qu'il n'y en avait pas encore
          if (this.compteurAlertes == 0) {
            this.setAlertes(alertes);
          }
          //si alerte alors qu'il n'y en avait déja
          else {
            this.unsetAlertes();
            this.setAlertes(alertes);
          }
        }
        //pas d'alerte présente
        else {
          //et il n'y en avait pas avant
          if (this.compteurAlertes == 0) {
            //on ne fait rien
          }
          //il y en avait avant
          else {
            this.unsetAlertes();
          }
        }
        this.compteurAlertes = alertes.length;
      },
        err => {
          //console.log(err.status);
          if (err.status == 403) { // JWT expiré
            sessionStorage.removeItem('token');
            window.location.href = environment.remoteAccueil;
          }
        }
      )
  };


  private getRequestOptionArgs(): RequestOptionsArgs {
    var options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return options;
  }

  setAlertes(alertes) {
    alertes.forEach((alerte) => {
      this.menus.forEach((menu) => {
        menu.applications.forEach((application) => {
          if (application.fname == alerte.fname) {
            application.alerte = true;
            application.date_debut = alerte.date_debut;
            application.date_fin = alerte.date_fin;
            application.criticite = alerte.criticite;
            application.description_pub = alerte.date_debut + " &#13; " + alerte.description_pub;
          }
        });
      });
      this.applications.forEach((application) => {
        if (application.fname == alerte.fname) {
          application.alerte = true;
          application.date_debut = alerte.date_debut;
          application.date_fin = alerte.date_fin;
          application.criticite = alerte.criticite;
          application.description_pub = alerte.description_pub;
        }
      });
      this.applicationsFavorites.forEach((applicationFavorite) => {
        if (applicationFavorite.fname == alerte.fname) {
          applicationFavorite.alerte = true;
          applicationFavorite.date_debut = alerte.date_debut;
          applicationFavorite.date_fin = alerte.date_fin;
          applicationFavorite.criticite = alerte.criticite;
          applicationFavorite.description_pub = alerte.description_pub;
        }
      });
      this.applicationsMoreClicked.forEach((applicationMoreClicked) => {
        if (applicationMoreClicked.fname == alerte.fname) {
          applicationMoreClicked.alerte = true;
          applicationMoreClicked.date_debut = alerte.date_debut;
          applicationMoreClicked.date_fin = alerte.date_fin;
          applicationMoreClicked.criticite = alerte.criticite;
          applicationMoreClicked.description_pub = alerte.description_pub;
        }
      });
    })
  };

  unsetAlertes() {
    this.menus.forEach((menu) => {
      menu.applications.forEach((application) => {
        if (application.alerte == true) {
          application.alerte = false;
        }
      });
    });
    this.applications.forEach((application) => {
      if (application.alerte == true) {
        application.alerte = false;
      }
    });
    this.applicationsFavorites.forEach((applicationFavorite) => {
      if (applicationFavorite.alerte == true) {
        applicationFavorite.alerte = false;
      }
    });
    this.applicationsMoreClicked.forEach((applicationMoreClicked) => {
      if (applicationMoreClicked.alerte == true) {
        applicationMoreClicked.alerte = false;
      }
    });
  };

  getWsCompteurs(application, uid) {
    var fnameUid: FnameUid = new FnameUid(application.fname, uid);
    this.http.post(this.getURL + '?' + application.fname, fnameUid)
      .map(response => response.json())
      .subscribe(result => {
        if (result.Compteur > 0) {
          application.compteur = result.Compteur;
        } else {
          application.compteur = 0;
        }
      },
        err => { // Error
          if (err.status == 403) { // JWT expiré
            sessionStorage.removeItem('token');
            window.location.href = environment.remoteAccueil;
          }
        }
      );
  };

  getMessage(application): String {
    return 'Du ' + application.date_debut + ' au ' + application.date_fin + ' : \n' + application.description_pub;
  }

  openCloseMenus() {
    this.menus.forEach((menu) => {
      menu.open = !menu.open;
    });
    if (this.isUp) {
      this.upDown = "fa fa-angle-double-down";
    } else {
      this.upDown = "fa fa-angle-double-up";
    }
    this.isUp = !this.isUp;

  }


  recupAppliBureau() {
    // récupération du menu
    var token = sessionStorage.getItem('token');
    var decoded = jwt_decode(token);
    this.uid = decoded['sub'];
    this.person = decoded['firstname'] + ' ' + decoded['name'];

    this.httpClient.get<IMenu>(this.menuURL)
      .subscribe(result => {
        this.menus = result.menu;
        this.menusSave = this.menus;
        this.applications = result.applicationsMandatory;
        this.applicationsFavorites = result.applicationsFavorites;
        this.applicationsMoreClicked = result.applicationsMoreClicked;

        this.applicationsFavorites.forEach((applicationFavorite) => {
          if (applicationFavorite.requete != undefined && applicationFavorite.requete.length > 0) {
            this.getWsCompteurs(applicationFavorite, result.uid);
            if (applicationFavorite.timer != undefined) {
              const source = interval(applicationFavorite.timer * 60000);
              console.log(applicationFavorite.timer + ' Favorites' + applicationFavorite.fname);
              this.subscription = source.subscribe(val => this.getWsCompteurs(applicationFavorite, result.uid));
            }
          }
        });

        this.applicationsMoreClicked.forEach((applicationMoreClicked) => {
          if (applicationMoreClicked.requete != undefined && applicationMoreClicked.requete.length > 0) {
            this.getWsCompteurs(applicationMoreClicked, result.uid);
            if (applicationMoreClicked.timer != undefined) {
              const source = interval(applicationMoreClicked.timer * 60000);
              this.subscription = source.subscribe(val => this.getWsCompteurs(applicationMoreClicked, result.uid));
            }
          }
        });
        this.applications.forEach((application) => {
          if (application.requete != undefined && application.requete.length > 0) {
            this.getWsCompteurs(application, result.uid);
            if (application.timer != undefined) {
              const source = interval(application.timer * 60000);
              this.subscription = source.subscribe(val => this.getWsCompteurs(application, result.uid));
            }
          }
        });
        // on doit parser le menu pour les étoiles des favoris
        this.menus.forEach((menu) => {
          menu.applications.forEach((application) => {
            this.applicationsFavorites.forEach((applicationFavorite) => {
              if (applicationFavorite.id == application.id) {
                application.isFavorite = true;
              }
            });
          });
        });

        this.getAlertesSiamu();
      },
        err => {
          console.log(err.status);
          if (err.status == 403) { // JWT expiré
            sessionStorage.removeItem('token');
            //window.location.href = environment.login + encodeURIComponent("/tableau-bord");
            window.location.href = environment.remoteAccueil;
          }
        }
      );
  }

  public toggleOpened(): void {
    this.opened = !this.opened;
  }

  private onNavigate(application: Application, target) {
    //ouverture du nouvel onglet
    window.open(application.url, target);
    this.compteurClick.fname = application.fname;
    this.compteurClick.applicationId = application.id;

    //maj du compteur des clicks
    this.http.post(this.addCompteurClickURL + '?' + application.fname, this.compteurClick)
      .map(response =>
        console.log(response))
      .subscribe(result => {

      });
  }
  
  private addFavorite(application: Application) {
    this.favoris.position = this.applicationsFavorites.length;
    this.favoris.applicationId = application.id;
    this.favoris.fname = application.fname;
    this.http.post(this.addFavorisURL, this.favoris)
      .map(response => console.log(response))
      .subscribe(result => {
        //ajout du favoris
        this.applicationsFavorites.push(application);
        this.menus.forEach((menu) => {
          menu.applications.forEach((element) => {
            if (element.id === application.id) {
              element.isFavorite = true;
            }
          });
        });
      });
  }

  private deleteFavorite(application: Application) {
    this.favoris.fname = application.fname;
    this.favoris.applicationId = application.id;
    this.http.post(this.deleteFavorisURL, this.favoris)
      .map(response =>
        console.log(response))
      .subscribe(result => {
        console.log("delete-favoris-ok");
        //suppression du favoris
        var removeIndex = this.applicationsFavorites.map(function (application) {
          return application.id;
        }).indexOf(this.favoris.applicationId);
        this.applicationsFavorites.splice(removeIndex, 1);

        this.menus.forEach((menu) => {
          menu.applications.forEach((element) => {
            if (element.id === application.id) {
              element.isFavorite = false;
            }
          });
        });
      });
  }

  private deleteMoreClicked(application: Application) {

    this.compteurClick.fname = application.fname;
    this.compteurClick.applicationId = application.id;
    this.http.post(this.deleteCompteurClickURL, this.compteurClick)
      .map(response =>
        console.log(response))
      .subscribe(result => {
        console.log("delete-compteurClick-ok");
        //suppression du favoris
        var removeIndex = this.applicationsMoreClicked.map(function (application) {
          return application.id;
        }).indexOf(this.compteurClick.applicationId);
        this.applicationsMoreClicked.splice(removeIndex, 1);
      });
  }

  actionClick(action: string, application: Application, target) {
    switch (action) {
      case "deleteFavorite": {
        this.deleteFavorite(application);
        break;
      }
      case "addFavorite": {
        this.addFavorite(application);
        break;
      }
      case "onNavigate": {
        if (this.isDelete == true) {
          this.isDelete = false;
          break;
        } else {
          this.onNavigate(application, target);
          break;
        }
      }
      default: {
        break;
      }
    }
  }
  onSearchChange(input) {
    if (input == null || input == "") {
      this.menus = this.menusSave;
      this.menus.forEach((menu) => {
        menu.applications.forEach((element) => {
          if (element.name.toLowerCase().includes(input.toLowerCase())) {
            element.isFiltre = false;
          }
        });
      });
      this.myPanels.closeAll();
    } else {
      this.myPanels.openAll();
      this.menus = this.menusSave;
      this.menus.forEach((menu) => {
        menu.applications.forEach((element) => {
          if (element.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))) {
            element.isFiltre = false;
          } else {
            element.isFiltre = true;
          }
        });
      });
    }
  }

  openAll() {
    this.myPanels.openAll();
    this.isMenuOpen = true;
  }

  closeAll() {
    this.myPanels.closeAll();
    this.isMenuOpen = false;
  }
}

@Component({
  selector: 'ent-info-dialog',
  templateUrl: '../entInfo/ent-info-dialog.html',
  styleUrls: ['../entInfo/ent-info.component.css'],
})
export class DialogEntInfoDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogEntInfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeAnnonce() {
    this.dialogRef.close();
  }
}
