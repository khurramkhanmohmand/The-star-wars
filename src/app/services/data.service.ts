import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';

const API: string = 'https://swapi.dev/api';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private category: string = '';
  private searches: string[] = [];

  private list: BehaviorSubject<any> = new BehaviorSubject(null);
  public _list: Observable<any> = this.list.asObservable();

  private _isHeader: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private http: HttpClient) { }

  public get isHeader(): Observable<boolean> {
    return this._isHeader.asObservable();
  }

  public set isHeader(value: any) {
    this._isHeader.next(value);
  }

  public getList(catogery: string): Observable<any> {
    this.category = catogery;
    return this.http
      .get(`${API}/${catogery}`)
      .pipe(
        shareReplay(),
        tap((data: any) => this.list.next(data))
      );
  }

  getFilmsDetail(id: any) {
    return this.http.get(`${API}/films/${id}`)
      .pipe(
        shareReplay(),
      );
  }

  getPeopleDetail(id: any) {
    return this.http.get(`${API}/people/${id}`)
      .pipe(
        shareReplay(),
      );
  }

  getHomeWorld(link: any) {
    return this.http.get(link)
      .pipe(
        shareReplay(),
      );
  }

  search(keyword: string, isSave = true): Observable<any> {
    if (isSave && keyword !== '') {
      if (this.searches.length >= 4) this.searches.pop();
      this.searches.unshift(keyword);
    }

    return this.http
      .get(`${API}/${this.category}/?search=${keyword}`)
      .pipe(
        shareReplay(),
        tap((data: any) => this.list.next(data)),
        map(() => [...this.searches]),
      );
  }
}
