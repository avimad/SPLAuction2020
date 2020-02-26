import { Component, OnInit, OnDestroy } from '@angular/core';
import { Players, Player, Teams, TeamPlayer } from '../models/auction';
import { AuctionService } from '../services/auction.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-auction',
  templateUrl: './new-auction.component.html',
  styleUrls: ['./new-auction.component.css']
})
export class NewAuctionComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  players: Players[] = [];
  selectedPlayer = { id: '', name: '' }
  auctionForm: FormGroup;
  constructor(private service: AuctionService, private fb: FormBuilder) { }
  selectedTeam: string;
  Teams: Teams[] = [];

  ngOnInit() {
    this.createForm();
    this.getAllPlayers();
    this.getAllTeams();

  }
  createForm() {
    this.auctionForm = this.fb.group({
      teamId: [],
      soldAmount: [1000]
    });
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
      this.chooseRandom();
    });
  }
  getAllTeams() {
    this.Teams = [];
    this.service.getTeams().subscribe(res => {
      res.docs.forEach(elem => {
        const record: Teams = {};
        record.id = elem.id;
        record.team = elem.data();
        this.Teams.push(record);
      })
    });
  }
  Playersold() {
    const playersold: TeamPlayer = {};
    playersold.playerId = this.selectedPlayer.id;
    playersold.playerName = this.selectedPlayer.name;
    playersold.soldAmout = this.auctionForm.controls.soldAmount.value;
    playersold.teamId = this.auctionForm.controls.teamId.value
    playersold.teamName = this.Teams.find(r => r.id === this.auctionForm.controls.teamId.value).team.name;
    this.service.saveTeamPlayer(playersold).then(res => {
      alert(playersold.playerName + 'sold to' + playersold.teamName + 'in amount' + playersold.soldAmout);
      const index = this.players.findIndex(r => r.id === playersold.playerId);
      this.players.splice(index, 1);
      const player: Player = {};
      player.isSelected = true;
      this.service.updatePlayer(playersold.playerId, player).then()
    });
  }

  chooseRandom() {
    const index = Math.floor(Math.random() * this.players.length);
    const player = this.players[index];
    this.selectedPlayer.name = player.player.name;
    this.selectedPlayer.id = player.id;


  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
