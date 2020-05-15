import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketGameComponent } from './socket-game/socket-game.component';
import { ChatComponent } from './socket-game/chat/chat.component';
import { CanvasComponent } from './socket-game/canvas/canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    SocketGameComponent,
    ChatComponent,
    CanvasComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
