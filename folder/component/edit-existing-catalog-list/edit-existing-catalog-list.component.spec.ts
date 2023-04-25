import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExistingCatalogListComponent } from './edit-existing-catalog-list.component';

describe('EditExistingCatalogListComponent', () => {
  let component: EditExistingCatalogListComponent;
  let fixture: ComponentFixture<EditExistingCatalogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditExistingCatalogListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExistingCatalogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
