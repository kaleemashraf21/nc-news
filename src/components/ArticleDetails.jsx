import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { fetchArticleById } from "../api";

export const ArticleDetails = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchArticleById(articleId)
      .then((articleData) => {
        setArticle(articleData);
        setLoading(false);
      })
      .catch(() => {
        setError("Something went wrong while fetching the article.");
        setLoading(false);
      });
  }, [articleId]);

  if (loading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <article className="article-details">
      <button onClick={() => navigate("/")} className="back-button">
        Back to Articles
      </button>
      <h1>{article.title}</h1>
      <img src={article.article_img_url} alt={article.title} />
      <p className="article-body">{article.body}</p>
      <p>
        <strong>Author:</strong> {article.author}
      </p>
      <p>
        <strong>Published on:</strong>{" "}
        {new Date(article.created_at).toLocaleDateString()}
      </p>
      <p>
        <strong>Votes:</strong> {article.votes}
      </p>
      <p>
        <strong>Comments:</strong> {article.comment_count}
      </p>
    </article>
  );
};
