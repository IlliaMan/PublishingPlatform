<script>
	import { page } from '$app/stores';
</script>


<h1>{$page.status}</h1>
<h2>{$page.error.message}</h2>
<div>
	<a href="/">Go to Main</a>
	<a href="/login">Go to Login</a>
</div>


<style>
	h1 {
		color: #fff;
		font-size: 4rem;
		margin: 0;
		padding-top: 4rem;
	}

	h1, h2 {
		color: #fff;
		text-align: center;
	}

	div {
		color: #fff;
		display: block;
		text-align: center;
		font-size: 1.5rem;
	}

	div a {
		margin: 1rem;
	}
</style>