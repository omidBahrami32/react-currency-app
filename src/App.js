import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Header from "./components/header/Header";
import Coin from "./pages/Coin";
import { makeStyles } from "@material-ui/core";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/coins/:id",
    element: <Coin />,
  },
]);

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.App}>
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
