import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCatalogAuthListComponent } from './api-catalog-auth-list.component';

describe('ApiCatalogAuthListComponent', () => {
  let component: ApiCatalogAuthListComponent;
  let fixture: ComponentFixture<ApiCatalogAuthListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiCatalogAuthListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCatalogAuthListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
