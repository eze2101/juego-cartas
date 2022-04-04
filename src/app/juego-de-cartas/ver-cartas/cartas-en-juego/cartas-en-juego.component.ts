import { Component, Input, OnInit } from '@angular/core';

import { Carta } from 'src/app/interfaces/carta.interface';

@Component({
  selector: 'app-cartas-en-juego',
  templateUrl: './cartas-en-juego.component.html',
  styleUrls: ['./cartas-en-juego.component.css'],
})
export class CartasEnJuegoComponent implements OnInit {
  @Input() carta!: Carta;

  constructor() {}

  ngOnInit(): void {}
}
