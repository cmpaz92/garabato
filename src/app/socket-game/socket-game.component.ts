import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';

@Component({
  selector: 'app-socket-game',
  templateUrl: './socket-game.component.html',
  styleUrls: ['./socket-game.component.scss'],
})
export class SocketGameComponent {
  socket = io('http://localhost:3000');
  lol = 'hey';
}
