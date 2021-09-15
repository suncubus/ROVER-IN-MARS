import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormDataService } from 'src/app/services/form-data.service';
import { Subscription } from 'rxjs';
//interfaces
import { Area, Rover} from '../../interfaces/interfaces'
@Component({
  selector: 'app-rover',
  templateUrl: './rover.component.html',
  styleUrls: ['./rover.component.scss']
})

export class RoverComponent implements OnInit, OnDestroy {

  area: Area[] = [];

  datos:string;
  subscription: Subscription;

  private datosSubscription: Subscription | undefined;

  constructor( formDataServise:FormDataService, private data:FormDataService ) { }

  ngOnInit(): void {

    this.data.receiveData();
   
    //this.datosSubscription = this.data.enviarRecibir$.subscribe(datos => this.datos = datos);

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
