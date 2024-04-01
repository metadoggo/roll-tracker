import { writable, type Writable } from 'svelte/store';

export class Player {
	name: string;
	emoji: string;

	constructor(name: string, emoji: string) {
		this.name = name;
		this.emoji = emoji;
	}
}

export const playerStore = writable<Player[]>([]);

export function addPlayer(name: string, emoji: string) {
	playerStore.update(($s) => {
		$s.push(new Player(name, emoji));
		return $s;
	});
}
