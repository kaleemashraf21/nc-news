import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import {
  fetchArticleById,
  fetchCommentsByArticleId,
  updateArticleVotes,
} from "../api";
import { CommentCard } from "../components/CommentCard";

export const ArticleDetails = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voteChange, setVoteChange] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      fetchArticleById(articleId),
      fetchCommentsByArticleId(articleId),
    ])
      .then(([articleData, commentsData]) => {
        setArticle(articleData);
        setComments(commentsData);
        setLoading(false);
      })
      .catch(() => {
        setError(
          "Something went wrong while fetching the article or comments."
        );
        setLoading(false);
      });
  }, [articleId]);

  const handleVote = (updateVoteBy) => {
    setVoteChange((currVotes) => currVotes + updateVoteBy);

    updateArticleVotes(articleId, updateVoteBy).catch(() => {
      setVoteChange((currVotes) => currVotes - updateVoteBy);
    });
  };

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
        <strong>Votes:</strong> {article.votes + voteChange}
        <button onClick={() => handleVote(1)} className="vote-button">
          👍
        </button>
        <button onClick={() => handleVote(-1)} className="vote-button">
          👎
        </button>
      </p>
      <p>
        <strong>Comments:</strong> {article.comment_count}
      </p>

      <section className="comments-section">
        <h2>Comments</h2>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <ul className="comments-list">
            {comments.map((comment) => (
              <CommentCard key={comment.comment_id} comment={comment} />
            ))}
          </ul>
        )}
      </section>
    </article>
  );
};
