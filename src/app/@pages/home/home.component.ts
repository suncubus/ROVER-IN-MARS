import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  sendForm(){
   /* 
    console.log("Persona: nombre"+ this.persona.nombre +" "+ this.persona.edad)
    this.registros.push(this.persona);
*/
  }

  ngOnInit(): void {
  }

}
