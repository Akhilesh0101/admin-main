import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRemediesComponent } from './admin-remedies.component';

describe('AdminRemediesComponent', () => {
  let component: AdminRemediesComponent;
  let fixture: ComponentFixture<AdminRemediesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRemediesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRemediesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
