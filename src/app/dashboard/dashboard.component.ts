import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { FilterService } from '../service/filter.service';
import { debounceTime, forkJoin, Observable, Subscription } from 'rxjs';
import { AuthService } from '../service/authentication.service';
import {  Router } from '@angular/router';
import { data, episodeType, selectedData } from '../model';
import { modalData, paginationData, tableData } from '../constants/text-constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private dataService: DataService, private router: Router, private filterService: FilterService, private authService: AuthService) { }
  data: data;
  selectedpERSON: selectedData;
  selectedRowIndex = -1;
  selectedEpisodeIndex = -1;
  filteredItems: selectedData[];
  searchQuery: string = "";
  isVisible: boolean = false;
  authSubscription: Subscription;
  selectedEpisode: string[];
  episodeDetails: episodeType[]=[];
  currentPage: number = 1;
  totalPages: number = 0;
  totalItems: number = 0;
  nextUrl: string | null = null;
  prevUrl: string | null = null;
  tableData = tableData;
  paginationData = paginationData;
  searchedQuery: string = "";
  modalData = modalData;
  ngOnInit() {
     this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
      }
    });

    this.fetchData(this.currentPage);
    this.filterService.searchQuery$.pipe(debounceTime(300)).subscribe((query: string) => {
      this.filterName(query);

    })



  }

  fetchData(page: number): void {
    this.dataService.getData(page).subscribe(
      response => {
        this.data = response;
        
        this.totalPages = response.info.pages;

        this.currentPage = page;
        this.filteredItems=this.data.results
      },
    );
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.fetchData(this.currentPage + 1);
      this.filterService.searchQuery$.pipe(debounceTime(10)).subscribe((query: string) => {
        this.filterName(query);
  
      })
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.fetchData(this.currentPage - 1);
      this.filterService.searchQuery$.pipe(debounceTime(10)).subscribe((query: string) => {
        this.filterName(query);
      })
    }
  }
  

  onNameClick(person: selectedData, i: number) {
    this.selectedpERSON = person;
    this.selectedRowIndex = i;

  }
  onEpisodeClick(item: selectedData, i: number) {
    this.selectedEpisode = item.episode;
    this.selectedEpisodeIndex = i;

    this.isVisible = true;
    console.log(this.selectedEpisode);
    this.fetchEpisodes(this.selectedEpisode)    




  }
  closeModal() {
    this.selectedEpisodeIndex = -1;

    this.isVisible = false;
  }
  filterName(query: string) {
      if (query) {
        this.searchedQuery=query;
        this.filteredItems = this.data?.results.filter((item: selectedData) =>

          item.name.toLowerCase().includes(query.toLowerCase())

        );
        this.selectedpERSON = undefined;
        this.selectedRowIndex = -1;

      } else {
        this.filteredItems = this.data.results;
        this.searchedQuery= "";

      }
     

  }
  detailsEmitter() {
    this.selectedRowIndex = -1;
    this.selectedpERSON = undefined;
  }
  highlightText(text: string, query: string): string {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi'); 
    return text.replace(regex, `<mark>$1</mark>`); 
  }

fetchEpisodes(episodeUrls: string[]): void {
  this.dataService.getEpisodeDetails(episodeUrls).subscribe(
    episodes => {
      this.episodeDetails = episodes;
    },
    
  );
}





}
