import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import ProfileButton from "./ProfileButton";

const Navigation = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (sessionUser && Object.keys(sessionUser).length !== 0) {
      setShowProfile(true);
    } else setShowProfile(false);
  }, [sessionUser]);

  return (
    <ul>
      {showProfile && (
        <li>
          <ProfileButton />
        </li>
      )}
      {!showProfile && (
        <>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Sign Up</NavLink>
          </li>
        </>
      )}
      {showProfile && (
        <li>
          <NavLink to="/logout">Logout</NavLink>
        </li>
      )}
    </ul>
  );
};

export default Navigation;
