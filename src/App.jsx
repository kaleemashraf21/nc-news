import { Route, Routes } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ArticlesList } from "./components/ArticlesList";
import { ArticleDetails } from "./components/ArticleDetails";
import { Topics } from "./components/Topics";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles/:topic" element={<ArticlesList />} />
        <Route path="/articles-byId/:articleId" element={<ArticleDetails />} />
        <Route path="/topics" element={<Topics />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
