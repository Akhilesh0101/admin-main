import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHealthTipsComponent } from './admin-health-tips.component';

describe('AdminHealthTipsComponent', () => {
  let component: AdminHealthTipsComponent;
  let fixture: ComponentFixture<AdminHealthTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminHealthTipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHealthTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
