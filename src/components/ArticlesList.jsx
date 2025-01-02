import { useState, useEffect } from "react";
import { fetchAllArticles } from "../api";
import { ArticleCard } from "./ArticleCard";
import { useParams, useSearchParams } from "react-router";
import { ErrorPage } from "./ErrorPage";

export const ArticlesList = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [limit] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchAllArticles(topic, sortBy, order, limit, page)
      .then((response) => {
        const articlesData = response.articlesData;
        const totalCount = response.total_count;
        setArticles(articlesData);
        setTotalCount(totalCount);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed To Load Articles.");
        setLoading(false);
      });
  }, [topic, sortBy, order, limit, page, searchParams]);

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

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalCount / limit)) {
      setPage(newPage);
    }
  };

  if (loading) return <div>Loading articles...</div>;
  if (error) return <ErrorPage err={error} />;

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <>
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
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};
