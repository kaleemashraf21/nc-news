import { useState, useEffect } from "react";
import { fetchAllArticles } from "../api";
import { ArticleCard } from "./ArticleCard";
import { useParams } from "react-router";

export const ArticlesList = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchAllArticles(topic)
      .then((articlesData) => {
        setArticles(articlesData);
        setLoading(false);
      })
      .catch(() => {
        setError("Something went wrong while fetching articles.");
        setLoading(false);
      });
  }, [topic]);

  if (loading) return <div>Loading articles...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <section className="article-list">
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </section>
  );
};