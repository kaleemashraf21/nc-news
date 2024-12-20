import { useState, useEffect } from "react";
import { fetchAllArticles } from "../api";
import { ArticleCard } from "./ArticleCard";
import { useParams, useSearchParams } from "react-router";

export const ArticlesList = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchAllArticles(topic, sortBy, order)
      .then((articlesData) => {
        setArticles(articlesData);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed To Load Articles.");
        setLoading(false);
      });
  }, [topic, searchParams]);

  const handleSortByChange = (event) => {
    const { name, value } = event.target;
    setSortBy(value);
    setSearchParams({ ...Object.fromEntries(searchParams), [name]: value });
  };

  const handleSortOrderChange = (event) => {
    const { name, value } = event.target;
    setOrder(value);
    setSearchParams({ ...Object.fromEntries(searchParams), [name]: value });
  };

  if (loading) return <div>Loading articles...</div>;
  if (error) return <ErrorPage err={error} />;

  return (
    <section className="article-list">
      <div className="sort-controls">
        <label htmlFor="sort-by-dropdown">Sort by:</label>
        <select
          id="sort-by-dropdown"
          onChange={handleSortByChange}
          name="sort_by"
          value={sortBy}
        >
          <option disabled>Relevance</option>
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>

        <label htmlFor="sort-order-dropdown">Order by:</label>
        <select
          id="sort-order-dropdown"
          onChange={handleSortOrderChange}
          name="order"
          value={order}
        >
          <option disabled>Select</option>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </section>
  );
};
