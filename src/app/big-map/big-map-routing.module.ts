import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BigMapPage } from './big-map.page';

const routes: Routes = [
  {
    path: '',
    component: BigMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BigMapPageRoutingModule {}