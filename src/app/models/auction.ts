

export interface Player {
    name?: string;
    isSelected?: boolean;
}
export interface Players {
    id?: string;
    player?: Player;
}
export interface Team {
    name?: string;
    credits?: number;
    code?: string;
}
export interface Teams {
    id?: string;
    team?: Team;
}
export interface TeamPlayer {
    playerId?: string;
    playerName?: string;
    teamId?: string;
    teamName?: string;
    soldAmout?: number;
}


