import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { data, episodeType, selectedData } from '../model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private url=  'https://rickandmortyapi.com/api/character'

  getData(url:string= this.url): Observable<data> {
    return this.http.get<data>(url);
  }

  getEpisodeDetails(episodeUrl: string): Observable<episodeType> {
    return this.http.get<episodeType>(episodeUrl);
  }
}
