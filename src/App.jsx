import { Route, Routes } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ArticleList } from "./components/ArticleList";
import { ArticleDetails } from "./components/ArticleDetails";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:articleId" element={<ArticleDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
