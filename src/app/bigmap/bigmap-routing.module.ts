import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BigmapPage } from './bigmap.page';

const routes: Routes = [
  {
    path: '',
    component: BigmapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BigmapPageRoutingModule {}
