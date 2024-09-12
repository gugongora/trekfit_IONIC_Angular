import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BigMapPage } from './big-map.page';

describe('BigMapPage', () => {
  let component: BigMapPage;
  let fixture: ComponentFixture<BigMapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BigMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
