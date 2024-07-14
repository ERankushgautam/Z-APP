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
import Profile from "./comps/Profile";
import UserProfile from "./comps/UserProfile";
import Post from "./comps/Post";
import Comments from "./comps/Comments";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PrivateComp />}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post" element={<Post />} />
          <Route path="/user-profile/:id" element={<UserProfile />} />
          <Route path="/comments/:id" element={<Comments />} />
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
