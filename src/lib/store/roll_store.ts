import { writable } from 'svelte/store';
import type { Player } from './player_store';

export class Roll {
	d1: number;
	d2: number;
	player: Player;

	constructor(player: Player) {
		this.d1 = Roll._roll();
		this.d2 = Roll._roll();
		this.player = player;
	}

	private static _roll() {
		return Math.floor(Math.random() * 6 + 1);
	}

	get value() {
		return this.d1 + this.d2;
	}
}

export const rollStore = writable<Roll[]>([]);

export function roll(player: Player) {
	rollStore.update(($s) => {
		$s.unshift(new Roll(player));
		return $s;
	});
}
