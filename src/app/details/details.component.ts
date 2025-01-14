import { Component, EventEmitter, Input, Output } from '@angular/core';
import { detailsData, modalData } from '../constants/text-constants';
import { episodeType, selectedData } from '../model';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  constructor(private  dataService:DataService) {

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
       this.fetchEpisodes(this.nameDetails.episode);

  }
  hideDetails() {
    this.isDetailsHide = true;
    this.detailsEmitter.emit();

  }
  fetchEpisodes(episodeUrls: string[]): void {
    this.dataService.getEpisodeDetails(episodeUrls).subscribe(
      episodes => {
        this.episodeData = episodes;
      },
      
    );
  }
}
