import { useState } from "react";
import "./Navbar.css";
import menu from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";
import jack from "../../assets/jack.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setSidebar }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/search/${query}`);
    }
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img
          src={menu}
          alt=""
          className="menu-icon"
          onClick={() => setSidebar((prev) => (prev === false ? true : false))}
        />
        <Link to={"/"}>
          <img src={logo} alt="" className="logo" />
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input
            type="text"
            placeholder="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <img src={search_icon} alt="" onClick={handleSearch} />
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notification_icon} alt="" />
        <img src={jack} alt="" className="user-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
