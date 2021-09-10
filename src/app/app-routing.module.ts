import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//COMPONENTS
import { HomeComponent } from './@pages/home/home.component';
import { RoverComponent } from './@pages/rover/rover.component';


const routes: Routes = [

  {
    //Cuando la ruta sea igual a home carga el hijo haciendo referencia al HomeModule, aplicando el Lazy Loading
    path: 'home',
    component: HomeComponent,
    loadChildren: () => import('./@pages/home/home.module').then(m => m.HomeModule)
  },

  {
    path: 'rover',
    component: RoverComponent,
    loadChildren: () => import('./@pages/rover/rover.module').then(m => m.RoverModule)
  },

  {
    //cuando no especifique url ir a la home
    path: '',
    loadChildren: () => import('./@pages/home/home.module').then(m => m.HomeModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
