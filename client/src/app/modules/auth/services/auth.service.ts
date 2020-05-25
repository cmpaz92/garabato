import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

export interface CredentialsDto {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: any;
}

export interface SignupResponse {
  token: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string) {
    const body: CredentialsDto = {
      username,
      password,
    };

    return this.httpClient.post<LoginResponse>(
      `${environment.authapiPath}/login`, body
    ).pipe(
      tap(response => {
        // if the login was successful the server responds with an auth token which will be saved
        console.log(response.user);
        this.setToken(response.token, response.user);
        console.log('response', response);
      }),
      catchError(error => {
        // if an error occurs it will be logged ans passed along as error
        console.log('error', error);
        // TODO: add error handling
        return throwError(error);
      }),
    );
  }

  signup(username: string, password: string) {
    const body: CredentialsDto = {
      username,
      password,
    };

    return this.httpClient.post<SignupResponse>(
      `${environment.authapiPath}/signup`, body
    ).pipe(
      tap(response => {
        // if the login was successful the server responds with an auth token which will be saved
        console.log(response.token)
        this.setToken(response.token, response.user);
        console.log('response', response.token);
      }),
      catchError(error => {
        // if an error occurs it will be logged ans passed along as error
        //console.log('error', error.error.msg);
        // TODO: add error handling
        let errors = [];
        console.log(error.error.errors);
        console.log(error.error.msg);
        error.error.msg ? errors.push(error.error.msg) : errors.push(error.error.errors["0"].msg);
        console.log("errors" + errors);
        return throwError(errors);
      }),
    );
  }

  logout() {
    // performing any logout logic as observable
    return new Observable(observer => {
      this.removeToken();
      observer.next();
      observer.complete();
    });
  }

  /**
   * used on app startup to check if an existing token is still valid.
   * If so, everything is fine.
   * If not, the token will be removed.
   */
  initializeSession(): Promise<void> {
    console.log('⚡️ initialize app');
    console.log('existing token:', this.getToken());

    if (this.getToken() != null) {
      // accessing a secured API call. If this call returns an error the token is not valid anymore
      return this.getMe()
        .pipe(
          catchError(() => {
            // token is invalid. Remove it and return a new observable
            this.removeToken();
            return of(null);
          }),
          map(() => null),
        )
        .toPromise();
    }

    return Promise.resolve();
  }

  isLoggedIn() {
    return this.getToken() != null;
  }

  setToken(authToken: string, user: any) {
    console.log('storing token', authToken);
    console.log(user._id);
    localStorage.setItem('token', authToken);
    localStorage.setItem('id', user._id);
  }

  getID() {
    return localStorage.getItem('id') || null;
  }
  
  getToken() {
    return localStorage.getItem('token') || null;
  }

  removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }


  getMe() {
    let httpOptions;
    if (this.getToken() != null) {
      httpOptions = {
        headers: new HttpHeaders({ 'token': this.getToken() })
      };
    }

    return this.httpClient.get(`${environment.authapiPath}/${this.getID()}`, httpOptions);
  }
}
