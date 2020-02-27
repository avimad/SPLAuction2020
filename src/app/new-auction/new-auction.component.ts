import { Component, OnInit, OnDestroy } from '@angular/core';
import { Players, Player, Teams, TeamPlayer } from '../models/auction';
import { AuctionService } from '../services/auction.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
  selector: 'app-new-auction',
  templateUrl: './new-auction.component.html',
  styleUrls: ['./new-auction.component.css']
})
export class NewAuctionComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  players: Players[] = [];
  selectedPlayer = { id: '', name: '' };
  auctionForm: FormGroup;
  constructor(private service: AuctionService, private fb: FormBuilder) { }
  selectedTeam: string;
  Teams: Teams[] = [];
  player: Player = {}

  sdd01credits = { credit: 40000, players: 13 };
  sdd02credits = { credit: 40000, players: 13 };
  sdd03credits = { credit: 40000, players: 13 };
  sdd04credits = { credit: 40000, players: 13 };
  sdd05credits = { credit: 40000, players: 13 };
  sdd06credits = { credit: 40000, players: 13 };

  sdd01: TeamPlayer[] = [];
  sdd02: TeamPlayer[] = [];
  sdd03: TeamPlayer[] = [];
  sdd04: TeamPlayer[] = [];
  sdd05: TeamPlayer[] = [];
  sdd06: TeamPlayer[] = [];

  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  

  ngOnInit() {
    this.createForm();
    this.getAllPlayers();
    this.getAllTeams();

  }
  createForm() {
    this.auctionForm = this.fb.group({
      teamId: [null, Validators.required],
      soldAmount: [1000, Validators.required]
    });
  }

  getTeamPlayers() {
    this.service.getTeamPlayers().subscribe(res => {
    const teamPlayers = [];
      res.forEach(elem => {
        teamPlayers.push(elem);
      });
      this.sdd01 = teamPlayers.filter(r => r.teamId === 'SDD01');
      this.sdd02 = teamPlayers.filter(r => r.teamId === 'SDD02');
      this.sdd03 = teamPlayers.filter(r => r.teamId === 'SDD03');
      this.sdd04 = teamPlayers.filter(r => r.teamId === 'SDD04');
      this.sdd05 = teamPlayers.filter(r => r.teamId === 'SDD05');
      this.sdd06 = teamPlayers.filter(r => r.teamId === 'SDD06');
      this.sdd01credits.credit = 40000 - this.service.getRemainingCredits(this.sdd01);
      this.sdd01credits.players = 13 - this.service.getRemainingPlayers(this.sdd01);

      this.sdd02credits.credit = 40000 - this.service.getRemainingCredits(this.sdd02);
      this.sdd02credits.players = 13 - this.service.getRemainingPlayers(this.sdd02);
      this.sdd03credits.credit = 40000 - this.service.getRemainingCredits(this.sdd03);
      this.sdd03credits.players = 13 - this.service.getRemainingPlayers(this.sdd03);
      this.sdd04credits.credit = 40000 - this.service.getRemainingCredits(this.sdd04);
      this.sdd04credits.players = 13 - this.service.getRemainingPlayers(this.sdd04);
      this.sdd05credits.credit = 40000 - this.service.getRemainingCredits(this.sdd05);
      this.sdd05credits.players = 13 - this.service.getRemainingPlayers(this.sdd05);
      this.sdd06credits.credit = 40000 - this.service.getRemainingCredits(this.sdd06);
      this.sdd06credits.players = 13 - this.service.getRemainingPlayers(this.sdd06);
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
      this.players = this.players.filter(r => r.player.isSelected === false);
      if (this.players.length > 0) {
        this.chooseRandom();
      }

    });
  }
  getAllTeams() {
    this.Teams = [];
    this.service.getTeams().subscribe(res => {
      res.docs.forEach(elem => {
        const record: Teams = {};
        record.id = elem.data().code;
        record.team = elem.data();
        this.Teams.push(record);
      });
    });
  }
  Playersold() {
    let playersold: TeamPlayer = {};
    playersold.playerId = this.selectedPlayer.id;
    playersold.playerName = this.selectedPlayer.name;
    playersold.soldAmout = this.auctionForm.controls.soldAmount.value;
    playersold.teamId = this.auctionForm.controls.teamId.value;
    playersold.teamName = this.Teams.find(r => r.id === this.auctionForm.controls.teamId.value).team.name;
    this.service.saveTeamPlayer(playersold).then(res => {
      alert(playersold.playerName + 'sold to' + playersold.teamName + 'in amount' + playersold.soldAmout);
      const index = this.players.findIndex(r => r.id === playersold.playerId);
      this.players.splice(index, 1);
      const player: Player = {};
      player.isSelected = true;
      this.service.updatePlayer(playersold.playerId, player).then();
      this.chooseRandom();
      playersold = {};
      this.auctionForm.reset();
      this.auctionForm.controls.soldAmount.setValue(1000);
    });
  }

  chooseRandom() {
    const index = Math.floor(Math.random() * this.players.length);
    const player = this.players[index];
    this.selectedPlayer.name = player.player.name;
    this.selectedPlayer.id = player.id;


  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.data = this.data.filter(x => x.length > 0);
      this.data.forEach(elem => {
        this.player = {}
        this.player.name = elem[0];
        this.player.isSelected = false;
        this.service.savePlayers(this.player);

      })
    };
    reader.readAsBinaryString(target.files[0]);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
