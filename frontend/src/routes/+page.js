import { get } from 'svelte/store';
import { isAuthenticated, userEmail } from '../stores.js';

export async function load({ fetch }) {
  let articles = [];
  let articlesSideSectionLeft = [];
  let articlesSideSectionRight = [];

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

  if(!get(isAuthenticated)) {
    articlesSideSectionLeft = shuffle(articles.slice(0)).splice(0, 5);
    articlesSideSectionRight = shuffle(articles.slice(0)).splice(0, 5);
  } else {
    response = await fetch(`http://localhost:3000/users/following/list/${get(userEmail)}`);
    response = await response.json();
    const followingList = response.following;
    const recentArticles = articles.slice(0).sort((a, b) => new Date(b.date) - new Date(a.date));
    const articlesFromFollowing = recentArticles.filter(article => followingList.includes(article.email));
    const length = articlesFromFollowing.length;
    for (let i = 0; i < 10; i++) {
      if (i < 5) {
        articlesSideSectionLeft.push(recentArticles[i % length])
      } else if (i < 10) {
        articlesSideSectionRight.push(recentArticles[i % length]);
      }
    }
  }

  console.log(articles);
  return {
    articles,
    articlesSideSectionLeft,
    articlesSideSectionRight
  };
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex > 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
