import { Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { restoreUser } from "./store/session";
import LoginFormPage from "./components/LoginFormPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);
  return (
    <>
      <Switch>
        <Route exact path="/">
          <h1>Hello from App</h1>
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
