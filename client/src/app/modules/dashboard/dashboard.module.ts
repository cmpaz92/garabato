import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { SocketGameComponent } from '../../socket-game/socket-game.component';
import { ChatComponent } from '../../socket-game/chat/chat.component';
import { CanvasComponent } from '../../socket-game/canvas/canvas.component';


@NgModule({
  declarations: [DashboardComponent, SocketGameComponent, ChatComponent, CanvasComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
  ]
})
export class DashboardModule { }
