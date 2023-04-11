import { useState, useEffect } from "react";
import { logout } from "../../store/session";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  let username;
  let email;

  if (user && Object.keys(user).length > 0) {
    ({ username, email } = user);
  }

  useEffect(() => {
    if (!showMenu) {
      return;
    }
    function closeMenu() {
      setShowMenu(false);
    }
    if (showMenu) {
      document.addEventListener("click", closeMenu);
    }
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [showMenu]);

  const openMenu = () => {
    console.log(showMenu);
    setShowMenu(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    <Redirect to="/login" />;
  };

  return (
    <>
      <button style={{ fontSize: "30px" }} onClick={openMenu}>
        <i className="fas fa-user"></i>
      </button>
      {showMenu && (
        <ul>
          <li>{username}</li>
          <li>{email}</li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      )}
    </>
  );
};

export default ProfileButton;
