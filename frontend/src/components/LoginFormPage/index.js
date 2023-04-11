import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { Redirect } from "react-router-dom";

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const [cred, setCred] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) {
    return <Redirect to="/" />;
  }

  const updateCred = (e) => setCred(e.target.value);
  const updatePass = (e) => setPass(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(login({ credential: cred, password: pass })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div>
          <label htmlFor="credential">
            Credential:
            <input type="text" value={cred} onChange={updateCred} />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input type="password" value={pass} onChange={updatePass} />
          </label>
        </div>
        <button>Log In</button>
      </form>
    </>
  );
};

export default LoginFormPage;
