import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import io from 'socket.io-client';

@Component({
  selector: 'app-socket-game',
  templateUrl: './socket-game.component.html',
  styleUrls: ['./socket-game.component.scss'],
})
export class SocketGameComponent implements OnInit {
  @ViewChild('game')
  private gameCanvas: ElementRef;
  public context: any;
  private socket: any;
  public players: any[] = [];

  public ngOnInit() {
    this.socket = io('http://localhost:3000');
  }
  public ngAfterViewInit() {
    this.context = this.gameCanvas.nativeElement.getContext('2d');

    this.socket.on('position', (position) => {
      this.context.clearRect(
        0,
        0,
        this.gameCanvas.nativeElement.width,
        this.gameCanvas.nativeElement.height
      );
      this.context.fillStyle = '#cfd6c9';
      this.context.fillRect(position.x, position.y, 20.2, 20.2);
    });

    document.onkeydown = (e) => {
      let dir: string;
      if (e.keyCode === 39) dir = 'right';
      if (e.keyCode === 37) dir = 'left';
      if (e.keyCode === 38) dir = 'up';
      if (e.keyCode === 40) dir = 'down';

      this.socket.emit('move', dir);
    };
  }
}
