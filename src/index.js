import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./component/header/Header";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Projects from "./pages/projects/Projects";
import PokeDex from "./pages/projects/pokedex/PokeDex"
import TicTacToe from "./pages/projects/tictactoe/TicTacToe";
import TicTacToeAi from "./pages/projects/tictactoe_ai/TicTacToe";

import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import "./style/icon.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/pokedex" element={<PokeDex />} />
          <Route path="/projects/tictactoe" element={<TicTacToe />} />
          <Route path="/projects/tictactoe_ai" element={<TicTacToeAi />} />
        </Routes>
      </main>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
