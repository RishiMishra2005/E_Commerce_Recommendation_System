import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAuthComponent } from './login-auth.component';

describe('LoginAuthComponent', () => {
  let component: LoginAuthComponent;
  let fixture: ComponentFixture<LoginAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
