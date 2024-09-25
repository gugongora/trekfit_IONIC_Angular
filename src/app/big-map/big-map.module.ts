import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BigMapPageRoutingModule } from './big-map-routing.module';

import { BigMapPage } from './big-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BigMapPageRoutingModule
  ],
  declarations: [BigMapPage]
})
export class BigMapPageModule {}
