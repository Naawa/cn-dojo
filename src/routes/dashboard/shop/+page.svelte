<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { products } = $derived(data);

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
	<div class="search-container">
		<input
			type="search"
			placeholder="Search"
		/>
		<button>Search</button>
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
			{#if products}
			{#each products as product}
				<a class="card" href="/dashboard/shop/{product.id}">
					<div>
						<h5>{product.name}</h5>
						<small>{product.price} Pts</small>
					</div>
				</a>
			{/each}
			{/if}
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
	.search-container {
		width: 80%;
		max-width: 1000px;
		display: flex;
		gap: 10px;
		margin-bottom: 10px;
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

