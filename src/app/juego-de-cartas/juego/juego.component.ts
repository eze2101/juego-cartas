import { Component, OnInit, Input } from '@angular/core';
import { Carta } from '../../interfaces/carta.interface';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
})
export class JuegoComponent implements OnInit {
  cartasEnCampo: Carta[] = [];
  cartaDevuelta: Carta[] = [];

  constructor() {}

  ngOnInit(): void {}

  agregarCartasAlCampo(argumento: Carta) {
    this.cartasEnCampo.push(argumento);
    console.log(this.cartasEnCampo);
    return this.cartasEnCampo;
  }

  devolverCarta(carta: Carta) {
    var index = this.cartasEnCampo
      .map((card) => card.nombre)
      .indexOf(carta.nombre);
    this.cartaDevuelta.push(carta);
    this.cartasEnCampo.splice(index, 1);
    console.log(this.cartaDevuelta);
  }
}
function input() {
  throw new Error('Function not implemented.');
}
