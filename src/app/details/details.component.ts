import { Component, EventEmitter, Input, Output } from '@angular/core';
import { detailsData, modalData } from '../constants/text-constants';
import { episodeType, selectedData } from '../model';
import { fetchEpisodeDetails } from '../common-utils';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  constructor() {

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
        fetchEpisodeDetails(this.nameDetails.episode,this.episodeData)    

  }
  hideDetails() {
    this.isDetailsHide = true;
    this.detailsEmitter.emit();

  }
}
