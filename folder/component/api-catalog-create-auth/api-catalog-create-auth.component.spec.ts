import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCatalogCreateAuthComponent } from './api-catalog-create-auth.component';

describe('ApiCatalogCreateAuthComponent', () => {
  let component: ApiCatalogCreateAuthComponent;
  let fixture: ComponentFixture<ApiCatalogCreateAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiCatalogCreateAuthComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCatalogCreateAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
