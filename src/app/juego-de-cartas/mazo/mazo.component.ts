import { Component, OnInit } from '@angular/core';

import ListaCartas from 'src/assets/data-cartas/data-cartas.json';

import { Carta } from 'src/app/interfaces/carta.interface';

@Component({
  selector: 'app-mazo',
  templateUrl: './mazo.component.html',
  styleUrls: ['./mazo.component.css'],
})
export class MazoComponent implements OnInit {
  cartas: Carta[] = ListaCartas;
  mazo: Carta[] = [];

  constructor() {}

  ngOnInit(): void {}

  mezclarCartas() {
    var i, j, temp;
    for (i = this.cartas.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = this.cartas[i];
      this.cartas[i] = this.cartas[j];
      this.cartas[j] = temp;
    }

    return (this.mazo = this.cartas);
  }
}
