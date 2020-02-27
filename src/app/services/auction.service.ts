import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Team, Player, TeamPlayer } from '../models/auction';
import * as jsPDF from 'jspdf';
import { firestore } from 'firebase';
import { FirebaseFirestore } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private db: AngularFirestore ) { }
  savePlayers(data: Player) {

    return this.db.collection('players').add(data);
  }
  saveTeams(data: Team) {
    return this.db.collection('teams').add(data);
  }
  updatePlayer(id, data) {
    return this.db.collection('players').doc(id).update(data);
  }
  getPlayers() {
    return this.db.collection('players').get();
  }
  getTeams() {
    return this.db.collection('teams').get();
  }
  saveTeamPlayer(data) {
    return this.db.collection('teamPlayers').add(data);
  }
  getTeamPlayers() {
    return this.db.collection('teamPlayers').valueChanges();
  }

  getRemainingCredits(array: TeamPlayer[]): number {
    return array.reduce((a, b) => a + b.soldAmout, 0);
  }
  getRemainingPlayers(array: TeamPlayer[]): number {
    return array.length;
  }
}
