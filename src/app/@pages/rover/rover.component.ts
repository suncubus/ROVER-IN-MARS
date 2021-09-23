import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { Subscription } from 'rxjs';

//interfaces y clases
import { Area, Rover} from '../../interfaces/interfaces';

@Component({
  selector: 'app-rover',
  templateUrl: './rover.component.html',
  styleUrls: ['./rover.component.scss']
})

export class RoverComponent implements OnInit, OnDestroy, AfterViewInit {
  
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

  currentId:string = "";
  positionInitX: number = 0;
  positionInitY: number = 0;
  orientationInit: string = "";
 

  constructor( private data:FormDataService,public elementRef: ElementRef, private cd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.datosSubscription =  this.data.getData().subscribe(info => {
        this.dataObtained = info;
    });
    //convertimos el string a objeto
    this.dataObj = JSON.parse(this.dataObtained);

    /*PROMESAS ??? */
    this.saveData(this.dataObj);

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

    //posicion inicial
    this.positionInitX= this.rover.roverX;
    this.positionInitY = this.rover.roverY;
    this.orientationInit = this.rover.roverOrientation;
    //id de la celda en la que comienza el rover 
    this.currentId = this.positionInitX.toString() + this.positionInitY.toString();
    
    this.createTable();
  }

  //Generamos la tabla
  createTable(){
    if(this.area.areaX  && this.area.areaY){
      //crear celdas
      this.tableX.length = this.area.areaX;
      this.tableY.length = this.area.areaY;
      
      //tamaño de la tabla celdas 
      this.widthPixels = ((this.area.areaX * 4)+"%").toString();
      this.heightPixels = ((this.area.areaY * 4)+"%").toString();  
    } 
  }
  changeId(x:number,y:number){
    return (x+1).toString() + (y+1).toString();
  }
 
  commandsLine(){
 

    //linea de comandos
    for(let i of this.rover.roverCommands) {
        switch( i ){
          case "A":
            this.rover.advance();
            break;
          case "L":
             this.rover.left();
            break;
          case "R":
             this.rover.right();
            break;
        }

    }
  
  }
  ngAfterViewInit(){
      //mostrar rover 
    this.cd.detectChanges();
    let element = document.getElementById(this.currentId);

    if (element) {
      console.log(element)
      element.innerHTML= '<i class="bi bi-capslock" #roverElement></i>';
      //this.commandsLine();
     
    }
   
    
  }
}



    //let roverInsideGrid = true;