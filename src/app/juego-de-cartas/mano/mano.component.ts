import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

import { Carta } from '../../interfaces/carta.interface';

import { CartasService } from '../services/cartas.service';

@Component({
  selector: 'app-mano',
  templateUrl: './mano.component.html',
  styleUrls: ['./mano.component.css'],
})
export class ManoComponent implements OnInit {
  cartas: Carta[] = this.cartasServices.mazoMezclado;
  cartasEnMano: Carta[] = this.cartasServices.cartasEnMano;
  cartasEnDescarte: Carta[] = this.cartasServices.mazoDeDescarte;
  iniciojuego = false;

  constructor(private cartasServices: CartasService) {}
  ngOnInit(): void {}

  iniciarJuego() {
    this.cartasServices.ComenzarJuego();
  }

  @Output() cartasAlCampo: EventEmitter<Carta> = new EventEmitter();

  JugarCarta(carta: Carta) {
    this.cartasServices.jugarCarta(carta);
  }
}
