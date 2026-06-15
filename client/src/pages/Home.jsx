import { useFetch } from "../hooks/useFetch";
import { api } from "../api/client";
import Section from "../components/Section";
import TrendingSection from "../components/TrendingSection";
import Hero from "../components/Hero";

function Home() {
  const hero = useFetch(() => api.hero());
  const popularMovies = useFetch(() => api.popularMovies());
  const popularSeries = useFetch(() => api.popularSeries());
  const upcoming = useFetch(() => api.upcoming());

  return (
    <div className="px-4 py-6 sm:px-8">
      {hero.data && <Hero item={hero.data} />}

      <TrendingSection />

      <Section
        title="Popular"
        subtitle="Movies"
        items={popularMovies.data}
        loading={popularMovies.loading}
        error={popularMovies.error}
      />
      <Section
        title="Popular"
        subtitle="Series"
        items={popularSeries.data}
        loading={popularSeries.loading}
        error={popularSeries.error}
      />
      <Section
        title="Upcoming"
        subtitle="Coming soon"
        items={upcoming.data}
        loading={upcoming.loading}
        error={upcoming.error}
      />
    </div>
  );
}

export default Home;
