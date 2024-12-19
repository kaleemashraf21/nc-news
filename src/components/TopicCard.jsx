import { Link } from "react-router";

export const TopicCard = ({ topic }) => {
  return (
    <div className="topic-card">
      <h3>{topic.slug}</h3>
      <Link to={`/articles/${topic.slug}`} className="view-topic-link">
        View Articles
      </Link>
    </div>
  );
};
