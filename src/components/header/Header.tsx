import { useLocation } from "react-router-dom";
import HeaderNavigation from "./HeaderNavigation";
import HeaderResultsPanel from "./HeaderResultsPanel";

import useAuth from "../../hooks/useAuth";

function Header() {
  const { currentUser } = useAuth();
  const location = useLocation();

  const showResultsPanel =
    currentUser &&
    ["dashboard", "texts", "results"].some((pathname) =>
      location.pathname.includes(pathname)
    );

  return (
    <header>
      <HeaderNavigation />
      {showResultsPanel && <HeaderResultsPanel />}
    </header>
  );
}

export default Header;
