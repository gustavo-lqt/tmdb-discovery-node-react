import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-emerald-500/20 px-4 py-4 sm:px-8">
      <Link to="/">
        <h1 className="text-xl font-bold text-emerald-400 sm:text-2xl">
          Kiwi<span className="text-slate-100">Cine</span> 🥝
        </h1>
      </Link>
      <SearchBar />
    </header>
  );
}

export default Header;
