<script>
	import Header from './Header.svelte';
	import ForgotPage from './ForgotPage.svelte';
	import Login from './Login.svelte';
	import SignUpPage from './SignUpPage.svelte';
	import SubscribePage from './SubscribePage.svelte';
	import MainPage from './MainPage.svelte';
	import ArticlePage from './ArticlePage.svelte';
	import UserPage from './UserPage.svelte';
	import EditArticlePage from './EditArticlePage.svelte';

	let pages = {
		login: 0,
		userPage: 1,
		forgotPage: 2,
		mainPage: 3,
		artilePage: 4,
		subscribePage: 5,
		signupPage: 6,
		editArticlePage: 7
	};
	
	let activePage = pages.mainPage;
</script>

<main>
	<Header />
	{#if activePage === pages.mainPage}
    <MainPage />
  {:else if activePage === pages.login}
    <Login />
	{:else if activePage === pages.userPage}
    <UserPage />
	{:else if activePage === pages.forgotPage}
    <ForgotPage />
	{:else if activePage === pages.artilePage}
    <ArticlePage />
	{:else if activePage === pages.subscribePage}
    <SubscribePage />
	{:else if activePage === pages.signupPage}
    <SignUpPage />
	{:else if activePage === pages.editArticlePage}
    <EditArticlePage />
  {/if}

	<footer>
		{#each Object.keys(pages) as page}
			<button
        on:click={() => {
          activePage = pages[page];
        }}
      >
        {page}
      </button>
		{/each}
	</footer>
</main>

<style>
	main {
		text-align: center;
		padding: 0;
		margin: 0;
	}

	footer {
		position: fixed;
		width: 100%;
		min-height: 3rem;
		background-color: #ddd;
		bottom: 0rem;
	}
	
	button {
		min-height: 3rem;
		min-width: 5rem;
	}
</style>