import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser && Object.keys(sessionUser).length !== 0) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPass) {
      return dispatch(
        signUp({
          username,
          email,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };
  return (
    <>
      <h1>Sign Up</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <ul className="form-group">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password: </label>
          <input
            type="password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          />
        </div>
        <button>Sign Up</button>
      </form>
    </>
  );
};

export default SignupFormPage;
