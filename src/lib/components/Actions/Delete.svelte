<script lang="ts">
	import { page } from "$app/state";

	let { action, object } = $props();
	let showConfirmRequest = $state(false);
</script>

<button class="danger-btn" onclick={() => (showConfirmRequest = true)}>Delete</button>
{#if showConfirmRequest}
	<form class="bordered" method="post" action="{page.url.pathname}?/{action}">
		<b>Are you sure you want to delete this {object}?</b>
		<span>
			<button class="danger-btn" type="submit"
				>Confirm</button
			>
			<button type="reset" onclick={() => (showConfirmRequest = false)}>No</button>
		</span>
	</form>
{/if}

<style>
	form {
		display: flex;
		flex-direction: column;
        align-items: center;
        justify-content: center;
		position: absolute;
		height: 100%;
		width: 100%;
		background-color: #fcfdff;
        gap: 1em;

        span {
            display: flex;
            gap: 1em;
        }
	}
</style>
