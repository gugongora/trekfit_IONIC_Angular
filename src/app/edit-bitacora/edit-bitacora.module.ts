import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditBitacoraPageRoutingModule } from './edit-bitacora-routing.module';

import { EditBitacoraPage } from './edit-bitacora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditBitacoraPageRoutingModule
  ],
  declarations: [EditBitacoraPage]
})
export class EditBitacoraPageModule {}
