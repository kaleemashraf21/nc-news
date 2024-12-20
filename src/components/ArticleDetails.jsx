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
import { ErrorPage } from "./ErrorPage";

export const ArticleDetails = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState("tickle122");

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [voteChange, setVoteChange] = useState(0);
  const [voteError, setVoteError] = useState(false);

  const [newComment, setNewComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [commentError, setCommentError] = useState(false);

  const [deletionError, setDeletionError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
        setError("Article Not Found");
        setLoading(false);
      });
  }, [articleId]);

  const handleVote = (updateVoteBy) => {
    setVoteError(false);
    setVoteChange((prevVoteChange) => prevVoteChange + updateVoteBy);

    updateArticleVotes(articleId, updateVoteBy).catch(() => {
      setVoteChange((prevVoteChange) => prevVoteChange - updateVoteBy);
      setVoteError(true);
    });
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handlePostComment = () => {
    if (!newComment.trim() || isPosting) return;
    setIsPosting(true);
    setCommentError(false);

    postComment(articleId, user, newComment)
      .then((postedComment) => {
        setComments((prevComments) => [postedComment, ...prevComments]);
        setNewComment("");
        setIsPosting(false);
      })
      .catch(() => {
        setCommentError(true);
        setIsPosting(false);
      });
  };

  const handleDeleteComment = (commentId) => {
    if (isDeleting) return;
    setIsDeleting(true);
    setDeletionError(false);

    deleteComment(commentId)
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== commentId)
        );
        setIsDeleting(false);
      })
      .catch(() => {
        setDeletionError(true);
        setIsDeleting(false);
      });
  };

  if (loading) return <div>Loading article...</div>;
  if (error) return <ErrorPage err={error} />;

  return (
    <article className="article-details">
      <button onClick={() => navigate("/articles")} className="back-button">
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
      {voteError && (
        <p className="connection-error">
          Failed to update vote. Please check your connection.
        </p>
      )}
      <p>
        <strong>Comments:</strong> {comments.length}
      </p>

      <section className="comments-section">
        <h2>Comments</h2>
        <div className="comment-input">
          <label htmlFor="new-comment">
            <strong>Add a comment:</strong>
          </label>
          <textarea
            id="new-comment"
            rows="3"
            cols="50"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Give your opinion..."
            required
          />
          <button
            onClick={handlePostComment}
            className="submit-comment-button"
            disabled={isPosting}
          >
            {isPosting ? "Posting..." : "Post Comment"}
          </button>
        </div>

        {commentError && (
          <p className="connection-error">
            Failed to post comment. Please check your connection.
          </p>
        )}

        {deletionError && (
          <p className="connection-error">
            Failed to delete comment. Please check your connection.
          </p>
        )}

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
                isDeleting={isDeleting}
              />
            ))}
          </ul>
        )}
      </section>
    </article>
  );
};
