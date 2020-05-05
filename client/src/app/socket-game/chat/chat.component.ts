import { SocketService } from './../socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [SocketService],
})
export class ChatComponent implements OnInit {
  user: String;
  room: String;
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
    this._socketService.joinRoom({ user: this.user, room: this.room });
  }

  leave() {
    this._socketService.leaveRoom({ user: this.user, room: this.room });
  }

  sendMessage() {
    this._socketService.sendMessage({
      user: this.user,
      room: this.room,
      message: this.messageText,
    });
  }

  ngOnInit(): void {}
}
