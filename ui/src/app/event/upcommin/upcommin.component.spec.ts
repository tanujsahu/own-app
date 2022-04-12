import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomminComponent } from './upcommin.component';

describe('UpcomminComponent', () => {
  let component: UpcomminComponent;
  let fixture: ComponentFixture<UpcomminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
