import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { Subscription } from 'rxjs';

//interfaces
import { Area, Rover} from '../../interfaces/interfaces';

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

  constructor( private data:FormDataService ) { }

  ngOnInit(): void {
    this.datosSubscription =  this.data.getData().subscribe(datos => {
      this.datos = datos;
      console.log("datos:",  this.datos);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe(); 
  }
}
