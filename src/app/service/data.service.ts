import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { data } from '../model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private url=  'https://rickandmortyapi.com/api/character'

  getData(page:number): Observable<data> {
    return this.http.get<any>(`${this.url}?page=${page}`);
  }

  getEpisodeDetails(urls: string[]): Observable<any[]> {
    return forkJoin(urls.map(url => this.http.get<any>(url)));
  }
}
