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
  connected = false;
  chatroom: String = null;
  user: String = sessionStorage.getItem('loggedUser') ? sessionStorage.getItem('loggedUser') : "anonim";
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
    document.body.onkeydown = (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        this.sendMessageToChat();
      }
    };
  }

  join() {
    if (!isNull(this.room) && !isNull(this.user)) {
      this.chatroom = this.room;
      this.joinTitle = 'Have fun!';
      this.newPlayer(this.user, this.room);
      this.connected = true;
      this.joinRoom(this.user, this.room);
    } else {
      this.alertMessage();
    }
  }

  leave() {
    this.leaveRoom(this.user, this.room);
    this.chatroom = null;
    this.joinTitle = 'Join';
    this.connected = false;
  }

  sendMessageToChat() {
    if (!isNull(this.room) && !isNull(this.user)) {
      this.sendMessage(this.user, this.room, this.messageText);
    } else {
      this.alertMessage();
    }
    this.scrollChat();
  }

  startGame(){
    if (!isNull(this.room) && !isNull(this.user)) {
      this.socket.emit('startGame', this.room);
    //  console.log(this.user + " has started the game in " + this.room);
    } else {
      this.alertMessage();
    }
    this.scrollChat();
  }

  alertMessage() {
    this.alert = true;
    setTimeout(() => {
      this.alert = false;
    }, 3200);
  }

  scrollChat(){
    var objDiv = document.getElementById("windowchat");
    if(objDiv !=null){
    objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  //--------------------------------Socket Functionality------------------------

  joinRoom(user:String, room:String) {
    this.socket.emit('join', user, room);
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
  newPlayer(user: String, room: String) {
    this.socket.emit('newPlayer', user, room);
  }

  leaveRoom(user:String, room:String) {
    this.socket.emit('leave', user, room);
    this.connected = false;
    this.messageText = "";
    this.messageArray = [];
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
    this.scrollChat();
    return observable;
  }
  sendMessage(userName:String, room:String, messageText:String) {
    this.socket.emit('message', userName, room, messageText);
    this.messageText = "";
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
    this.scrollChat();
    return observable;
  }
}
