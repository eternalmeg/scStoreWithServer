import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, map, Observable, Subscription, tap} from "rxjs";
import {User} from "../types/user";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../shared/api-config";


@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: User | undefined;
  api = API_URL


  get isLoggedIn(): boolean {
    return !!this.user;
  }
  get currentUserId(): string | undefined {
    return this.user ? this.user._id : undefined;
  }
  get currentUserName(): string | undefined {
    return this.user ? this.user.name: undefined;
  }

  subscription: Subscription;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.user$$.next(this.user);
    }
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    })
  }

  register(
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
      .post<User>(`${this.api}/auth/login`, {email, password})
      .pipe(tap((user) => {
        this.user$$.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.getProfile().subscribe();
      }));
  }

  logout() {
    return this.http.post<User>(`${this.api}/auth/logout`, {})
      .pipe(tap(() => {
        this.user$$.next(undefined);
         this.user = undefined;
        localStorage.removeItem('user')
      }))
  }

  getProfile() {
    return this.http.get<User>(`${this.api}/auth/profile`)
      .pipe(tap(user => this.user$$.next(user)))
  }

  updateProfile(name: string, phone: string) {
    return this.http.put<User>(`${this.api}/auth/profile`, {name, phone})
      .pipe(tap((user) => this.user$$.next(user)));
  }

  getOwnersByIds(ownerIds: User[] | undefined): Observable<User[]> {
    return this.http.post<User[]>(`${this.api}/auth/get-owners`, {ownerIds})
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.api}/auth/${userId}`);
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
