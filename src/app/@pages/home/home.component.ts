import { Component, OnInit } from '@angular/core';

//Importamos formbuilder, es un servicio que ayuda a crear un objeto de javascript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeForm: FormGroup = this.fb.group({
    areaSizeX     : ['', [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
    areaSizeY     : ['', [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
    positionX     : ['', [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
    positionY     : ['', [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
    orientation: ['', Validators.required]
  })

  //Injectamos el Servicio formBuilder
  constructor(private fb:FormBuilder) { }

  isValid( campo: string){ 
    return this.homeForm.controls[campo].errors && this.homeForm.controls[campo].touched;
  }

  //recibimos el submit
  sendData(){
    console.log("Envio" + this.homeForm.value);
    //si no es válido
    if(this.homeForm.invalid){
      //Pone como si todos los campos han sido tocados
      this.homeForm.markAllAsTouched();
      return
    }else{
      //convierto a string
      let formu = JSON.stringify(this.homeForm.value);
      //convierto a objeto
      let formuValues = JSON.parse(formu);
    }
  }


  ngOnInit(): void {
  }

}
