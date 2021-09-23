//clases
export class Rover {
    roverX          :number //posicion inicial X
    roverY          :number //posicion inicial Y
    currentRoverX   :number //posicion actual X
    currentRoverY   :number //posicion actual Y
    roverOrientation:string //orientacion 
    roverCommands   :string //comandos insertados por el usuario
    roverInsideGrid :boolean //si está dentro del cuadro o no


    rotate(){
        console.log("rotate");
    }
    advance(){
        console.log(this.roverOrientation)
        console.log("X" , this.roverX, "Y", this.roverY);
        switch( this.roverOrientation ){
          case "N":
                console.log("avanzo hacia: " + this.roverX, "Y", this.roverY);
                this.roverY -=1;
            break;
          case "S":
                console.log("avanzo hacia: " + this.roverX, "Y", this.roverY);
                this.roverX -=1;
            break;
          case "E":
                console.log("avanzo hacia: " + this.roverX, "Y", this.roverY);
                this.roverX +=1;
            break;
          case "W":
                console.log("avanzo hacia: " + this.roverX, "Y", this.roverY);
                this.roverY +=1;
            break;
        }
        
    }
    left(){
        console.log("X" , this.roverX, "Y", this.roverY);
        switch( this.roverOrientation ){
          case "N":
                this.roverOrientation = "W";
                console.log("giro izquierda: " + this.roverOrientation);
            break;
          case "S":
                this.roverOrientation = "E";
                console.log("giro izquierda: " + this.roverOrientation);
            break;
          case "E":
                this.roverOrientation = "N";
                console.log("giro izquierda: " + this.roverOrientation);
            break;
          case "W":
                this.roverOrientation = "S";
                console.log("giro izquierda: " + this.roverOrientation);
            break;
        }
    }
    right(){
        console.log("X" , this.roverX, "Y", this.roverY);
        switch( this.roverOrientation ){
          case "N":
                this.roverOrientation = "E";
                console.log("giro derecha: " + this.roverOrientation);
            break;
          case "S":
                this.roverOrientation = "W";
                console.log("giro derecha: " + this.roverOrientation);
            break;
          case "E":
                this.roverOrientation = "S";
                console.log("giro derecha: " + this.roverOrientation);
            break;
          case "W":
                this.roverOrientation = "N";
                console.log("giro derecha: " + this.roverOrientation);
            break;
        }
        
    }
    
}