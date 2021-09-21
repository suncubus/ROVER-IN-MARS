import { Component } from '@angular/core';

import { FormDataService } from 'src/app/services/form-data.service';

import { Router } from '@angular/router';

//Importamos formbuilder, es un servicio que ayuda a crear un objeto de javascript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  
  //array y string para los comandos
  commands    :Array<string>  = [];
  commandsTxt :string = "";

  //string para todos los datos obtenidos del formulario
  formu       :string = "";  

  //campos de formulario
  homeForm: FormGroup = this.fb.group({
    areaSizeX     : ['', [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
    areaSizeY     : ['', [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
    positionX     : ['', [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
    positionY     : ['', [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
    orientation   : ['', Validators.required],
    commandsInput : ['', Validators.required]
  })

  //Injectamos el Servicio formBuilder
  constructor(private fb:FormBuilder, private router: Router, private data:FormDataService ) { }
 

  //validación de formulario
  isValid( campo: string){ 
    return this.homeForm.controls[campo].errors && this.homeForm.controls[campo].touched;
  }

  //recibimos el submit
  sendData(){    
    //si no es válido
    if(this.homeForm.invalid){
      //Pone como si todos los campos han sido tocados
      this.homeForm.markAllAsTouched();
      return;
    }else{
      //convierto a string
      this.formu = JSON.stringify(this.homeForm.value);
      //convierto a objeto
      //let formuValues = JSON.parse(formu);
      this.data.setData(this.formu);

      this.router.navigate(['/rover']);
      ////vaciamos el formulario
      this.homeForm.reset();
    }
  }

  //btn commands functions
  saveLeft(){
    this.putIcommandList("L");
  }
  saveAdvance(){
    this.putIcommandList("A");
  }
  saveRight(){
    this.putIcommandList("R");
  }
  
  
  putIcommandList(com:string){  
    //almacenar comandos seleccionados en el array
    this.commands.push(com);

    //mostrar la linea de comandos en el template
    this.commandsTxt += com;

  }




}
