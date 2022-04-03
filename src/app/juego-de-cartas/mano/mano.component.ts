import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

import { Carta } from '../../interfaces/carta.interface';

import { MazoComponent } from '../mazo/mazo.component';
import { CartaEnJuegoComponent } from '../carta-en-juego/carta-en-juego.component';
import { JuegoComponent } from '../juego/juego.component';

@Component({
  providers: [MazoComponent, CartaEnJuegoComponent, JuegoComponent],
  selector: 'app-mano',
  templateUrl: './mano.component.html',
  styleUrls: ['./mano.component.css'],
})
export class ManoComponent implements OnInit {
  cartas: Carta[] = [];
  cartasEnMano: Carta[] = [];

  @Input() cartasencampo!: Carta[];

  constructor(
    private mazo: MazoComponent,
    private cartaEnjuego: CartaEnJuegoComponent,
    private juego: JuegoComponent
  ) {}
  ngOnInit(): void {}

  iniciarJuego() {
    this.cartas = this.mazo.mezclarCartas();
  }

  levantar7() {
    for (let index = 0; index < 7; index++) {
      this.cartasEnMano.push(this.cartas.shift()!);
    }
    // console.log(this.cartasEnMano);
    // console.log(this.cartas);
  }

  levantar() {
    this.cartasEnMano.push(this.cartas.shift()!);
    // console.log(this.cartasEnMano);
  }

  @Output() cartasAlCampo: EventEmitter<Carta> = new EventEmitter();

  cartaSelecionada(carta: Carta) {
    var index = this.cartasEnMano
      .map((card) => card.nombre)
      .indexOf(carta.nombre);
    if (this.cartasencampo.length < 2) {
      this.cartasEnMano.splice(index, 1);
      console.log(this.cartasEnMano);
      this.cartasAlCampo.emit(carta);
    } else {
      return;
    }
  }
}
/*manoInicial() {
    for (let index = 0; index < 7; index++) {
      this.cartasIniciales.push(this.cartas[index]);
    }
    console.log(this.cartasIniciales);
    return this.cartasIniciales;
  }*/
