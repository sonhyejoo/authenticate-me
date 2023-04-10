import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const [cred, setCred] = useState("");
  const [pass, setPass] = useState("");

  const updateCred = (e) => setCred(e.target.value);
  const updatePass = (e) => setPass(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      credential: cred,
      password: pass,
    };
    return dispatch(login(user));
  };

  return (
    <>
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor="credential">Credential: </label>
          <input type="text" value={cred} onChange={updateCred} />
          {/* Credential {"(Username or Email)"} */}
        </div>
        <div>
          <label htmlFor="password">Password: </label>

          <input type="password" value={pass} onChange={updatePass} />
        </div>
      </form>
    </>
  );
};

export default LoginFormPage;
