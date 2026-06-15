import CastMember from "./CastMember";

// "Top cast" row.
function CastList({ cast }) {
  if (!cast || cast.length === 0) return null;

  return (
    <section className="px-8 py-8">
      <h2 className="text-2xl font-bold text-white">Top cast</h2>

      <div className="mt-5 grid grid-cols-5 gap-4 sm:grid-cols-10">
        {cast.map((person) => (
          <CastMember key={person.id} person={person} />
        ))}
      </div>
    </section>
  );
}

export default CastList;