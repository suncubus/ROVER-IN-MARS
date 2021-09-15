import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FormDataService {

  //
  public enviarRecibir = new BehaviorSubject<string>("");
  //
  enviarRecibir$ = this.enviarRecibir.asObservable();

  constructor() { }

  sendData(formData: string){
    console.log(formData);
    this.enviarRecibir.next(formData);
  }
  receiveData(){
    console.log("entro en receiveData");
    // this.datosSubscription = this.data.enviarRecibir$.subscribe(datos => this.datos = datos);
  }
}
