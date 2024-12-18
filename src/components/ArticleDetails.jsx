import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import {
  fetchArticleById,
  fetchCommentsByArticleId,
  updateArticleVotes,
  postComment,
  deleteComment,
} from "../api";
import { CommentCard } from "../components/CommentCard";

export const ArticleDetails = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState("tickle122");

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voteError, setVoteError] = useState(null);
  const [voteChange, setVoteChange] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [deletingCommentId, setDeletingCommentId] = useState(null);

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
        setError("Failed to load article or comments. Please try again.");
        setLoading(false);
      });
  }, [articleId]);

  const handleVote = (updateVoteBy) => {
    setVoteError(null);
    setVoteChange((prevVoteChange) => prevVoteChange + updateVoteBy);

    updateArticleVotes(articleId, updateVoteBy).catch(() => {
      setVoteChange((prevVoteChange) => prevVoteChange - updateVoteBy);
      setVoteError("Failed to update vote. Please check your connection.");
    });
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;

    postComment(articleId, user, newComment)
      .then((postedComment) => {
        setComments((prevComments) => [postedComment, ...prevComments]);
        setNewComment("");
      })
      .catch(() => {
        setError("Failed to post the comment. Please try again.");
      });
  };

  const handleDeleteComment = (commentId) => {
    setDeletingCommentId(commentId);

    deleteComment(commentId)
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== commentId)
        );
      })
      .catch(() => {
        setError("Failed to delete comment. Please try again.");
        setDeletingCommentId(null);
      });
  };

  if (loading) return <div>Loading article...</div>;

  if (error) return <div>{error}</div>;

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
      {voteError && <p className="error-message">{voteError}</p>}
      <p>
        <strong>Comments:</strong> {comments.length}
      </p>

      <section className="comments-section">
        <h2>Comments</h2>
        <div className="comment-input">
          <label htmlFor="new-comment">Add a comment:</label>
          <textarea
            id="new-comment"
            rows="3"
            cols="50"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Write a comment..."
          />
          <button onClick={handlePostComment} className="submit-comment-button">
            Post Comment
          </button>
        </div>

        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <ul className="comments-list">
            {comments.map((comment) => (
              <CommentCard
                key={comment.comment_id}
                comment={comment}
                onDelete={handleDeleteComment}
                currentUser={user}
              />
            ))}
          </ul>
        )}
      </section>
    </article>
  );
};
