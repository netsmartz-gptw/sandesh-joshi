import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateApiCatalogComponent } from './create-api-catalog.component';

describe('CreateApiCatalogComponent', () => {
  let component: CreateApiCatalogComponent;
  let fixture: ComponentFixture<CreateApiCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateApiCatalogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateApiCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
