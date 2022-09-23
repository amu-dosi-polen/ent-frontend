import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { map } from 'rxjs/operators';

import { environment } from "../../environments/environment";

@Injectable()

export class CloseEntInfoService {

  private closeEntInfoURL = environment.closeEntInfoURL;

  // constructeur ...
  constructor(private httpClient : HttpClient) { }

  //Récupération du profil uilisateur
  // getCurentUid() {
  //   return this.httpClient.get<String>(this.currentUidURL)
  //       .pipe(map(response => {
  //           const uid = response.uid
  //           return uid;
  //       }
  //     ));
  // }
  // getCloseEntInfo() {
  //   const uid =  JSON.parse(sessionStorage.getItem('uid'));
  //   if(uid != undefined){
  //     return this.httpClient.get<String>(this.closeEntInfoURL + "?uid=" + uid  + "&closed=true")
  //     .subscribe(
  //          response => {
  //
  //          }, error => {
  //
  //          });
  //   }
  // }
}
