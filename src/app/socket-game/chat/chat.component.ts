import { SocketService } from './../socket.service';
import { Component, OnInit } from '@angular/core';
import { isNull } from 'util';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [SocketService],
})
export class ChatComponent implements OnInit {
  joinTitle = 'Join';
  alert = false;
  chatroom: String = null;
  x = Math.floor(Math.random() * 100);
  y = Math.floor(Math.random() * 100);
  user: String = null;
  room: String = null;
  messageText: String;
  messageArray: Array<{ user: String; message: String }> = [];
  constructor(private _socketService: SocketService) {
    this._socketService.newUserJoined().subscribe((data) => {
      this.messageArray.push(data);
    });
    this._socketService.userLeft().subscribe((data) => {
      this.messageArray.push(data);
    });
    this._socketService.newMessageReceived().subscribe((data) => {
      this.messageArray.push(data);
    });
  }

  join() {
    if (!isNull(this.room) && !isNull(this.user)) {
      this._socketService.joinRoom({ user: this.user, room: this.room });
      this.chatroom = this.room;
      this.joinTitle = 'Have fun!';
      this._socketService.newPlayer({
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
    this._socketService.leaveRoom({ user: this.user, room: this.room });
    this.chatroom = null;
    this.joinTitle = 'Join';
  }

  sendMessage() {
    if (!isNull(this.room) && !isNull(this.user)) {
      this._socketService.sendMessage({
        user: this.user,
        room: this.room,
        message: this.messageText,
      });
      this._socketService;
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

  ngOnInit(): void {}
}
