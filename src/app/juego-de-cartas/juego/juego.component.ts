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
  cartasEnCampo!: Carta[];
  cartaDevuelta!: Carta[];

  constructor(
    private CartasService: CartasService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cartasEnCampo = this.CartasService.cartasEnCampo;
    this.cartaDevuelta = this.CartasService.cartaDevuelta;
  }

  RecuperarCarta(carta: Carta) {
    this.CartasService.recuperarCarta(carta);
  }

  combate() {
    this.CartasService.Combate();
  }
}
