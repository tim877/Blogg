import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloggDetaljerComponent } from './blogg-detaljer.component';

describe('BloggDetaljerComponent', () => {
  let component: BloggDetaljerComponent;
  let fixture: ComponentFixture<BloggDetaljerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloggDetaljerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloggDetaljerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
