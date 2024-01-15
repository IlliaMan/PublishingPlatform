export async function load({ fetch }) {
  let articles = [];

  let response = await fetch('http://localhost:3000/articles/');
  articles = await response.json();
  articles.sort((a, b) => b.likes.length - a.likes.length);

  await Promise.all(articles.map(async (article, index) => {
    response = await fetch(`http://localhost:3000/users/icon/${article.email}`);
    response = await response.json();
    articles[index].icon = response.icon;
  }));

  await Promise.all(articles.map(async (article, index) => {
    response = await fetch(`http://localhost:3000/users/username/${article.email}`);
    response = await response.json();
    articles[index].username = response.username;
  }));

  return {
    articles,
  };
}