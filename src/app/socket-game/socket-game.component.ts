import { Component } from '@angular/core';
import io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-socket-game',
  templateUrl: './socket-game.component.html',
  styleUrls: ['./socket-game.component.scss'],
})
export class SocketGameComponent {
  socket = io(environment.socketapiPath);
}
