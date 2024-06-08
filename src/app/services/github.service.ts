import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { CONFIG } from '../utils/config';
import { History, User } from '../utils/type';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private baseUrl: string = CONFIG.baseUrl;
  // private token?: string = CONFIG.githubToken;

  private searchHistorySubject: BehaviorSubject<History[]> =
    new BehaviorSubject<History[]>([]);

  getHistory$: Observable<History[]>;

  private getFromStorage<T>(key: string) {
    const hasValues = Boolean(localStorage.getItem(key));
    const values = hasValues ? JSON.parse(localStorage.getItem(key) ?? '') : [];
    return values as T[];
  }

  private saveToStorage<T>(key: string, data: T) {
    const values = this.getFromStorage<T>(key);
    values.push(data);
    localStorage.setItem(key, JSON.stringify(values));
  }

  private removeFromStorage<T>(key: string) {
    localStorage.removeItem(key);
  }

  constructor(private http: HttpClient) {
    this.getHistory$ = this.searchHistorySubject.asObservable();
  }

  getUser(username: string): Observable<User | null> {
    const headers = new HttpHeaders({
      // Authorization: `token ${this.token}`,
    });

    return this.http
      .get<User | null>(`${this.baseUrl}/users/${username}`, {
        headers,
      })
      .pipe(
        map((response) => {
          let user = null;

          if (response) {
            user = {
              avatar_url: response.avatar_url,
              name: response.name,
            };
          }

          this.saveToStorage('history', {
            searchterm: username,
            result: user,
          });

          this.searchHistorySubject.next([
            ...this.getFromStorage<History>('history'),
          ]);

          return user;
        }),
        catchError((error) => {
          console.log(error);
          this.saveToStorage('history', {
            searchterm: username,
            result: null,
          });
          this.searchHistorySubject.next([
            ...this.getFromStorage<History>('history'),
          ]);
          return of(null);
        })
      );
  }

  // getHistory(): Observable<History[]> {
  //   const hasHistory = Boolean(localStorage.getItem('history'));
  //   const history: History[] = hasHistory
  //     ? JSON.parse(localStorage.getItem('history') ?? '')
  //     : [];

  //   return of(history);
  // }

  clearHistory() {
    this.removeFromStorage('history');
    this.searchHistorySubject.next([]);
  }
}
