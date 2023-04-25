import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCatalogExecutionPopupComponent } from './api-catalog-execution-popup.component';

describe('ApiCatalogExecutionPopupComponent', () => {
  let component: ApiCatalogExecutionPopupComponent;
  let fixture: ComponentFixture<ApiCatalogExecutionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiCatalogExecutionPopupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCatalogExecutionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
