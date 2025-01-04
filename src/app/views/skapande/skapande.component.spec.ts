import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkapandeComponent } from './skapande.component';

describe('SkapandeComponent', () => {
  let component: SkapandeComponent;
  let fixture: ComponentFixture<SkapandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkapandeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkapandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
