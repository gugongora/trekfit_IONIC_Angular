import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BigmapPageRoutingModule } from './bigmap-routing.module';

import { BigmapPage } from './bigmap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BigmapPageRoutingModule
  ],
  declarations: [BigmapPage]
})
export class BigmapPageModule {}
