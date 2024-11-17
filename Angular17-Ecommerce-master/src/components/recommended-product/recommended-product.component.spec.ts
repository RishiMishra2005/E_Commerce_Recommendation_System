import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedProductComponent } from './recommended-product.component';

describe('RecommendedProductComponent', () => {
  let component: RecommendedProductComponent;
  let fixture: ComponentFixture<RecommendedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendedProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecommendedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
