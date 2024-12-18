import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-newsapi.onrender.com/api",
});

export const fetchAllArticles = () => {
  return api.get("/articles").then(({ data }) => data.articles);
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
