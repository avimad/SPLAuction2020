import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { players, teams } from '../models/auction';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private db: AngularFirestore) { }
  savePlayers(data:players) {
   
   return this.db.collection('players').add(data);
  }
  saveTeams(data:teams) {
    
   return this.db.collection('teams').add(data);
  }
  getPlayers(){
    return this.db.collection('players').get();
  }

}
