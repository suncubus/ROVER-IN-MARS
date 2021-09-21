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
  
  area:Area={}; //interface ? propiedades opcionales / inicializar
  rover: Rover = new Rover(); //clase

  dataObtained:string;
  dataObj:any;

  subscription: Subscription;
  public datosSubscription: Subscription | undefined;

  //variables tabla
  tableX: number[] = [];
  tableY: number[] = [];

  constructor( private data:FormDataService ) { }

  ngOnInit(): void {
    this.datosSubscription =  this.data.getData().subscribe(info => {
        this.dataObtained = info;
    });
   //convertimos el string a objeto
    this.dataObj = JSON.parse(this.dataObtained);

    this.saveData(this.dataObj);
    this.createTable();

  }
  ngOnDestroy() {
    this.subscription.unsubscribe(); 
  }

  //Almacenar datos en los objetos 
  saveData(dataObt:any){
    this.area.areaX = parseInt(dataObt.areaSizeX);
    this.area.areaY = parseInt(dataObt.areaSizeY);

    this.rover.roverX = parseInt(dataObt.positionX);
    this.rover.roverY = parseInt(dataObt.positionY);
    this.rover.roverOrientation = dataObt.orientation;
    this.rover.roverCommands = dataObt.commandsInput;
  }

  //creamos los arrays para generar la tabla
  createTable(){
    //PROMESAS ???
    if(this.area.areaX  && this.area.areaY){
      for (let i:number = 0; i < this.area.areaX; i++) {
        this.tableX.push(i);
      }
      for (let i:number = 0; i < this.area.areaY; i++) {
        this.tableY.push(i);
      }
    }
  }
}
