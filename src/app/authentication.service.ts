// Authentication service for the login functionality

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Users_New } from './users';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Users_New>;
    public currentUser: Observable<Users_New>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Users_New>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Users_New {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string, users_new: any) {

        return this.http.post<any>('/authenticate', { username, password, users_new })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                location.reload();
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        location.reload()
    }
}