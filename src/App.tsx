import { useContext, useEffect } from "react";

import Navigation from "./components/navigation";
import Login from "./screens/login";
import { authContext } from "./contexts/authContext";

function App() {
  const { isLogged, signInPersistent } = useContext(authContext);

  useEffect(() => {
    signInPersistent?.();
  }, []);

  return (
    <div className="w-screen h-screen">
      {isLogged ? <Navigation /> : <Login />}
    </div>
  );
}

export default App;
