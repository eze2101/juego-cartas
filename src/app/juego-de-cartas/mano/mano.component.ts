import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

import { Carta } from '../../interfaces/carta.interface';

import { CartaEnJuegoComponent } from '../carta-en-juego/carta-en-juego.component';
import { JuegoComponent } from '../juego/juego.component';
import { CartasService } from '../services/cartas.service';

@Component({
  providers: [CartaEnJuegoComponent, JuegoComponent],
  selector: 'app-mano',
  templateUrl: './mano.component.html',
  styleUrls: ['./mano.component.css'],
})
export class ManoComponent implements OnInit {
  cartas: Carta[] = this.cartasServices.cartas;
  cartasEnMano: Carta[] = this.cartasServices.cartasEnMano;
  iniciojuego = false;

  constructor(
    private cartaEnjuego: CartaEnJuegoComponent,
    private juego: JuegoComponent,
    private cartasServices: CartasService
  ) {}
  ngOnInit(): void {}

  iniciarJuego() {
    this.cartasServices.ComenzarJuego();

    console.log(this.cartas);
    console.log(this.cartasEnMano);
  }

  levantar() {
    this.cartasEnMano.push(this.cartas.shift()!);
    // console.log(this.cartasEnMano);
  }

  @Output() cartasAlCampo: EventEmitter<Carta> = new EventEmitter();

  JugarCarta(carta: Carta) {
    this.cartasServices.jugarCarta(carta);
  }
}
