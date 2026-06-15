import Card from "./Card";

// A titled horizontal row of cards.

function Section({ title, subtitle, items, loading, error }) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-baseline gap-3">
        <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
        {subtitle && <span className="text-slate-400">{subtitle}</span>}
      </div>

      {loading && <p className="text-slate-400">Loading...</p>}
      {error && <p className="text-red-400">Couldn't load this section.</p>}

      {items && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-kiwi">
          {items.map((item) => (
            <Card key={`${item.type}-${item.id}`} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Section;
