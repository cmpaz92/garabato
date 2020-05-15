import { Observable } from 'rxjs';
import { Injectable, OnInit, Input } from '@angular/core';
import io from 'socket.io-client';

@Injectable()
export class SocketService {
  socket = io('http://localhost:3000');

  providers: [SocketService];
  joinRoom(data) {
    this.socket.emit('join', data);
    console.log(this.socket);
  }
  newUserJoined() {
    let observable = new Observable<{ user: String; message: String }>(
      (observer) => {
        this.socket.on('new user joined', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }
  newPlayer(data) {
    this.socket.emit('newPlayer', data);
  }
  leaveRoom(data) {
    this.socket.emit('leave', data);
  }
  userLeft() {
    let observable = new Observable<{ user: String; message: String }>(
      (observer) => {
        this.socket.on('left room', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }
  sendMessage(data) {
    this.socket.emit('message', data);
  }
  newMessageReceived() {
    let observable = new Observable<{ user: String; message: String }>(
      (observer) => {
        this.socket.on('new message', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }
}
