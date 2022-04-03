import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material/material.module';
import { JuegoDeCartasModule } from './juego-de-cartas/juego-de-cartas.module';

import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [AppComponent, MenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    JuegoDeCartasModule,
    FlexLayoutModule,
  ],
  exports: [MenuComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
