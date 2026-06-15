import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { api } from "../api/client";
import CastList from "../components/CastList";

function Detail() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(
    () => api.detail(type, id),
    [type, id],
  );

  if (loading) return <p className="p-8 text-slate-400">Loading...</p>;
  if (error)
    return <p className="p-8 text-red-400">Couldn't load this title.</p>;
  if (!data) return null;

  const {
    title,
    about,
    rating,
    date,
    cover,
    poster,
    genres,
    runtime,
    seasons,
    episodes,
  } = data;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <div className="mt-6">
      {/* Cover background */}
      <div
        className="relative min-h-[620px] overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950"
        style={
          cover
            ? {
                backgroundImage: `url(${cover})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div className="absolute inset-0 bg-slate-950/70" />

        <div className="relative px-4 py-6 sm:px-8">
          <button
            onClick={() => navigate(-1)}
            className="rounded-full bg-slate-900/70 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            ← Back
          </button>

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:gap-8">
            {/* Poster placeholder (uses cover or gradient) */}
            {poster ? (
              <img
                src={poster}
                alt={title}
                className="h-64 w-44 shrink-0 rounded-2xl object-cover shadow-lg sm:h-96 sm:w-64"
              />
            ) : (
              <div className="h-72 w-48 shrink-0 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-lg" />
            )}

            {/* Info */}
            <div className="pt-4">
              <span className="rounded-md border border-emerald-400/40 px-3 py-1 text-xs font-semibold text-emerald-300">
                {type === "tv" ? "SERIES" : "MOVIE"}
              </span>

              <h1 className="mt-4 text-2xl font-extrabold text-white sm:text-5xl">
                {title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-slate-300">
                <span className="text-lg font-bold text-white">
                  ⭐ {rating}/10
                </span>
                <div>
                  <p className="text-xs uppercase text-slate-400">Release</p>
                  <p className="font-semibold text-white">{formattedDate}</p>
                </div>

                {genres && genres.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {genres.map((g) => (
                      <span
                        key={g}
                        className="rounded-full bg-slate-800 px-4 py-1 text-sm text-slate-200"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Meta: runtime (movie) OR seasons + episodes (series) */}
              <div className="mt-4 flex items-center gap-3">
                {type === "tv" ? (
                  <>
                    {seasons && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
                        {seasons} Season{seasons > 1 ? "s" : ""}
                      </span>
                    )}
                    {episodes && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200">
                        {episodes} Episodes
                      </span>
                    )}
                  </>
                ) : (
                  runtime && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
                      {Math.floor(runtime / 60)}h {runtime % 60}min
                    </span>
                  )
                )}
              </div>
              {about && (
                <p className="mt-6 max-w-2xl leading-relaxed text-slate-300">
                  {about}
                </p>
              )}
            </div>
          </div>
          {/* Cast */}
          <CastList cast={data.cast} />
        </div>
      </div>
    </div>
  );
}

export default Detail;
