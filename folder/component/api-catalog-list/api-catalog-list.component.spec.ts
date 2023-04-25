import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCatalogListComponent } from './api-catalog-list.component';

describe('ApiCatalogListComponent', () => {
  let component: ApiCatalogListComponent;
  let fixture: ComponentFixture<ApiCatalogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiCatalogListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCatalogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
