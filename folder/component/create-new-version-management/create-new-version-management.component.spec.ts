import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewVersionManagementComponent } from './create-new-version-management.component';

describe('CreateNewVersionManagementComponent', () => {
  let component: CreateNewVersionManagementComponent;
  let fixture: ComponentFixture<CreateNewVersionManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNewVersionManagementComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewVersionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
