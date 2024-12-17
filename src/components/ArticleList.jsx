import { useState, useEffect } from "react";
import { fetchAllArticles } from "../api";
import { ArticleCard } from "./ArticleCard";

export const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchAllArticles()
      .then((articlesData) => {
        setArticles(articlesData);
        setLoading(false);
      })
      .catch(() => {
        setError("Something went wrong while fetching articles.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading articles...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="article-list">
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </section>
  );
};
