import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RestApiService, AuthService, Peep } from '..';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PeepApiService {

    constructor(private restApi: RestApiService, private auth: AuthService, private http: HttpClient) { }

    createTweet(message: Peep) {
        return this.http.post(`${this.restApi.apiUrl}${this.restApi.apiVersion}/users/${this.auth.getUserId()}/peeps`,
            message, this.restApi.httpOptions)
          .pipe(
            retry(1),
            catchError(this.restApi.handleError)
          );
      }

    getTweets() {
        return this.http.get<Peep[]>(`${this.restApi.apiUrl}${this.restApi.apiVersion}/peeps`)
          .pipe(
            retry(1),
            catchError(this.restApi.handleError)
          );
      }

    getRecentTweets() {
        return this.http.get<Peep[]>(`${this.restApi.apiUrl}${this.restApi.apiVersion}/users/${this.auth.getUserId()}/peeps`)
            .pipe(
            retry(1),
            catchError(this.restApi.handleError)
            );
    }
}
