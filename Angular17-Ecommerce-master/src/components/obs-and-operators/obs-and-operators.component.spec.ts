import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsAndOperatorsComponent } from './obs-and-operators.component';

describe('ObsAndOperatorsComponent', () => {
  let component: ObsAndOperatorsComponent;
  let fixture: ComponentFixture<ObsAndOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObsAndOperatorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObsAndOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
