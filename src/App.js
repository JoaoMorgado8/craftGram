import "./App.css";
import NavbarComp from "./components/NavbarComp";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import LoginPage from "./pages/LoginPage";
import FeedPage from "./pages/FeedPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import EditProjectPage from "./pages/EditProjectPage";

function App() {
  return (
    <div className="App">
      <NavbarComp />
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

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/projects/:projectId"
          element={
            <IsPrivate>
              <ProjectDetailsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/projects/edit/:projectId"
          element={
            <IsPrivate>
              <EditProjectPage />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
