<script lang="ts">
	import { enhance } from '$app/forms';
	import type { LayoutServerData } from './$types';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData & LayoutServerData } = $props();

	let {student, student_profile } = $derived(data)
	/**
	 * Overview
	 * 1.
	 */
</script>

<section>
	<h1>Profile</h1>	
	<div class="card">
		<h2>Hi, {student.firstName}!</h2>
		<h3>You have {student_profile.points} points!</h3>
		<p>
			Welcome to your profile!
		</p>
		<br>
		<a href="/"><button class="primary">Visit Store</button></a>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		width: 100%;
		position: relative;

		div, .card {
			min-height: fit-content;
			height: fit-content;
			flex: 0;
		}

	}
</style>
