<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { categories } = $derived(data);

	// Fake shop items
	let shopItems = [
		{ id: 1, name: "Item 1", price: 5 },
		{ id: 2, name: "Item 2", price: 10 },
        { id: 3, name: "Item 3", price: 15 },
        { id: 4, name: "Item 4", price: 20 },
        { id: 5, name: "Item 5", price: 25 },
        { id: 6, name: "Item 6", price: 30 },
        { id: 7, name: "Item 7", price: 35 },
        { id: 8, name: "Item 8", price: 40 },
        { id: 9, name: "Item 9", price: 45 },
        { id: 10, name: "Item 10", price: 50 },
        { id: 11, name: "Item 11", price: 55 },
        { id: 12, name: "Item 12", price: 60 },
        { id: 13, name: "Item 13", price: 65 },
        { id: 14, name: "Item 14", price: 70 },
        { id: 15, name: "Item 15", price: 75 },
        { id: 16, name: "Item 16", price: 80 },
        { id: 17, name: "Item 17", price: 85 },
        { id: 18, name: "Item 18", price: 90 },
        { id: 19, name: "Item 19", price: 95 },
        { id: 20, name: "Item 20", price: 100 }
	];

	// Fake popular items
	let popularItems = [
		{ id: 1, name: "Popular Item 1", price: 5 },
        { id: 2, name: "Popular Item 2", price: 10 },
        { id: 3, name: "Popular Item 3", price: 15 },
        { id: 4, name: "Popular Item 4", price: 20 }
	];
</script>

<section>
	<h2>Shop</h2>

	<!-- Search Bar -->
	<div class="search-bar">
		<input type="search" placeholder="Search" />
	</div>

	<!-- Popular Items (Now on Top) -->
	<div class="shop-container">
		<h3>Popular Items</h3>
		<div class="scrollable-grid">
			{#each popularItems as item}
				<a class="card" href="/dashboard/shop/{item.id}">
					<div>
						<h5>{item.name}</h5>
						<small>{item.price} Pts</small>
					</div>
				</a>
			{/each}
		</div>
	</div>

	<!-- Shop Items -->
	<div class="shop-container">
		<h3>All Items</h3>
		<div class="scrollable-grid">
			{#each shopItems as product}
				<a class="card" href="/dashboard/shop/{product.id}">
					<div>
						<h5>{product.name}</h5>
						<small>{product.price} Pts</small>
					</div>
				</a>
			{/each}
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
		padding: 20px;
	}

	/* Search Bar now matches the width of shop-container */
	.search-bar {
		width: 80%;
		max-width: 1000px;
	}

	input[type="search"] {
		width: 100%;
		padding: 8px;
		border-radius: 5px;
		border: 1px solid #ccc;
		font-size: 14px;
		box-sizing: border-box;
	}

	.shop-container {
		width: 80%;
		max-width: 1000px;
		margin-bottom: 20px;
	}

	.scrollable-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 1rem;
		max-height: 300px;
		overflow-y: auto;
		padding: 10px;
		border: 2px solid black;
		border-radius: 8px;
		background-color: rgb(255, 255, 255);
	}

	.card {
		font-size: 10px;
	}

	.card:hover {
		background-color: #eaeaea;
	}

	@media (max-width: 600px) {
		.scrollable-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

