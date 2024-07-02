import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import PrivateComp from "./comps/PrivateComp";
import Layout from "./comps/Layout";
import Home from "./comps/Home";

import Signup from "./comps/Signup";
import Login from "./comps/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PrivateComp />}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
