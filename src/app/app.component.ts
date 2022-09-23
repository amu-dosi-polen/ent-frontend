import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Http, Jsonp, RequestOptions, Headers } from "@angular/http";
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { WindowRef } from './WindowRef';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Rx";
import { HttpClient } from '@angular/common/http';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import {environment} from "../environments/environment";
import {CdkDropList, CdkDragDrop} from '@angular/cdk/drag-drop';
import { SharedService } from './services/sharedService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private http: Http,
    private jsonp: Jsonp,
    private window: WindowRef,
    private httpClient: HttpClient,
    private location: Location,
    private router: Router,
    private sharedService: SharedService){

  }

  result : Array<Object>;

  mayRedirect():void {
    window.location.href = environment.login + encodeURIComponent("/tableau-bord");
  }

  initialLogin(): void {

    let apiURL = environment.callback;
    this.jsonp.request(apiURL)
    .toPromise()
    .then(
      data => { // Success
        console.log(data.json());
        //stockage du jwt
        sessionStorage.setItem('token', 'Bearer ' +  `${data.json().token}`);
        this.router.navigate(['/tableau-bord']);
      },
      error => { // Error
        console.log("redirect");
        this.mayRedirect();
      }
    );
  }

  ngOnInit() {
    if(sessionStorage.getItem('token') !== undefined && sessionStorage.getItem('token') !== null){
      this.router.navigate(['/tableau-bord']);
    } else {
      this.initialLogin();
    }

    this.sharedService.jwtTimeOut.subscribe(result => {
      this.createNewJwt();
    });
  }

  createNewJwt() {
    sessionStorage.removeItem('token');
    let apiURL = environment.callback;
    this.jsonp.request(apiURL)
    .toPromise()
    .then(
      data => { // Success
        console.log(data.json());
        //stockage du jwt
        sessionStorage.setItem('token', 'Bearer ' +  `${data.json().token}`);
        //rechargement de la page avec les ws
        window.location.href = environment.login + encodeURIComponent("/tableau-bord");
      },
      error => { // Error

      }
    );
  }

 ngAfterViewInit() {
 }

}
