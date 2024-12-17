export const CommentCard = ({ comment }) => {
  return (
    <li className="comment-card">
      <p>
        <strong>{comment.author}</strong>:
      </p>
      <p>{comment.body}</p>
      <p className="comment-data">
        Votes: {comment.votes} | Posted on:{" "}
        {new Date(comment.created_at).toLocaleString()}
      </p>
    </li>
  );
};
