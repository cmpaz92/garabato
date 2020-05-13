import { Injectable } from '@angular/core';
import io from 'socket.io-client';

@Injectable()
export class Globals {
  socket = io('http://localhost:3000');
}
