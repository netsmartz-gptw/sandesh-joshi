import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCatalogEditAuthComponent } from './api-catalog-edit-auth.component';

describe('ApiCatalogEditAuthComponent', () => {
  let component: ApiCatalogEditAuthComponent;
  let fixture: ComponentFixture<ApiCatalogEditAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiCatalogEditAuthComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCatalogEditAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
