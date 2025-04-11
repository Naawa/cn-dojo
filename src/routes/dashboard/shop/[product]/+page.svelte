<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	let { data } = $props();
	let { product } = $derived(data);

	// You could wire this in later with real student ID from session
	let studentId = "uuid-placeholder-1234"; // Replace with actual logged in student ID
</script>

<section class="product-page">
	<!-- Product image -->
	<div class="image-wrapper">
		<img src="{product?.imageUrl}" alt="">
    {#if !product?.imageUrl}
      <div class="image-placeholder">No Image Available</div>
    {/if}
	</div>

	<!-- Product info -->
	<div class="product-info">
		<h1>{product?.name}</h1>
		<p class="price">{product?.price} Points</p>
		<p class="description">{product?.description}</p>

		<!-- Buttons -->
		<form method="POST" use:enhance>
			<input type="hidden" name="action" value="addToInventory" />
			<input type="hidden" name="productId" value={product?.id} />
			<button type="submit">Add to Inventory</button>
		</form>

		<button>Wishlist</button>

		<button onclick={() => goto('/shop')}>← Back to Shop</button>
	</div>
</section>

<style>
	.product-page {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: start;
		gap: 2rem;
		padding: 2rem;
		flex-wrap: wrap;
	}

	.image-wrapper {
		flex: 1 1 300px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	img {
		max-width: 400px;
		height: auto;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	.image-placeholder {
		width: 300px;
		height: 300px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #eee;
		border-radius: 8px;
	}

	.product-info {
		flex: 1 1 300px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.price {
		font-weight: bold;
		color: #444;
	}

	.description {
		color: #666;
	}

	button {
    max-width: 190px;
    min-width: 190px;
		padding: 0.5rem 1rem;
		border: none;
		background-color: #2b72ff;
		color: white;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1rem;
		margin-top: 0.5rem;
	}

	button:hover {
		background-color: #1c54c4;
	}
</style>
