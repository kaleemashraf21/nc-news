import { Route, Routes } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ArticleList } from "./components/ArticleList";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
