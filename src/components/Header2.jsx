import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faSignOutAlt
  
} from "@fortawesome/free-solid-svg-icons";

export default function Header2({ username }) {
  return (
    <div className="flex justify-between items-center py-6 px-8 bg-white ">
      <Link to="/MainLayout">
        <img className="w-40 h-15" src="/logo.png" alt="Logo" />
      </Link>
      <ul className="flex space-x-4 list-none items-center">
        <li className="text-black text-xl font-bold font-josefin-sans italic bg-gray-100 px-4 py-2 rounded-lg shadow-sm">
          Logged in as, <span className="text-purple-600">{username}</span>
        </li>
        <Link to="/MainLayout">
      <button>
        <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} />
        Log out
      </button>
    </Link>
      </ul>
    </div>
  );
}
