import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { FilterService } from '../service/filter.service';
import { debounceTime, forkJoin, Observable, Subscription } from 'rxjs';
import { AuthService } from '../service/authentication.service';
import {  Router } from '@angular/router';
import { data, episodeType, selectedData } from '../model';
import { modalData, paginationData, tableData } from '../constants/text-constants';
import { fetchEpisodeDetails } from '../common-utils';

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
  selectedEpisode: selectedData;
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
    this.authSubscription = this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
      }
    });

    this.fetchData();
    this.filterService.searchQuery$.pipe(debounceTime(300)).subscribe((query: string) => {
      this.filterName(query);

    })



  }

  fetchData(url?: string): void {
    this.selectedRowIndex = -1;
    this.selectedpERSON = undefined;
    this.dataService.getData(url).subscribe({
      next: (response: data) => {
        if (response) {
          this.data = response;
          this.totalItems = response.info.count;
          this.totalPages = response.info.pages;
          this.nextUrl = response.info.next;
          this.prevUrl = response.info.prev;
          if (this.nextUrl) {
            const nextPage = +new URL(this.nextUrl).searchParams.get('page');
            this.currentPage = nextPage - 1;

          } else if (this.prevUrl) {
            const prevPage = +new URL(this.prevUrl).searchParams.get('page');
            this.currentPage = prevPage + 1;
          } else {
            this.currentPage = 1;
          }
          console.log(this.nextUrl);


        }


      },
    }


    );




  }
  

  onNameClick(person: selectedData, i: number) {
    this.selectedpERSON = person;
    this.selectedRowIndex = i;

  }
  onEpisodeClick(item: selectedData, i: number) {
    this.selectedEpisode = item;
    this.selectedEpisodeIndex = i;

    this.isVisible = true;
    fetchEpisodeDetails(this.selectedEpisode.episode,this.episodeDetails)




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





}
