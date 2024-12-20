import { useState, useEffect } from "react";
import { fetchAllTopics } from "../api";
import { TopicCard } from "./TopicCard";

export const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllTopics()
      .then((topics) => {
        setTopics(topics);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed To Load Topics");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading topics...</p>;
  if (error) return <ErrorPage err={error} />;

  return (
    <section className="topic-list">
      {topics.map((topic) => (
        <TopicCard key={topic.slug} topic={topic} />
      ))}
    </section>
  );
};
