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
