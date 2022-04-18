import { Component, Input, OnInit } from '@angular/core';
import { Carta } from 'src/app/interfaces/carta.interface';

@Component({
  selector: 'app-cartas-oponente',
  templateUrl: './cartas-oponente.component.html',
  styleUrls: ['./cartas-oponente.component.css'],
})
export class CartasOponenteComponent implements OnInit {
  @Input() carta!: Carta;
  constructor() {}

  ngOnInit(): void {}
}
