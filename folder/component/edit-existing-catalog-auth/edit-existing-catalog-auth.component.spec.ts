import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExistingCatalogAuthComponent } from './edit-existing-catalog-auth.component';

describe('EditExistingCatalogAuthComponent', () => {
  let component: EditExistingCatalogAuthComponent;
  let fixture: ComponentFixture<EditExistingCatalogAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditExistingCatalogAuthComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExistingCatalogAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
