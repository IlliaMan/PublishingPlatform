export async function load({ fetch, params }) {
  const response = await fetch('http://localhost:3000/article-list');
  return await  {
    articleList: response.json()
  };
}