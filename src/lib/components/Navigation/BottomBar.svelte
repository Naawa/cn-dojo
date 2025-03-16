<script>
	import { enhance } from '$app/forms';
	import { navItems } from './data';
	import { page } from '$app/state';
</script>

<nav class="bordered">
	<div>
		{#each navItems as navItem}
			<a class:active={page.url.pathname == navItem.url} href={navItem.url}
				><b>
					{navItem.text.charAt(0)}
				</b></a
			>
		{/each}
		<form method="post" action="/dashboard?/logout" use:enhance>
			<button class="danger-btn"> <b>L</b> </button>
		</form>
	</div>
</nav>

<style>
	nav {
		padding: 1em 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 10vh;

		div {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 0.5em;
			a {
				display: flex;
				justify-content: center;
				align-items: center;
				text-decoration: none;
				transition: all 0.2s;
				height: 3em;
				width: 3em;
				border-radius: 0.4em;
				border: solid 0.16em rgba(255, 255, 255, 0.393);
				text-align: center;
				b {
					transition: all 0.2s;
				}
			}
			a:hover,
			.active {
				transition: all 0.2s;
				background-color: rgba(0, 123, 227, 1);
				b {
					transition: all 0.2s;
					color: white;
				}
			}
			form {
				height: 3em;
				width: 3em;
				padding: 0;

				button {
					min-width: 3em;
					padding: 0;
					height: 3em;
					width: 3em;
					b {
						color: white;
					}
				}
				button:hover {
					color: #ca0d0d;
				}
			}
		}
	}
</style>
