<script>
	import BottomBar from "$lib/components/Navigation/BottomBar.svelte";
	import SideBar from "$lib/components/Navigation/SideBar.svelte";

	
</script>

<div>
	<span class="side-nav"><SideBar></SideBar></span>
	<div class="bordered">
		<slot />
	</div>
	<span class="bottom-nav"><BottomBar></BottomBar></span>
</div>

<style>
	div {
		display: flex;
		position: relative;
		height: 100vh;
		gap: 1em;
		padding: 1em;

		div {
			flex-direction: column;
			position: relative;
			width: 100%;
			height: 100%;
		}
	}
	.side-nav {
		display: flex;
	}
	.bottom-nav {
		display: none;
		bottom: 0;
		width: 100;
		background-color: #fcfdff;
		z-index: 1;
	}

	@media (width < 1600px) {
		.side-nav {
			display: none;
		}
		.bottom-nav {
			display: flex;
		}
		div {
			flex-direction: column;
			div {
				max-height: calc(90vh - 3em);
				margin-left: 0;
			}
		}
	}
</style>
