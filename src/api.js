import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-newsapi.onrender.com/api",
});

export const fetchAllArticles = () => {
  return api
    .get("/articles")
    .then(({ data }) => data.articles)
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const fetchArticleById = (articleId) => {
  return api
    .get(`/articles/${articleId}`)
    .then(({ data }) => data.article)
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const fetchCommentsByArticleId = (articleId) => {
  return api
    .get(`/articles/${articleId}/comments`)
    .then(({ data }) => data.comments)
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const updateArticleVotes = (articleId, updateVoteBY) => {
  return api
    .patch(`/articles/${articleId}`, { inc_votes: updateVoteBY })
    .then(({ data }) => data.article)
    .catch((err) => {
      console.log(err);
      return err;
    });
};
