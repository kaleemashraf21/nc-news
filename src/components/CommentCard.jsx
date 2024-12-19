export const CommentCard = ({ comment, onDelete, currentUser, isDeleting }) => {
  const handleDelete = () => {
    if (comment.author === currentUser) {
      onDelete(comment.comment_id);
    }
  };

  return (
    <li className="comment-card">
      <p>{comment.body}</p>
      <p className="comment-data">
        <strong>Author:</strong> {comment.author} | <strong>Posted on:</strong>{" "}
        {new Date(comment.created_at).toLocaleDateString()}
      </p>
      {comment.author === currentUser && (
        <button
          onClick={handleDelete}
          className="delete-comment-button"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete Comment"}
        </button>
      )}
    </li>
  );
};
