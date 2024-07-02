import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import Signup from "./comps/Signup";
import Layout from "./comps/Layout";
import Home from "./comps/Home";
import PrivateComp from "./comps/PrivateComp";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PrivateComp />}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>
      <Route path="/signup" element={<Signup />} />
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
