import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLogout } from "./features/auth/authSlice";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Articles } from "./components/Articles/Articles";
import { RegisterOrLoginModal } from "./components/utils/RegisterOrLoginModal";

function App() {
  const { isLoggedIn, username, id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showRegisterOrLoginModal, setShowRegisterOrLoginModal] = useState(
    false
  );
  const location = useLocation();
  const axiosInstance = axios.create({
    withCredentials: true,
  });
  useEffect(() => {
    const get = async () => {
      axiosInstance.get("http://localhost:8000/").then((res) => {
        if (res.status === 200 && res.data.isLoggedIn)
          dispatch(setLogin({ id: res.data.id, username: res.data.username }));
        else dispatch(setLogout());
      });
    };

    get();
  }, []);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/articles">
                Articles
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Users
              </Link>
            </li>

            {!isLoggedIn ? (
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            ) : null}
            {!isLoggedIn ? (
              <li
                className="nav-item"
                onClick={() => setShowRegisterOrLoginModal(true)}
              >
                <Link className="nav-link">login</Link>
              </li>
            ) : null}

            {isLoggedIn ? (
              <li className="nav-item">
                <Link className="nav-link" to="/logout">
                  logout
                </Link>
              </li>
            ) : null}
          </ul>

          {isLoggedIn ? (
            <div>
              <Link to="/create_artilces" className="btn btn-primary btn-sm ">
                create article
              </Link>
            </div>
          ) : null}
          {isLoggedIn && username != "" ? (
            <div>
              <Link
                className="btn btn-outline-light btn-sm"
                to={`/users/${id}`}
              >
                hello {username}
              </Link>
            </div>
          ) : null}
        </div>
      </nav>

      {location.pathname === "/" ? (
        <div className="container mt-2">
          <div className="row mt-4">
            <Articles />
          </div>
        </div>
      ) : (
        <Outlet />
      )}

      {showRegisterOrLoginModal ? (
        <RegisterOrLoginModal hide={setShowRegisterOrLoginModal} />
      ) : null}
    </div>
  );
}

export default App;
