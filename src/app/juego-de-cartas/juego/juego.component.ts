import { Component, OnInit } from '@angular/core';
import { CartasService } from '../services/cartas.service';
import { Carta } from '../../interfaces/carta.interface';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
})
export class JuegoComponent implements OnInit {
  cartasEnCampo: Carta[] = [];
  constructor(private cartasService: CartasService) {}

  ngOnInit(): void {
    this.cartasEnCampo = this.cartasService.campoDeJuego;
  }

  RecuperarCarta(Carta: Carta) {}
}
