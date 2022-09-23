import { HttpInterceptor, HttpSentEvent, HttpHeaderResponse, HttpHandler, HttpEvent, HttpRequest, HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { tap, catchError } from "rxjs/operators";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let jsonReq: HttpRequest<any> = req.clone({

      setHeaders:{
        'Authorization' : `${sessionStorage.getItem('token')}`,
        // Authorization : `Bearer ${sessionStorage.getItem("token")}`;
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8,application/json'
      }
    });

    return next.handle(jsonReq);
  }

}
  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   return Observable.fromPromise(this.handleAccess(request, next));
  // }
  //
  // private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
  //     Promise<HttpEvent<any>> {
  //   let changedRequest = request;
  //   // HttpHeader object immutable - copy values
  //   const headerSettings: {[name: string]: string | string[]; } = {};
  //
  //   for (const key of request.headers.keys()) {
  //     headerSettings[key] = request.headers.getAll(key);
  //   }
  //   if (sessionStorage.getItem('token')) {
  //     headerSettings['Authorization'] = 'Bearer ' + sessionStorage.getItem('token');
  //   }
  //   headerSettings['Content-Type'] = 'application/json';
  //   const newHeader = new HttpHeaders(headerSettings);
  //
  //   changedRequest = request.clone({
  //     headers: newHeader});
  //   return next.handle(changedRequest).toPromise();
  // }
//
// }
