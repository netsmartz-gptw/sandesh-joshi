import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCatalogRequestPopupComponent } from './api-catalog-request-popup.component';

describe('ApiCatalogRequestPopupComponent', () => {
  let component: ApiCatalogRequestPopupComponent;
  let fixture: ComponentFixture<ApiCatalogRequestPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiCatalogRequestPopupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCatalogRequestPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
