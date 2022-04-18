import { Component, OnInit } from '@angular/core';

import { Carta } from '../../interfaces/carta.interface';

import { CartasService } from '../services/cartas.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
})
export class JuegoComponent implements OnInit {
  cartasEnCampo: Carta[] = this.CartasService.cartasEnCampo;

  constructor(private CartasService: CartasService) {}

  ngOnInit(): void {}

  combate() {
    this.CartasService.combate();
  }
}
