<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	let { data } = $props();
	let { product } = $derived(data);
	let message = $state<string | null>(null);
	let messageType = $state<'success' | 'error' | null>(null);

	// You could wire this in later with real student ID from session
	// let studentId = "uuid-placeholder-1234"; // Replace with actual logged in student ID
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
		<form method="POST" use:enhance={async ({ action, formData }) => {
			const response = await fetch(action, {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				message = 'Product added to inventory!';
				messageType = 'success';

				setTimeout(() => {
					message = null;
					messageType = null;
				}, 3000); // hide after 3s
			} else {
				const data = await response.json();
				message = data?.error || 'Something went wrong.';
				messageType = 'error';
			}
		}}>
			<input type="hidden" name="action" value="addToInventory" />
			<input type="hidden" name="productId" value={product?.id} />
			<button type="submit">Add to Inventory</button>
		</form>
		
		{#if message}
			<div class="toast {messageType}">
				{message}
			</div>
		{/if}

		<button>Wishlist</button>

		<button onclick={() => goto("/dashboard/shop")}>← Back to Shop</button>
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

	.toast {
		position: fixed;
		top: 1rem;
		right: 1rem;
		padding: 0.75rem 1.25rem;
		border-radius: 6px;
		color: white;
		font-weight: bold;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		z-index: 1000;
		animation: fadein 0.3s ease-out;
	}
	.toast.success {
		background-color: #2ecc71;
	}
	.toast.error {
		background-color: #e74c3c;
	}
	@keyframes fadein {
		from { opacity: 0; transform: translateY(-10px); }
		to { opacity: 1; transform: translateY(0); }
	}

</style>
