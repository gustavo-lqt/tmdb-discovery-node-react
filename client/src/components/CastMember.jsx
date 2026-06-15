// One cast member: round photo, name, and character.
function CastMember({ person }) {
  const { name, character, photo } = person;

  return (
    <div className="w-28 shrink-0 text-center">
      <div className="mx-auto h-28 w-28 overflow-hidden rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800">
        {photo && (
          <img src={photo} alt={name} className="h-full w-full object-cover" />
        )}
      </div>

      <p className="mt-3 text-sm font-semibold text-slate-100">{name}</p>
      <p className="text-xs text-slate-400">{character}</p>
    </div>
  );
}

export default CastMember;