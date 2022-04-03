import { Component, OnInit } from '@angular/core';
import { Carta } from '../../interfaces/carta.interface';
import ListaCartas from 'src/assets/data-cartas/data-cartas.json';

@Component({
  selector: 'app-mano',
  templateUrl: './mano.component.html',
  styleUrls: ['./mano.component.css'],
})
export class ManoComponent implements OnInit {
  cartas: Carta[] = ListaCartas;
  cartasIniciales: Carta[] = [];

  constructor() {}
  ngOnInit(): void {}

  mezclarCartas(mazo: Carta[]) {
    var i, j, temp;
    for (i = mazo.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = mazo[i];
      mazo[i] = mazo[j];
      mazo[j] = temp;
    }
    console.log(mazo);
    return (this.cartasIniciales = mazo);
  }
}
/*manoInicial() {
    for (let index = 0; index < 7; index++) {
      this.cartasIniciales.push(this.cartas[index]);
    }
    console.log(this.cartasIniciales);
    return this.cartasIniciales;
  }*/
