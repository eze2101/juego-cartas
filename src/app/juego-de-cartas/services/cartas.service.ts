import { EventEmitter, Injectable } from '@angular/core';
import { Carta } from '../../interfaces/carta.interface';

@Injectable({
  providedIn: 'root',
})
export class CartasService {
  campoDeJuego: Carta[] = [];
  cartaMia: Carta;
  cartaOponente: Carta;

  mezclarCartas(mazo: Carta[]) {
    const mazomezclado: Carta[] = [];
    for (let i = 0; i < mazo.length; i++) {
      mazomezclado.push(mazo[i]);
    }

    var i, j, temp;
    for (i = mazomezclado.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = mazomezclado[i];
      mazomezclado[i] = mazomezclado[j];
      mazomezclado[j] = temp;
    }
    return [...mazomezclado];
  }

  cartaJugadaMia(carta: Carta) {
    this.cartaMia = carta;
    this.campoDeJuego.push(carta);
    console.log(this.cartaMia);
    console.log(this.campoDeJuego);
  }

  cartaJugadaOponente(carta: Carta) {
    this.cartaOponente = carta;
    this.campoDeJuego.push(carta);
  }
}
