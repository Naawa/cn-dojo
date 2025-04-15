<script lang="ts">
	import type { LayoutServerData } from './$types';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData & LayoutServerData } = $props();

	let { student, student_profile } = $derived(data);

	// fake data
	let printHistory = [
		{ id: 1, file: "infinity_cube.stl", date: "March 20, 2025", status: "Completed" },
		{ id: 2, file: "dragon.stl", date: "March 18, 2025", status: "Completed" },
		{ id: 3, file: "cat.stl", date: "March 15, 2025", status: "Pending" },
		{ id: 4, file: "ninja.stl", date: "March 10, 2025", status: "Completed" }
	];

	let pointsHistory = [
		{ id: 1, item: "No Bueno", points: -5, date: "March 21, 2025" },
		{ id: 2, item: "Game finished", points: +1, date: "March 19, 2025" },
		{ id: 3, item: "Level Up", points: +3, date: "March 17, 2025" },
		{ id: 4, item: "Belt Up", points: +5, date: "March 15, 2025" }
	];
</script>

<section>
	<div class="header">
		<h1>Jane Doe - Overview</h1>
		<h2>46 Points | White Belt</h2>
	</div>

	<div class="dashboard">
		<div class="left-side">
			<!-- Events/News Section -->
			<div class="box">
				<h3>Events/News</h3>
				<p>Stay updated with the latest events and announcements!</p>
			</div>

			<!-- Popular Shop Items -->
			<div class="box">
				<h3>Popular Items</h3>
				<p>Check out trending items in the store!</p>
				<br>
				<a href="/dashboard/shop"><button class="primary">Visit Store</button></a>
			</div>
		</div>

		<div class="right-side">
			<!-- Print History -->
			<div class="box">
				<h3>Print History</h3>
				<div class="scrollable">
					{#each printHistory as print}
					<div class="history-item">
						<strong>{print.file}</strong>
						<p>{print.date}: <span class={print.status === "Completed" ? "completed" : "pending"}>{print.status}</span></p>
					</div>
					{/each}
				</div>
			</div>

			<!-- Points History -->
			<div class="box">
				<h3>Points History</h3>
				<div class="scrollable">
					{#each pointsHistory as history}
					<div class="history-item">
						<strong>{history.item}</strong>
						<p>{history.date}: <span class={history.points > 0 ? "earned" : "spent"}>{history.points} pts</span></p>
					</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	:root {
		--side-padding: 0vw; /* Distance between container and sides */
	}

	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		position: relative;
		margin-top: -20px; /* Moves the content higher */
		padding-left: var(--side-padding);
		padding-right: var(--side-padding);
	}

	.header {
		text-align: center;
		margin-bottom: 1rem;
	}

	.dashboard {
		display: grid;
		grid-template-columns: 2fr 1fr; /* Default: Left side wider */
		gap: 1rem;
		width: 100%;
		max-width: 1400px;
	}

	.left-side,
	.right-side {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.box {
		border: 2px solid black;
		padding: 1rem;
		border-radius: 0.4em;
		height: 250px;
		display: flex;
		flex-direction: column;
	}

	.scrollable {
		overflow-y: auto;
		padding-right: 10px;
	}

	.history-item {
		padding: 5px 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.history-item:last-child {
		border-bottom: none;
	}

	.completed {
		color: green;
		font-weight: bold;
	}

	.pending {
		color: orange;
		font-weight: bold;
	}

	.earned {
		color: green;
		font-weight: bold;
	}

	.spent {
		color: red;
		font-weight: bold;
	}

	/* Responsive Adjustments */
	@media (max-width: 900px) {
		.dashboard {
			grid-template-columns: 1fr; /* Switch to single column */
			width: 100%;
		}
	}
</style>
