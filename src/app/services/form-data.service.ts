import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class FormDataService {

  //Es un tipo de observable, que permite la transmisión múltiple de valores a muchos observadores simultáneos y donde siempre se almacena y permanece disponible el valor actual. Es por ello que cada vez que un nuevo consumidor se suscribe al dato, siempre recibirá el valor actual. Al crearlo hay que pasarle un valor
  private enviarRecibir = new BehaviorSubject<string>("");

  //Es el observable del beahviorSubject
  public enviarRecibir$ = this.enviarRecibir.asObservable();

  constructor( ) { }

  setData(formData: string){
    //Emito un valor, al flujo de datos
    this.enviarRecibir.next(formData);
  }
  getData(){
    return this.enviarRecibir$;

  }
}
