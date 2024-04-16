type Props = {
  article: Array<string>;
};

function ArticleBody({ article }: Props) {
  return (
    <div className="text-lg flex flex-col gap-4">
      {
        article.map(paragraph => <p>{paragraph}</p>)
      }
    </div>
  );
}

export default ArticleBody;