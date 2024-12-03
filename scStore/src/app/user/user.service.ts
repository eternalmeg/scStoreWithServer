import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, map, Observable, Subscription, tap} from "rxjs";
import {User} from "../types/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy{
  private user$$ = new BehaviorSubject< User | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: User | undefined;
  api ='http://localhost:3000'


  get isLoggedIn(): boolean {
    return !!this.user;
  }

  subscription: Subscription;

  constructor(private http:HttpClient) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    })
  }

  register (
    name: string,
    email: string,
    phone: string,
    password: string,
    rePassword: string) {
    return this.http
      .post<User>(`${this.api}/auth/register`, {
        name,
        email,
        phone,
        password,
        rePassword
      })
      .pipe(
        tap(() => {
          this.login(email, password).subscribe();
        })
      )
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(`${this.api}/auth/login`, { email, password })
      .pipe(tap((user) => {console.log('login response', user); this.user$$.next(user);
        this.getProfile().subscribe();
      }) );
  }

  logout() {
    return this.http.post<User>(`${this.api}/auth/logout`, {})
      .pipe(tap(()=> this.user$$.next(undefined)))
  }

getProfile() {
    return this.http.get<User>(`${this.api}/auth/profile`)
      .pipe(tap(user => this.user$$.next(user)))
}

updateProfile(name: string, phone: string) {
    return this.http.put<User>(`${this.api}/auth/profile`, {name, phone})
      .pipe(tap((user) => this.user$$.next(user)));
}

  getOwnersByIds(ownerIds: User[] | undefined): Observable<User[]>{
    return this.http.post<User[]>(`${this.api}/auth/get-owners`, {ownerIds})
  }




  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
