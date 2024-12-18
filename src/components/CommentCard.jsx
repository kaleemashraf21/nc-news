export const CommentCard = ({ comment, onDelete, currentUser }) => {
  const handleDeleteClick = () => {
    if (comment.author === currentUser) {
      onDelete(comment.comment_id);
    }
  };

  return (
    <li className="comment-card">
      <p>{comment.body}</p>
      <p>
        <strong>Posted by:</strong> {comment.author}
      </p>
      <p>
        <small>{new Date(comment.created_at).toLocaleDateString()}</small>
      </p>
      {comment.author === currentUser && (
        <button onClick={handleDeleteClick} className="delete-comment-button">
          Delete
        </button>
      )}
    </li>
  );
};
