import { Component, OnInit } from '@angular/core';

import ListaCartas from 'src/assets/data-cartas/data-cartas.json';

import { Carta } from '../../../interfaces/carta.interface';

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.component.html',
})
export class CartasComponent implements OnInit {
  cartas: Carta[] = ListaCartas;

  constructor() {}

  ngOnInit(): void {}
}
