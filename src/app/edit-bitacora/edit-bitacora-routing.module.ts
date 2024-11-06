import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditBitacoraPage } from './edit-bitacora.page';

const routes: Routes = [
  {
    path: '',
    component: EditBitacoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBitacoraPageRoutingModule {}
