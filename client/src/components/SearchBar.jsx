import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import { api } from "../api/client";

function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);
    const navigate = useNavigate();

  // min 2 chars
  const shouldSearch = debouncedQuery.trim().length >= 2;
  const { data, loading } = useFetch(
    () => (shouldSearch ? api.search(debouncedQuery) : Promise.resolve(null)),
    [debouncedQuery],
  );
  function goToTitle(item) {
    navigate(`/title/${item.type}/${item.id}`);
    setQuery("");
  }
  return (
    <div className="relative w-40 max-w-md sm:w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies and series..."
        className="w-full rounded-full border border-slate-700 bg-slate-800/60 px-5 py-2.5 text-sm text-slate-100 placeholder-slate-400 outline-none focus:border-emerald-400/50"
      />
      {shouldSearch && (
        <div className="absolute z-50 mt-2 max-h-96 w-full overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-2 shadow-xl scrollbar-kiwi">
          {loading && (
            <p className="p-3 text-sm text-slate-400">Searching...</p>
          )}

          {data && data.length === 0 && (
            <p className="p-3 text-sm text-slate-400">
              No results for "{debouncedQuery}".
            </p>
          )}

          {data && data.length > 0 && (
            <>
              <p className="px-3 py-2 text-xs uppercase text-slate-500">
                {data.length} results for "{debouncedQuery}"
              </p>
              {data.map((item) => (
                <button
                  key={`${item.type}-${item.id}`}
                  onClick={() => goToTitle(item)}
                  className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-slate-800"
                >
                  {/* mini poster or gradient */}
                  <div className="h-16 w-12 shrink-0 overflow-hidden rounded-md bg-gradient-to-br from-emerald-600 to-emerald-800">
                    {item.poster && (
                      <img
                        src={item.poster}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100">{item.title}</p>
                    <p className="text-xs text-slate-400">
                      ★ {item.rating} ·{" "}
                      {item.type === "tv" ? "Series" : "Movie"} · {item.year}
                    </p>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;