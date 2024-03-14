import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import SingleBlogPage from "./pages/SingleBlogPage";
import PrivateRoutes from "./routes/PrivateRoutes";
import CreateBlogPage from "./pages/CreateBlogPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateBlogContainer from "./components/UpdateBlogContainer/UpdateBlogContainer";

function App() {
  return (
    <>
      {" "}
      <Header />
      <Routes>
        <Route element={<PrivateRoutes />}>
          {" "}
          <Route element={<CreateBlogPage />} path="/create-blog" />
          <Route
            element={<UpdateBlogContainer />}
            path="/update-blog/:blogId"
          />
        </Route>

        <Route element={<ProfilePage />} path="/profile/:profileId" />
        <Route element={<HomePage />} path="/" exact />
        <Route element={<SingleBlogPage />} path="/blogs/:blogId" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegistrationPage />} path="/register" />

        {/* <Route element={<NotFoundPage />} path="*" /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
