<script lang="ts">
	import { addPlayer, playerStore } from '$lib/store/player_store';
	import { roll, rollStore } from '$lib/store/roll_store';
	import PlayerCard from '$lib/ui/player_card.svelte';

	function onPlayerSubmit(
		event: SubmitEvent & {
			currentTarget: HTMLFormElement;
		}
	) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const name = data.get('name') as string;
		const emoji = data.get('emoji') as string;
		if ($playerStore.find((p) => p.name === name)) {
			console.error(`${name} already added`);
			return;
		}
		addPlayer(name, emoji);
		event.currentTarget.reset();
	}

	$: activePlayer = $rollStore.length ? $rollStore[0].player : undefined;
</script>

<form on:submit={onPlayerSubmit} class="flex justify-center">
	<label class="input input-bordered flex-64 flex items-center gap-2">
		👩‍🍳
		<input name="name" class="grow" required placeholder="Name" />
	</label>
	<label class="input input-bordered flex items-center gap-2">
		😃
		<input name="emoji" class="grow w-12 text-center" required placeholder="Emoji" />
	</label>
	<footer>
		<button class="btn">Add</button>
	</footer>
</form>

<ul class="flex justify-center gap-4 my-8">
	{#each $playerStore as player}
		<li>
			<PlayerCard {player} isActive={player === activePlayer} on:click={() => roll(player)} />
		</li>
	{/each}
</ul>

<ul
	class="flex flex-col items-center justify-center gap-2 text-4xl my-8 [&>*:first-child]:text-7xl [&>*:nth-child(2)]:text-6xl [&>*:nth-child(3)]:text-5xl"
>
	{#each $rollStore as roll}
		<li class="flex gap-4 p-2">
			<span>{roll.player.emoji}</span>
			<div>
				<span class="border rounded rounded-xl px-3">{roll.d1}</span>
				<span>+</span>
				<span class="border rounded rounded-xl px-2">{roll.d2}</span>
			</div>
			<span>=</span>
			<span>{roll.value}</span>
		</li>
	{/each}
</ul>
