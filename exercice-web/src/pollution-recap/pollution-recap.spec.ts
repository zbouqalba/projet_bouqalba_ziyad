import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollutionRecap } from './pollution-recap';

describe('PollutionRecap', () => {
  let component: PollutionRecap;
  let fixture: ComponentFixture<PollutionRecap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollutionRecap]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PollutionRecap);
    component = fixture.componentInstance;

    // Provide some dummy data for the required input
    component.data = {
      title: 'Test Title',
      typePollution: 'Air',
      description: 'Test description',
      date: '2023-10-01',
      lieu: 'Test Location',
      latitude: 48.8566,
      longitude: 2.3522,
      photo: null
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
