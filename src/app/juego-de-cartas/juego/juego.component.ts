import { Component, OnInit } from '@angular/core';

import { Carta } from '../../interfaces/carta.interface';

import { MessageService } from 'primeng/api';
import { CartasService } from '../services/cartas.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
})
export class JuegoComponent implements OnInit {
  cartasEnCampo: Carta[] = this.CartasService.cartasEnCampo;
  cartaDevuelta: Carta[] = this.CartasService.cartaDevuelta;

  constructor(
    private CartasService: CartasService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  RecuperarCarta(carta: Carta) {
    this.CartasService.recuperarCarta(carta);
  }

  combate() {
    this.CartasService.Combate();
  }
}
