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

  widthPixels:string = "";
  heightPixels:string = "";


  constructor( private data:FormDataService ) { }

  ngOnInit(): void {
    this.datosSubscription =  this.data.getData().subscribe(info => {
        this.dataObtained = info;
    });
    //convertimos el string a objeto
    this.dataObj = JSON.parse(this.dataObtained);

    /*PROMESAS ??? */
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

  //Generamos la tabla
  createTable(){
    if(this.area.areaX  && this.area.areaY){
      //crear celdas
      this.tableX.length = this.area.areaX;
      this.tableY.length = this.area.areaY;
      //tamaño de celdas
      this.widthPixels = ((this.area.areaX * 2)+"%").toString();
      this.heightPixels = ((this.area.areaY * 2)+"%").toString();  
    }
  }
}
