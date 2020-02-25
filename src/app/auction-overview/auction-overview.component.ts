import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../services/auction.service';
import { players, teams } from '../models/auction';

@Component({
  selector: 'app-auction-overview',
  templateUrl: './auction-overview.component.html',
  styleUrls: ['./auction-overview.component.css']
})
export class AuctionOverviewComponent implements OnInit {

  constructor(private service: AuctionService) { }
  players: players[] = [{
    name: 'Avinash K',
    isSelected: false,
    amount: 0,
    team: null
  },
  {
    name: 'Avinash R',
    isSelected: false,
    amount: 0,
    team: null
  }, {
    name: 'Avinash V',
    isSelected: false,
    amount: 0,
    team: null
  }]
  teams: teams[] = [{
    name: 'SDD Hunters',
    credits: 40000
  },
  {
    name: 'SDD Hunters',
    credits: 40000
  },
  {
    name: 'Doon Fighters',
    credits: 40000
  },
  {
    name: 'SDD Lions',
    credits: 40000
  },
  {
    name: 'SDD Strikers',
    credits: 40000
  },
  {
    name: 'SDD Ebullient',
    credits: 40000
  },]

  ngOnInit() {
    // this.players.forEach(elem => {
    //   this.service.savePlayers(elem);
    // })
    // this.teams.forEach(elem=>{
    //   this.service.saveTeams(elem);
    // })
    this.service.getPlayers().subscribe(console.log);
  }

}