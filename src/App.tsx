import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import useDispatchWithTypes from "./hooks/useDispatchWithTypes";
import useAuth from "./hooks/useAuth";

import MainLayout from "./layouts/MainLayout";
import AuthenticatedOnly from "./layouts/AuthenticatedOnly";
import NotAuthenticatedOnly from "./layouts/NotAuthenticatedOnly";

import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import UpdateProfile from "./pages/UpdateProfile";
import Texts from "./pages/Texts";
import SingleText from "./pages/SingleText";
import Dashboard from "./pages/Dashboard";
import Results from "./pages/Results";
import Progress from "./pages/Progress";
import Leaderboard from "./pages/Leaderboard";
import Achievements from "./pages/Achievements";
import Settings from "./pages/Settings";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  const { userData, setCredentials } = useAuth();

  const dispatch = useDispatchWithTypes();

  useEffect(() => {
    if (userData) {
      dispatch(setCredentials(userData));
    }

    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    else if (!userData && localStorage.getItem("currentUser")) {
      dispatch(
        setCredentials(
          JSON.parse(localStorage.getItem("currentUser") as string)
        )
      );
    }
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
  }, [userData, dispatch, setCredentials]);

  !localStorage.getItem("playMistakeSound") &&
    localStorage.setItem("playMistakeSound", "true");

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route element={<NotAuthenticatedOnly />}>
          <Route path="/auth">
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<LogIn />} />
          </Route>
        </Route>

        <Route element={<AuthenticatedOnly />}>
          <Route path="/texts">
            <Route index element={<Texts />} />
            <Route path=":textId" element={<SingleText />} />
          </Route>

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="results" element={<Results />} />
          <Route path="progress" element={<Progress />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="achievements" element={<Achievements />} />

          <Route path="update-profile" element={<UpdateProfile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
