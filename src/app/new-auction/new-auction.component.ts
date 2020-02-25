import { Component, OnInit, OnDestroy } from '@angular/core';
import { Players, Player } from '../models/auction';
import { AuctionService } from '../services/auction.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-new-auction',
  templateUrl: './new-auction.component.html',
  styleUrls: ['./new-auction.component.css']
})
export class NewAuctionComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  players: Players[] = [];
  playerName = 'Test Player';
  constructor(private service: AuctionService) { }

  ngOnInit() {
    this.getAllPlayers();
  }
  getAllPlayers() {
    this.players = [];
    this.service.getPlayers().subscribe(res => {
      res.docs.forEach(elem => {
        const record: Players = {};
        record.id = elem.id;
        record.player = elem.data();
        this.players.push(record);
      });
    });
  }
  chooseRandom() {
    const index = Math.floor(Math.random() * this.players.length);
    const player = this.players[index];
    this.playerName = player.player.name;
    this.players.splice(index, 1);

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
