// src/app/services/modal.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalSubject = new Subject<boolean>();

  // Observable för att prenumerera på modalens synlighet
  modalVisibility$ = this.modalSubject.asObservable();

  // Metod för att visa eller dölja modal
  toggleModal(show: boolean) {
    this.modalSubject.next(show);
  }
}
