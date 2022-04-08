import { Component, OnInit } from '@angular/core';
import { CartasService } from '../services/cartas.service';
import { Carta } from '../../interfaces/carta.interface';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
})
export class JuegoComponent implements OnInit {
  cartaMia: Carta;
  cartaOponente: Carta;
  constructor(private cartasService: CartasService) {}

  ngOnInit(): void {
    this.cartaMia = this.cartasService.cartaMia;
  }

  RecuperarCarta(carta: Carta) {
    if (carta === this.cartaMia) {
      this.cartaMia=null
    } else if (carta === this.cartaOponente)
    
  }
}
