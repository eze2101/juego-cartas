import { Component, OnInit } from '@angular/core';
import { Carta } from '../../interfaces/carta.interface';
import ListaCartas from 'src/assets/data-cartas/data-cartas.json';
import { CartasService } from '../services/cartas.service';

@Component({
  selector: 'app-mano',
  templateUrl: './mano.component.html',
  styleUrls: ['./mano.component.css'],
})
export class ManoComponent implements OnInit {
  private mazo: Carta[] = ListaCartas;
  Mazo: Carta[] = [...this.mazo];
  mazoMezclado: Carta[] = [];
  cartasEnMano: Carta[] = [];
  cementerio: Carta[] = [];
  cartasEnCampo: Carta[] = [];
  pepino: Carta[];

  constructor(private cartasService: CartasService) {}
  ngOnInit(): void {
    console.log(this.Mazo);
  }

  iniciarJuego() {
    console.log(this.Mazo);
    this.mazoMezclado = this.cartasService.mezclarCartas(this.Mazo);

    this.cartasEnMano = this.mazoMezclado.splice(0, 7);
  }

  jugarCarta(carta: Carta) {
    if (this.cartasService.cartaMia == null) {
      this.cartasService.cartaJugadaMia(carta);
      console.log(this.cartasEnMano);
      this.cartasEnMano = this.cartasEnMano.filter((item) => {
        item.nombre !== carta.nombre;
      });
      console.log(this.cartasEnMano);
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
