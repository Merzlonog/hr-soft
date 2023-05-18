import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAuthMe } from "./redux/slices/auth";
import TagsPosts from "./components/TagsPosts";

function App() {
  const dispatch = useDispatch();
  // const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []); // eslint-disable-line

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/tags/:name" element={<TagsPosts />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
