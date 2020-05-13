import { Globals } from './../global';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SocketService {
  providers: [SocketService, Globals];

  constructor(public globals: Globals) {}

  joinRoom(data) {
    this.globals.socket.emit('join', data);
    console.log(this.globals.socket);
  }
  newUserJoined() {
    let observable = new Observable<{ user: String; message: String }>(
      (observer) => {
        this.globals.socket.on('new user joined', (data) => {
          observer.next(data);
        });
        return () => {
          this.globals.socket.disconnect();
        };
      }
    );
    return observable;
  }
  newPlayer(data) {
    this.globals.socket.emit('newPlayer', data);
  }
  leaveRoom(data) {
    this.globals.socket.emit('leave', data);
  }
  userLeft() {
    let observable = new Observable<{ user: String; message: String }>(
      (observer) => {
        this.globals.socket.on('left room', (data) => {
          observer.next(data);
        });
        return () => {
          this.globals.socket.disconnect();
        };
      }
    );
    return observable;
  }
  sendMessage(data) {
    this.globals.socket.emit('message', data);
  }
  newMessageReceived() {
    let observable = new Observable<{ user: String; message: String }>(
      (observer) => {
        this.globals.socket.on('new message', (data) => {
          observer.next(data);
        });
        return () => {
          this.globals.socket.disconnect();
        };
      }
    );
    return observable;
  }
}
