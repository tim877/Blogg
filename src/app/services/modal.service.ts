import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Service is provided globally in the application
})
export class ModalService {
  // Manages the visibility state of the modal using a BehaviorSubject
  private modalVisibleSubject = new BehaviorSubject<boolean>(false);

  // Observable that emits changes to the modal visibility state
  modalVisible$ = this.modalVisibleSubject.asObservable();

  // Toggles the modal visibility state by emitting a new value
  toggleModal(show: boolean) {
    this.modalVisibleSubject.next(show);
  }

  // Retrieves the current modal visibility state
  getModalVisible(): boolean {
    return this.modalVisibleSubject.getValue();
  }
}
