<script lang="ts">
	import { scale } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import type { Product, ProductCategory } from '$lib/server/db/schema/product';
	import { invalidateAll } from '$app/navigation';

	let {
		open = $bindable(false),
		form,
		products,
		categories
	}: {
		open: boolean;
		form: ActionData;
		products: Product[] | null;
		categories: ProductCategory[] | null;
	} = $props();

	let productName: string = $state('');
	let price: number = $state(0);
	let category: string = $state('');
	let image: File | HTMLImageElement | null = $state(null);

	$effect(() => {
		let attempt = 0;
		if (products) {
			for (let i = 0; i < products.length; i++) {
				if (productName === products[i].name) {
					attempt += 1;
					let newProductName = productName;
					if (attempt > 1) {
						newProductName = productName.substring(0, productName.length - 1) + attempt;
					} else {
						newProductName += attempt;
					}
					productName = newProductName;
					i = 0;
				}
			}
		}
	});
</script>

<section class="card" transition:scale>
	<form method="post" action="/dashboard/shop?/add" use:enhance>
		<span>
			<h2>New Product</h2>
			<button
				type="reset"
				class="danger-btn"
				onclick={() => {
					if (form) {
						form.error = '';
						form.success = '';
					}
					open = false;
				}}>Exit</button
			>
		</span>

		<span>
			<div class="input-container">
				<label for="productName"> Product Name </label>
				<input bind:value={productName} name="productName" placeholder="Example Product" />
			</div>
		</span>

		<span>
			<div class="input-container">
				<label for="price"> Price (pts) </label>
				<input type="text" bind:value={price} name="price" />
			</div>
		</span>

		<div class="input-container">
			<label for="belt">Category</label>
			<select bind:value={category} name="belt">
				{#if categories}
					{#each categories as category}
						<option value={category}>{category}</option>
					{/each}
				{/if}
			</select>
		</div>
		<label for="file-upload" class="custom-file-upload">
			Upload Image
		</label>
		<input id="file-upload" name="image" type="file" bind:value={image}/>
		<br>
		<b>Image upload guidelines.</b>
		<ul>
			<li>3D Print and Icons should have a 1:1 aspect ratio.</li>
			<li>Name tag banner should have a 21:9 aspect ratio.</li>
		</ul>
		<br>
		{#if image}
			<img bind:this={image} alt="Yuh">
		{/if}
		{#if form?.error || form?.success}
			<b class:error={form.error} class:success={form.success}>{form.success}{form.error}</b>
		{/if}

		<button
			type="submit"
			onclick={() => {
				invalidateAll();
			}}>Add to Shop</button
		>
	</form>
</section>

<style>
	section {
		justify-content: center;
		align-items: center;
		position: fixed;
		background-color: #fcfdff;
		margin: 0;
		z-index: 1;
		gap: 1em;
		height: 100%;
		width: 80vw;
		top: 0;

		form {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 1em;
			max-width: 32em;

			input,
			select {
				width: 100%;
			}
			span {
				display: flex;
				max-width: 100%;
				width: 100%;
				gap: 1em;
				justify-content: space-between;
				align-items: center;
			}
			button {
				min-width: none;
				top: 10%;
				right: 11.25%;
				width: 100%;
			}

			img {
				height: 100%;
				width: 100%;
				max-width: 80vw;
				max-height: 40vh;
			}
		}
	}
</style>
