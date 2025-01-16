import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalVisibleSubject = new BehaviorSubject<boolean>(false);  // Modal visibility as BehaviorSubject
  modalVisible$ = this.modalVisibleSubject.asObservable();  // Observable for components to subscribe to

  toggleModal(show: boolean) {
    this.modalVisibleSubject.next(show);  // Update modal visibility state
  }

  getModalVisible(): boolean {
    return this.modalVisibleSubject.getValue();  // Get the current modal visibility state
  }
}
