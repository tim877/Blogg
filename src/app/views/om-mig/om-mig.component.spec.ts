import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmMigComponent } from './om-mig.component';

describe('OmMigComponent', () => {
  let component: OmMigComponent;
  let fixture: ComponentFixture<OmMigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OmMigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmMigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
