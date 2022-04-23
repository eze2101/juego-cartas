import { EventEmitter, Injectable } from '@angular/core';

import { Carta } from 'src/app/interfaces/carta.interface';

import ListaCartas from 'src/assets/data-cartas/data-cartas.json';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CartasService {
  private cartas: Carta[] = ListaCartas;
  mazo: Carta[] = [...this.cartas];

  juegoIniciado$ = new EventEmitter<boolean>();
  jugarCarta$ = new EventEmitter<boolean>();

  mazoMezclado: Carta[] = [];
  cementerio: Carta[] = [];

  cartasEnMano: Carta[] = [];
  cartasEnCampo: Carta[] = [];

  cartaMia$ = new EventEmitter<Carta>();
  cartaMia: any;
  cartaOponente$ = new EventEmitter<Carta>();
  cartaOponente: any;
  cementerioMio$ = new EventEmitter<Carta>();
  cementerioOponente$ = new EventEmitter<Carta>();
  levantar$ = new EventEmitter();
  levantarOponente$ = new EventEmitter();

  constructor(private MessageService: MessageService) {}

  ngOnInit(): void {}

  mezclarCartas(mazo: Carta[]) {
    this.cartasEnCampo.splice(0, 2);
    delete this.cartaMia;
    delete this.cartaOponente;
    const mazoMezclado: Carta[] = [];
    for (let index = 0; index < mazo.length; index++) {
      mazoMezclado.push(mazo[index]);
    }

    var i, j, temp;
    for (i = mazoMezclado.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = mazoMezclado[i];
      mazoMezclado[i] = mazoMezclado[j];
      mazoMezclado[j] = temp;
    }

    return mazoMezclado;
  }

  jugarCartaMia(carta: Carta, mazo: Carta[]) {
    if (this.cartaMia === undefined) {
      this.cartaMia = carta;
      this.cartasEnCampo.push(carta);
      console.log(this.cartasEnCampo);
      var index = mazo.map((card) => card.nombre).indexOf(carta.nombre);
      mazo.splice(index, 1);
      return mazo;
    }
    return null;
  }
  jugarCartaOponente(mazo: Carta[]) {
    if (this.cartaOponente === undefined) {
      var index = Math.floor(Math.random() * mazo.length);
      this.cartaOponente = mazo[index];
      this.cartasEnCampo.push(mazo[index]);
      mazo.splice(index, 1);
      return mazo;
    }
    return null;
  }

  recuperarCarta() {
    setTimeout(() => {
      this.cartaOponente$.emit(this.cartaOponente);
      this.cartaMia$.emit(this.cartaMia);
      this.cartasEnCampo.splice(0, 2);
      delete this.cartaOponente;
      delete this.cartaMia;
    }, 1500);
  }

  combate() {
    if (this.cartasEnCampo.length === 2) {
      //mueren ambas
      if (
        this.cartaMia.dano >= this.cartaOponente.defensa &&
        this.cartaMia.defensa <= this.cartaOponente.dano
      ) {
        this.cartaDerrotadaMia(this.cartaMia);
        this.cartaDerrotadaOponente(this.cartaOponente);
        this.levantar$.emit(true);
        this.levantarOponente$.emit(true);
        return;
        //gana la mia
      } else if (this.cartaMia.dano >= this.cartaOponente.defensa) {
        this.cartaDerrotadaOponente(this.cartaOponente);
        this.levantarOponente$.emit(true);
        setTimeout(() => {
          this.jugarCarta$.emit(true);
        }, 1500);
        return;
        //gana el oponente
      } else if (this.cartaMia.defensa <= this.cartaOponente.dano) {
        this.cartaDerrotadaMia(this.cartaMia);
        this.levantar$.emit(true);
        return;
      }
      this.recuperarCarta();
      const combateBoton = document.getElementById(
        'combateBoton'
      ) as HTMLButtonElement;
      combateBoton.disabled = true;
      setTimeout(() => {
        combateBoton.disabled = false;
      }, 1500);
      return this.Empate();
    }
  }

  Empate() {
    this.MessageService.add({
      severity: 'success',
      summary: 'Empate',
      detail: 'Ninguna puede vencer',
      life: 3000,
      //sticky: true,
    });
  }

  cartaDerrotadaMia(carta: Carta) {
    var index = this.cartasEnCampo
      .map((card) => card.nombre)
      .indexOf(carta.nombre);
    this.cementerioMio$.emit(carta);
    this.cartasEnCampo.splice(index, 1);
    delete this.cartaMia;
  }

  cartaDerrotadaOponente(carta: Carta) {
    var index = this.cartasEnCampo
      .map((card) => card.nombre)
      .indexOf(carta.nombre);
    this.cementerioOponente$.emit(carta);
    this.cartasEnCampo.splice(index, 1);
    delete this.cartaOponente;
  }
}
