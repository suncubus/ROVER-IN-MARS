import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoverRoutingModule } from './rover-routing.module';
import { RoverComponent } from './rover.component';


@NgModule({
  declarations: [
    RoverComponent
  ],
  imports: [
    CommonModule,
    RoverRoutingModule
  ]
})
export class RoverModule { }
