export async function load({ fetch, params }) {
  const response = await fetch('http://localhost:3000/articles/');
  return await  {
    articleList: response.json()
  };
}