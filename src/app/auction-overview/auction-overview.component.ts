import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../services/auction.service';
import { Player, Team, TeamPlayer } from '../models/auction';

@Component({
  selector: 'app-auction-overview',
  templateUrl: './auction-overview.component.html',
  styleUrls: ['./auction-overview.component.css']
})
export class AuctionOverviewComponent implements OnInit {

  constructor(private service: AuctionService) { }
  players: Player[] = [{
    name: 'Avinash K',
    isSelected: false
  },
  {
    name: 'Avinash R',
    isSelected: false
  }, {
    name: 'Avinash V',
    isSelected: false
  }];
  teams: Team[] = [{
    name: 'SDD Hunters',
    credits: 40000,
    code: 'SDD01'
  },
  {
    name: 'SDD Trumph',
    credits: 40000,
    code: 'SDD02'
  },
  {
    name: 'Doon Fighters',
    credits: 40000,
    code: 'SDD03'
  },
  {
    name: 'SDD Lions',
    credits: 40000,
    code: 'SDD04'
  },
  {
    name: 'SDD Strikers',
    credits: 40000,
    code: 'SDD05'
  },
  {
    name: 'SDD Ebullient',
    credits: 40000,
    code: 'SDD06'
  }];
  teamPlayers: TeamPlayer[] = [];

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
  ngOnInit() {
    // this.service.generatePDf();
    // this.players.forEach(elem => {
    //   this.service.savePlayers(elem);
    // })
    // this.teams.forEach(elem=>{
    //   this.service.saveTeams(elem);
    // })
    this.getTeamPlayers();
  }
  getTeamPlayers() {
    this.service.getTeamPlayers().subscribe(res => {
      this.teamPlayers = [];
      res.forEach(elem => {
        this.teamPlayers.push(elem);
      });
      this.sdd01 = this.teamPlayers.filter(r => r.teamId === 'SDD01');
      this.sdd02 = this.teamPlayers.filter(r => r.teamId === 'SDD02');
      this.sdd03 = this.teamPlayers.filter(r => r.teamId === 'SDD03');
      this.sdd04 = this.teamPlayers.filter(r => r.teamId === 'SDD04');
      this.sdd05 = this.teamPlayers.filter(r => r.teamId === 'SDD05');
      this.sdd06 = this.teamPlayers.filter(r => r.teamId === 'SDD06');
      this.sdd01credits.credit = 40000 - this.getRemainingCredits(this.sdd01);
      this.sdd01credits.players = 13 - this.getRemainingPlayers(this.sdd01);

      this.sdd02credits.credit = 40000 - this.getRemainingCredits(this.sdd02);
      this.sdd02credits.players = 13 - this.getRemainingPlayers(this.sdd02);
      this.sdd03credits.credit = 40000 - this.getRemainingCredits(this.sdd03);
      this.sdd03credits.players = 13 - this.getRemainingPlayers(this.sdd03);
      this.sdd04credits.credit = 40000 - this.getRemainingCredits(this.sdd04);
      this.sdd04credits.players = 13 - this.getRemainingPlayers(this.sdd04);
      this.sdd05credits.credit = 40000 - this.getRemainingCredits(this.sdd05);
      this.sdd05credits.players = 13 - this.getRemainingPlayers(this.sdd05);
      this.sdd06credits.credit = 40000 - this.getRemainingCredits(this.sdd06);
      this.sdd06credits.players = 13 - this.getRemainingPlayers(this.sdd06);
    });
  }
  getRemainingCredits(array: TeamPlayer[]): number {
    return array.reduce((a, b) => a + b.soldAmout, 0);
  }
  getRemainingPlayers(array: TeamPlayer[]): number {
    return array.length;
  }

}
