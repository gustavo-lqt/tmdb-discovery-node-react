import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { api } from "../api/client";
import Card from "./Card";

function TrendingSection() {
  const [type, setType] = useState("movie");

  const { data, loading, error } = useFetch(() => api.trending(type), [type]);

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <h2 className="text-2xl font-bold text-slate-100">Trending</h2>
          <span className="text-slate-400">Trending Today</span>
        </div>

        {/* Toggle */}
<div className="flex gap-1 rounded-full border border-slate-400/20 bg-[#131c30] p-1">
  <button
    onClick={() => setType("movie")}
    className={`rounded-full px-4 py-1.5 text-[13px] font-bold transition-all duration-150 ${
      type === "movie"
        ? "bg-emerald-500 text-[#052e16]"
        : "text-slate-400 hover:text-slate-200"
    }`}
  >
    Movies
  </button>
  <button
    onClick={() => setType("tv")}
    className={`rounded-full px-4 py-1.5 text-[13px] font-bold transition-all duration-150 ${
      type === "tv"
        ? "bg-emerald-500 text-[#052e16]"
        : "text-slate-400 hover:text-slate-200"
    }`}
  >
    Series
  </button>
</div>
      </div>

      {loading && <p className="text-slate-400">Loading...</p>}
      {error && <p className="text-red-400">Couldn't load trending.</p>}

      {data && (
<div className="flex gap-4 overflow-x-auto pb-2 scrollbar-kiwi">
          {data.map((item) => (
            <Card key={`${item.type}-${item.id}`} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

export default TrendingSection;
