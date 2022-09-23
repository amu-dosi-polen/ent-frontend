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
// @Injectable()({
//   providedIn: 'root'
// })

export class UserService {

  private currentUidURL = environment.currentUidURL;
  private isAdmin;
  // constructeur ...
  constructor(private http: Http,
              private httpClient : HttpClient) { }

  //Récupération du profil uilisateur
  // getCurentUid() {
  //   return this.httpClient.get<String>(this.currentUidURL)
  //       .pipe(map(response => {
  //           const uid = response.uid
  //           return uid;
  //       }
  //     ));
  // }
  // getCurentUid(callback, url) {
  //   return this.httpClient.get<String>(this.currentUidURL)
  //   .subscribe(
  //        response => {
  //          const uid = response.uid
  //          callback(uid, url);
  //
  //        }, error => {
  //
  //        });
  // }
  getIsAdmin() : boolean {
    return this.isAdmin;
  }
  setIsAdmin( value : boolean) {
    this.isAdmin = value;
  }
}
