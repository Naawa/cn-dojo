<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { Product } from '$lib/server/db/schema/product';

	let { data } = $props();
	let { product } = $derived(data);

	let message = $state<string | null>(null);
	let messageType = $state<'success' | 'error' | null>(null);
	let submitting = $state(false);

	function handleEnhance({ result }: { result: { type: string; data?: any } }) {
		submitting = false;

		if (result.type === 'success') {
			message = 'Product added to inventory!';
			messageType = 'success';
		} else if (result.type === 'failure') {
			message = result.data?.error || 'Something went wrong.';
			messageType = 'error';
		}

		setTimeout(() => {
			message = null;
			messageType = null;
		}, 3000);
	}
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

		<!-- Add to Inventory Button (TODO)-->
		<form method="POST" use:enhance={(enhanceArgs) => {
			submitting = true;
		
			// Run the default enhancement behavior
			return async ({ result }: { result: { type: string; data?: any } }) => {
				submitting = false;
				handleEnhance({ result });
			};
		}}>
		
			<input type="hidden" name="action" value="addToInventory" />
			<input type="hidden" name="productId" value={product?.id} />
			<button type="submit" disabled={submitting}>
				{#if submitting}
					Purchasing...
				{/if}
				{#if !submitting}Purchase{/if}
			</button>
		</form>

		<!-- Other Buttons -->
		<button class="secondary-btn">Wishlist</button>
		<button class="danger-btn" onclick={() => goto("/dashboard/shop")}>← Back to Shop</button>
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
		max-width: 200px;
		min-width: 200px;
		padding: 0.5rem 1rem;
		font-size: 1rem;
		margin-top: 0.5rem;
	}

	button[disabled] {
		background-color: #aaa;
		cursor: not-allowed;
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
