import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }
  private searchQuerySource = new BehaviorSubject<string>('');
  searchQuery$ =this.searchQuerySource.asObservable();
  updateSearchQuery(query:string){
    this.searchQuerySource.next(query);
  
  }
}

