import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Team, Player } from '../models/auction';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private db: AngularFirestore) { }
  savePlayers(data: Player) {

    return this.db.collection('players').add(data);
  }
  saveTeams(data: Team) {

    return this.db.collection('teams').add(data);
  }
  getPlayers() {
    return this.db.collection('players').get();
  }

}
