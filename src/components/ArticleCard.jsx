import { Link } from "react-router";

export const ArticleCard = ({ article }) => {
  return (
    <article className="article-card">
      <img
        src={article.article_img_url}
        alt={article.title}
        className="article-image"
      />
      <div className="article-content">
        <h3 className="article-title">
          <Link to={`/articles-byId/${article.article_id}`}>
            {article.title}
          </Link>
        </h3>
        <p className="article-data">
          <span>By: {article.author}</span>
          <br></br>
          <span>
            Published on: {new Date(article.created_at).toLocaleDateString()}
          </span>{" "}
        </p>
        <Link
          to={`/articles-byId/${article.article_id}`}
          className="view-article-link"
        >
          View Full Article
        </Link>
      </div>
    </article>
  );
};
