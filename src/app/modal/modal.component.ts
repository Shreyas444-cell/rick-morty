import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { popupData } from '../constants/text-constants';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
  @Input() isVisible=false;
  @Output() closed = new EventEmitter<any>();
  popupData=popupData;
  close(){
    this.isVisible=false;
    this.closed.emit()

  }

}
