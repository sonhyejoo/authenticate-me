import { Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { restoreUser } from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);
  return (
    <>
      <div>
        <Navigation />
      </div>
      <Switch>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
