import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-newsapi.onrender.com/api",
});

export const fetchAllArticles = (
  topic,
  sort_by,
  order,
  limit = 10,
  page = 1
) => {
  return api
    .get("/articles", { params: { topic, sort_by, order, limit, page } })
    .then(({ data }) => {
      return {
        articlesData: data.articles,
        total_count: data.total_count,
      };
    });
};

export const fetchAllTopics = () => {
  return api.get("/topics").then(({ data }) => data.topics);
};

export const fetchArticleById = (articleId) => {
  return api.get(`/articles/${articleId}`).then(({ data }) => data.article);
};

export const fetchCommentsByArticleId = (articleId) => {
  return api
    .get(`/articles/${articleId}/comments`)
    .then(({ data }) => data.comments);
};

export const updateArticleVotes = (articleId, updateVoteBY) => {
  return api
    .patch(`/articles/${articleId}`, { inc_votes: updateVoteBY })
    .then(({ data }) => data.article);
};

export const postComment = (articleId, username, body) => {
  return api
    .post(`/articles/${articleId}/comments`, {
      username,
      body,
    })
    .then(({ data }) => data.comment);
};

export const deleteComment = (commentId) => {
  return api.delete(`/comments/${commentId}`);
};
