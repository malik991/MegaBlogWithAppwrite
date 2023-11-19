import React from "react";
import { Container, Logo, Logout } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  // get the status from authSlice to check user logged in or not
  const authStatus = useSelector((state) => state.authName.status);
  const userData = useSelector((state) => state.authName.userData);

  // define navigation
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "gitHub",
      slug: "/github",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow-xl ring-inherit bg-[#F3F3F3] rounded-lg mx-2 mt-2">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {userData && (
              <li className="inline-block px-6 py-2 ">
                Welcom, Mr
                <h3 className="text-lg text-green-600 font-sans font-bold">
                  {" "}
                  {userData.name}
                </h3>
              </li>
            )}
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  {/* we mention key, where html repeat in loop  */}
                  <button
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {/* we will check display logout btn ? */}
            {authStatus && (
              <li>
                <Logout />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
