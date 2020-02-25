

export interface Player {
    name?: string;
    isSelected?: boolean;
    amount?: number;
    team?: string;
}
export interface Players {
    id?: string;
    player?: Player;
}
export interface Team {
    name?: string;
    credits?: number;
}
export interface Teams {
    id?: string;
    team?: Team;
}


