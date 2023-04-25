import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCatalogResponsePopupComponent } from './api-catalog-response-popup.component';

describe('ApiCatalogResponsePopupComponent', () => {
  let component: ApiCatalogResponsePopupComponent;
  let fixture: ComponentFixture<ApiCatalogResponsePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiCatalogResponsePopupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCatalogResponsePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
