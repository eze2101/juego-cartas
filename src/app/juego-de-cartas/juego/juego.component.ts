import { Component, OnInit, Input } from '@angular/core';

import { Carta } from '../../interfaces/carta.interface';
import { CartasService } from '../services/cartas.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
})
export class JuegoComponent implements OnInit {
  cartasEnCampo: Carta[] = this.CartasService.cartasEnCampo;
  cartaDevuelta: Carta[] = this.CartasService.cartaDevuelta;

  constructor(private CartasService: CartasService) {}

  ngOnInit(): void {}

  RecuperarCarta(carta: Carta) {
    this.CartasService.recuperarCarta(carta);
  }
}
