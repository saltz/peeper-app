import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { Router } from '@angular/router';
import { HttpResponse, HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user.model';
import { retry, catchError } from 'rxjs/operators';
import { JwtToken } from '../models/jwtToken.model';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static readonly TOKEN_STORAGE_KEY = 'token';
  static readonly USER_ID = 'userId';
  private user = new User();
  redirectToUrl = '/home';

  constructor(private router: Router, private restApi: RestApiService, private http: HttpClient) { }

  public login(token: JwtToken): void {
    console.log(token);
    this.restApi.getJwtToken(token)
      .subscribe((res: HttpResponse<any>) => {
        console.log(res.body);
        this.saveToken(res.body.access_token);
        this.router.navigate([this.redirectToUrl]);
        this.getUserById(res.body.access_token);
      });
  }

  private getUserById(token: string): void {
    console.log(token);
    const parsedToken = jwt_decode(token);
    console.log(parsedToken);

    this.http.get<User>(`${this.restApi.apiUrl}${this.restApi.apiVersion}/users/${parsedToken.Id}`)
    .pipe(
        retry(1),
        catchError(this.restApi.handleError)
      )
      .subscribe(data => {
        console.log(data);
        localStorage.setItem(AuthService.USER_ID, data.id);
        this.user = data;
      });
  }

  public getUser(): User {
    return this.user;
  }

  public getUserId(): string {
    return localStorage.getItem(AuthService.USER_ID);
  }

  private saveToken(token: string) {
    localStorage.setItem(AuthService.TOKEN_STORAGE_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(AuthService.TOKEN_STORAGE_KEY);
  }

  public logout(): void {
    localStorage.removeItem(AuthService.TOKEN_STORAGE_KEY);
    localStorage.removeItem(AuthService.USER_ID);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
