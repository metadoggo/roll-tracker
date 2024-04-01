<script lang="ts">
	import type { Player } from '$lib/store/player_store';

	export let player: Player;
	export let isActive: boolean = false;
</script>

<button
	on:click
	class="btn w-48 h-48 shadow-xl flex-col"
	class:bg-base-300={isActive}
	class:bg-base-100={!isActive}
>
	<div class="text-9xl">{player.emoji}</div>
	<h1 class="text-xl">{player.name}</h1>
</button>
