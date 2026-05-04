import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideadminComponent } from './sideadmin.component';

describe('SideadminComponent', () => {
  let component: SideadminComponent;
  let fixture: ComponentFixture<SideadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideadminComponent]
    });
    fixture = TestBed.createComponent(SideadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
