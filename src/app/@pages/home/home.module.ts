import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Formularios reactivos
import { ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule, 
    ReactiveFormsModule
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
