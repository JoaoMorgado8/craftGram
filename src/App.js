import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import LoginPage from "./pages/LoginPage";
import FeedPage from "./pages/FeedPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/feedPage"
          element={
            <IsPrivate>
              <FeedPage />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
