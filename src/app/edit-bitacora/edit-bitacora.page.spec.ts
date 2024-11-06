import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBitacoraPage } from './edit-bitacora.page';

describe('EditBitacoraPage', () => {
  let component: EditBitacoraPage;
  let fixture: ComponentFixture<EditBitacoraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBitacoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
