import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Bienvenue } from './bienvenue';

describe('Bienvenue', () => {
  let component: Bienvenue;
  let fixture: ComponentFixture<Bienvenue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bienvenue]
    }).compileComponents();

    fixture = TestBed.createComponent(Bienvenue);
    component = fixture.componentInstance;
    component.data = {
      login: 'test',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
