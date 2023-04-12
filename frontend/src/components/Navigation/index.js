import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import LoginFormModal from "../LoginFormModal";

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
    <div className="navbar">
      {showProfile && <ProfileButton user={sessionUser} />}
      {!showProfile && (
        <ul>
          <li className="button">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="button">
            <LoginFormModal />
          </li>
          <li className="button">
            <NavLink to="/signup">Sign Up</NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
