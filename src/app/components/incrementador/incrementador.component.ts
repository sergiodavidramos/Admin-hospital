import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html'
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgess', { static: true }) txtProgess: ElementRef; 

  @Input('nombre') leyenda: string = 'Leyenda'
  @Input() porcentaje: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  
  constructor() {
    console.log('Porcentage', this.porcentaje);
    // console.log('Leyenda', this.leyenda);
  }

  ngOnInit() {
    console.log('Leyenda', this.leyenda);
  }


  onChange( newValue: number){   
    // let elemHTML = document.getElementsByName('porcentaje')[0];

    // console.log(this.txtProgess);

    if( newValue >=100){
      this.porcentaje=100;
    }else if(newValue<=0){
      this.porcentaje=0;
    }else{

      this.porcentaje=newValue

    }

    // elemHTML.value = this.porcentaje;

    this.txtProgess.nativeElement.value= this.porcentaje;

    this.cambioValor.emit( this.porcentaje);

  }

  cambiarValor(valor) {
    if (this.porcentaje >= 100 && valor > 0) {
      this.porcentaje = 100;
      return;
    }
    if (this.porcentaje <= 0 && valor < 0) {
      this.porcentaje = 0
      return;
    }
    this.porcentaje = this.porcentaje + valor;

    this.cambioValor.emit( this.porcentaje);

// para establecer el puntero
    this.txtProgess.nativeElement.focus();
  }

}
