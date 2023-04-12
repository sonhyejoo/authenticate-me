import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import "./LoginForm.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [cred, setCred] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState([]);

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
      <form className="login-form" onSubmit={handleSubmit}>
        <ul className="form-group">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="form-group">
          <label htmlFor="credential">Credential: </label>
          <input type="text" value={cred} onChange={updateCred} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input type="password" value={pass} onChange={updatePass} />
        </div>
        <button>Log In</button>
      </form>
    </>
  );
};

export default LoginForm;
