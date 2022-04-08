import { Component, Input, OnInit } from '@angular/core';
import { Carta } from 'src/app/interfaces/carta.interface';

@Component({
  selector: 'app-carta-en-juego',
  templateUrl: './carta-en-juego.component.html',
  styleUrls: ['./carta-en-juego.component.css'],
})
export class CartaEnJuegoComponent implements OnInit {
  @Input() carta!: Carta;
  constructor() {}

  ngOnInit(): void {}
}
