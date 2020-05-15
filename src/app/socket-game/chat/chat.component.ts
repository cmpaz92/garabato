import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { isNull } from 'util';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input() socket: any;
  joinTitle = 'Join';
  alert = false;
  chatroom: String = null;
  x = Math.floor(Math.random() * 100);
  y = Math.floor(Math.random() * 100);
  user: String = null;
  room: String = null;
  messageText: String;
  messageArray: Array<{ user: String; message: String }> = [];

  ngOnInit(): void {
    this.newUserJoined().subscribe((data) => {
      this.messageArray.push(data);
    });
    this.userLeft().subscribe((data) => {
      this.messageArray.push(data);
    });
    this.newMessageReceived().subscribe((data) => {
      this.messageArray.push(data);
    });
  }

  join() {
    if (!isNull(this.room) && !isNull(this.user)) {
      this.joinRoom({ user: this.user, room: this.room });
      this.chatroom = this.room;
      this.joinTitle = 'Have fun!';
      this.newPlayer({
        user: this.user,
        room: this.room,
        x: this.x,
        y: this.y,
      });
    } else {
      this.alertMessage();
    }
  }

  leave() {
    this.leaveRoom({ user: this.user, room: this.room });
    this.chatroom = null;
    this.joinTitle = 'Join';
  }

  sendMessageToChat() {
    if (!isNull(this.room) && !isNull(this.user)) {
      this.sendMessage({
        user: this.user,
        room: this.room,
        message: this.messageText,
      });
    } else {
      this.alertMessage();
    }
  }

  alertMessage() {
    this.alert = true;
    setTimeout(() => {
      this.alert = false;
    }, 3200);
  }

  //--------------------------------Socket Functionality------------------------

  joinRoom(data: any) {
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
  newPlayer(data: any) {
    this.socket.emit('newPlayer', data);
  }
  leaveRoom(data: any) {
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
  sendMessage(data: any) {
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
