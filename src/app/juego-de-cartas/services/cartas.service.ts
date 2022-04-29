import { EventEmitter, Injectable } from '@angular/core';

import { Carta } from 'src/app/interfaces/carta.interface';

import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CartasService {
  cartaMia: any;
  cartaOponente: any;

  juegoIniciado$ = new EventEmitter<boolean>();
  jugarCarta$ = new EventEmitter<boolean>();

  cartasEnCampo$ = new EventEmitter<Carta>();
  vaciarCampo$ = new EventEmitter();
  cartaDerrotada$ = new EventEmitter<Carta>();

  cartaMia$ = new EventEmitter<Carta>();
  cartaOponente$ = new EventEmitter<Carta>();

  cementerioMio$ = new EventEmitter<Carta>();
  cementerioOponente$ = new EventEmitter<Carta>();

  levantar$ = new EventEmitter();
  levantarOponente$ = new EventEmitter();

  constructor(private MessageService: MessageService) {}

  ngOnInit(): void {}

  //mezcla el mazo enviado
  mezclarCartas(mazo: Carta[]) {
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

  //jugar carta MIA al campo
  jugarCartaMia(carta: Carta, mazo: Carta[]) {
    if (this.cartaMia === undefined) {
      this.cartaMia = carta;

      this.cartasEnCampo$.emit(carta);
      var index = mazo.map((card) => card.nombre).indexOf(carta.nombre);
      mazo.splice(index, 1);
      return mazo;
    }
    return null;
  }

  //jugar carta del OPONENTE al campo
  jugarCartaOponente(mazo: Carta[]) {
    if (this.cartaOponente === undefined) {
      var index = Math.floor(Math.random() * mazo.length);
      this.cartaOponente = mazo[index];
      this.cartasEnCampo$.emit(mazo[index]);
      mazo.splice(index, 1);
      return mazo;
    }
    return null;
  }

  //regresar carta a mano
  recuperarCarta() {
    setTimeout(() => {
      this.cartaOponente$.emit(this.cartaOponente);
      this.cartaMia$.emit(this.cartaMia);
      this.vaciarCampo$.emit(true);
      delete this.cartaOponente;
      delete this.cartaMia;
    }, 1500);
  }

  //combate
  combate() {
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
  //cartel de derrota
  perdiste() {
    this.MessageService.add({
      severity: 'success',
      summary: 'Empate',
      detail: 'PERDISTE!',
      sticky: true,
    });
  }
  //cartel de victoria
  ganaste() {
    this.MessageService.add({
      severity: 'success',
      summary: 'Empate',
      detail: 'GANASTE!!!',
      sticky: true,
    });
  }
  //cartel de empate
  Empate() {
    this.MessageService.add({
      severity: 'success',
      summary: 'Empate',
      detail: 'Ninguna puede vencer',
      life: 2000,
      //sticky: true,
    });
  }

  //carta MIA derrotada
  cartaDerrotadaMia(carta: Carta) {
    this.cartaDerrotada$.emit(carta);
    this.cementerioMio$.emit(carta);
    delete this.cartaMia;
  }

  //carta OPONENTE derrotada
  cartaDerrotadaOponente(carta: Carta) {
    this.cartaDerrotada$.emit(carta);
    this.cementerioOponente$.emit(carta);
    delete this.cartaOponente;
  }

  //ambas cartas derrotadas
  ambasDerrotadas() {
    this.vaciarCampo$.emit(true);
    this.cementerioOponente$.emit(this.cartaOponente);
    this.cementerioMio$.emit(this.cartaMia);
    delete this.cartaOponente;
    delete this.cartaMia;
  }
}
