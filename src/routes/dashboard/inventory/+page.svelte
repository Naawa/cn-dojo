<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Fake inventory items
	let inventory = $state([
		{ id: 1, name: "Banner#1", price: 50, description: "lorem ipsum", category: "banner" },
        { id: 2, name: "Card#1", price: 100, description: "lorem ipsum", category: "card" },
        { id: 3, name: "Profile Pic#1", price: 150, description: "lorem ipsum", category: "profilePic" },
        { id: 4, name: "Banner#2", price: 200, description: "lorem ipsum", category: "banner" },
        { id: 5, name: "Card#2", price: 250, description: "lorem ipsum", category: "card" },
        { id: 6, name: "Profile Pic#2", price: 300, description: "lorem ipsum", category: "profilePic" },
        { id: 7, name: "Banner#3", price: 350, description: "lorem ipsum", category: "banner" },
        { id: 8, name: "Card#3", price: 400, description: "lorem ipsum", category: "card" },
        { id: 9, name: "Profile Pic#3", price: 450, description: "lorem ipsum", category: "profilePic" },
        { id: 10, name: "Banner#4", price: 500, description: "lorem ipsum", category: "banner" },
	]);

	let searchTerm: string = $state('');
	let filteredInventory = $state([]);

	// Sorting
	let sortOption: string = $state('recent');

	// Filtering
	let filters = $state({
		banner: false,
		card: false,
		profilePic: false
	});

    // Watch for changes in the inventory, searchTerm, sortOption, and filters
	$effect(() => {
		
	});
</script>

<section>
	<h2>Inventory</h2>

	<!-- Search Bar -->
	<div class="search-container">
		<input
			type="search"
			placeholder="Search"
			bind:value={searchTerm}
		/>
		<button>Search</button>
	</div>

	<!-- Filter & Sort Dropdowns -->
	<div class="filters-container">
		<div class="dropdown">
			<button class="dropbtn">Sort</button>
			<div class="dropdown-content">
				<label><input type="radio" bind:group={sortOption} value="recent" /> Recent</label>
				<label><input type="radio" bind:group={sortOption} value="high points" /> High Points</label>
				<label><input type="radio" bind:group={sortOption} value="low points" /> Low Points</label>
			</div>
		</div>

		<div class="dropdown">
			<button class="dropbtn">Filter</button>
			<div class="dropdown-content">
				<label><input type="checkbox" bind:checked={filters.banner} /> Banner</label>
				<label><input type="checkbox" bind:checked={filters.card} /> Card</label>
				<label><input type="checkbox" bind:checked={filters.profilePic} /> Profile Pic</label>
			</div>
		</div>
	</div>

	<!-- Inventory Grid -->
	<div class="inventory-grid">
		{#each inventory as item}
			<div class="card">
				<h5>{item.name}</h5>
				<small>{item.price} Pts</small>
				<p>{item.description}</p>
			</div>
		{/each}
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding: 20px;
	}

	.search-container {
		display: flex;
		gap: 10px;
		margin-bottom: 10px;
	}

	input[type='search'] {
		padding: 8px;
		width: 300px;
		border-radius: 5px;
		border: 1px solid #ccc;
		font-size: 14px;
	}

	.filters-container {
		display: flex;
		gap: 20px;
		margin-bottom: 20px;
	}

	.dropdown {
		position: relative;
		display: inline-block;
		width: 200px;
	}

	.dropbtn {
		width: 100%;
		padding: 10px;
		border: none;
		cursor: pointer;
		background-color: #ddd;
		border-radius: 5px;
		text-align: left;
		font-size: 16px;
        color: black;
	}

	.dropdown-content {
		display: none;
		position: absolute;
		width: 100%;
		background-color: #f9f9f9;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
		z-index: 1;
		padding: 10px;
		border-radius: 5px;
	}

	.dropdown:hover .dropdown-content {
		display: block;
        font-size: x-small;
	}

	.dropdown-content label {
		display: block;
		/* padding: 5px 0; */
		cursor: pointer;
	}

	.dropdown-content input {
		margin-right: 5px;
	}

	.inventory-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 2rem;
		max-height: 400px;
		overflow-y: auto;
		padding: 10px;
		border: 2px solid black;
		border-radius: 8px;
		background-color: rgb(255, 255, 255);
		width: 80%;
		max-width: 1000px;
	}

	.card {
		padding: 10px;
		border-radius: 8px;
		background: #f3f3f3;
		font-size: 12px;
		text-align: center;
	}

	.card:hover {
		background-color: #eaeaea;
	}
</style>
