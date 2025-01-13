import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute } from '@angular/router';
import { detailsData, modalData } from '../constants/text-constants';
import { episodeType, selectedData } from '../model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  constructor(private dataService: DataService) {

  }
  @Input() nameDetails: selectedData;
  episodeData: episodeType[];
  isDetailsHide = false;
  @Output() detailsEmitter = new EventEmitter<void>()
  isVisible: boolean = false;
  modalData = modalData;
  detailsData = detailsData;

  ngOnInit() {

  }
  closeModal() {

    this.isVisible = false;
  }
  onDataClick() {
    this.isVisible = true;
    this.fetchEpisodeDetails(this.nameDetails.episode);
    

  }
  hideDetails() {
    this.isDetailsHide = true;
    this.detailsEmitter.emit();

  }
   fetchEpisodeDetails(episodeUrls: any[]): void {
      const episodeRequests = episodeUrls.map(url =>
        this.dataService.getEpisodeDetails(url)
      );
      forkJoin(episodeRequests).subscribe({
        next: (responses) => {
          this.episodeData = responses;  
        },
        error: (error) => {
          console.error('Error fetching episode details', error);
        },
       
      });
    
    }

}
