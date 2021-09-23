import { Component, OnInit, OnDestroy, ElementRef, ChangeDetectorRef, ViewChild } from '@angular/core';

import { FormDataService } from 'src/app/services/form-data.service';
import { Subscription } from 'rxjs';

import { Router } from '@angular/router';

import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

//clases
import {  Rover} from '../../models/classes';
@Component({
  selector: 'app-rover',
  templateUrl: './rover.component.html',
  styleUrls: ['./rover.component.scss']
})

export class RoverComponent implements OnInit, OnDestroy {
  
  //area:Area={}; //interface ? propiedades opcionales / inicializar
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

  roverInsideGrid:boolean = false;

  endX:number = 0;
  endY:number = 0;

  //modal
  @ViewChild("modalData") modal: ElementRef;
  
  constructor(private data:FormDataService,public elementRef: ElementRef, private cd:ChangeDetectorRef, private modalService: NgbModal,  private router: Router) { }

  async ngOnInit() {
    //obtenemos datos del form
    this.datosSubscription =  await this.data.getData().subscribe(info => {
        this.dataObtained = info;
    });
    //convertimos el string a objeto
    this.dataObj = JSON.parse(this.dataObtained);

    this.saveData(this.dataObj);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); 
  }

  //Almacenar datos en los objetos 
  saveData(dataObt:any){       
    //grid    
    this.endX = parseInt(dataObt.areaSizeX);
    this.endY = parseInt(dataObt.areaSizeY);
    //rover
    this.rover.roverX = parseInt(dataObt.positionX);
    this.rover.roverY = parseInt(dataObt.positionY);
    this.rover.roverOrientation = dataObt.orientation;
    this.rover.roverCommands = dataObt.commandsInput;
    //posicion inicial para mostrar 
    this.positionInitX= this.rover.roverX;
    this.positionInitY = this.rover.roverY;
    this.orientationInit = this.rover.roverOrientation;
    //id de la celda en la que comienza el rover 
    this.currentId = this.positionInitX.toString() + this.positionInitY.toString();

    //comprobamos que esté dentro
    this.roverInsideGrid = this.insideGrid();
    if(!this.roverInsideGrid){
      //creamos la tabla
      this.createTable();  
    }else{
      this.modalService.open( this.modal );
    }      
  }

  //Generamos la tabla
  createTable(){
    //crear n celdas
    this.tableX.length = this.endX ;
    this.tableY.length = this.endY;      
    //tamaño de la tabla celdas 
    this.widthPixels = ((this.endX  * 4)+"%").toString();
    this.heightPixels = ((this.endY * 4)+"%").toString(); 
  
    this.roverInGrid();
  }
  element:HTMLElement | null;
  //mostrar rover 
  roverInGrid(){   
      this.cd.detectChanges();
      this.element = document.getElementById(this.currentId);
      if (this.element) {
        this.element.innerHTML= '<i class="bi bi-capslock" #roverElement></i>';
        this.commandsLine();     
      }    
  } 
  //string para el id de las celdas
  changeId(x:number,y:number){
    return (x).toString() + (y).toString();
  } 
  
  //linea de comandos, recorremos string
  commandsLine(){        
    for(let i of this.rover.roverCommands) {
        //enviar comandos 
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
        this.roverInsideGrid = this.insideGrid(); 

        //mostrar rover
        this.currentId = this.rover.roverX.toString() + this.rover.roverY.toString();
        this.element = document.getElementById(this.currentId);
        if(this.element){
          switch( i ){
            case "A":
              this.element.innerHTML= '<i class="bi bi-capslock" #roverElement></i>';
              break;
            case "L":
              this.element.style.transform ="rotate(90deg)";
              break;
            case "R":
              this.element.style.transform ="rotate(90deg)";
              break;
          }

           
        }       
              
    }  
  }
  //comprobar que el rover este dentro del grid
  insideGrid(){   
    if((this.rover.roverX < 0 || this.rover.roverX > this.endX) || (this.rover.roverY < 0 || this.rover.roverY > this.endY)){
      console.log("ESTA FUERA")
      return true;
    }else{
      return false;
    }
  }
  //navegar a home
  
  return(){
    console.log("volver");
    this.router.navigate(['..']);
  }
}



