import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BigmapPage } from './bigmap.page';

describe('BigmapPage', () => {
  let component: BigmapPage;
  let fixture: ComponentFixture<BigmapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BigmapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
