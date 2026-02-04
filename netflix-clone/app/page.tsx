import { Navbar } from "@/components/navbar";
import { HeroBanner } from "@/components/hero-banner";
import { ContentRow } from "@/components/content-row";
import { TopTenRow } from "@/components/top-ten-row";
import { Footer } from "@/components/footer";

// Sample movie data
const trendingNow = [
  {
    id: 1,
    title: "The Last Guardian",
    imageUrl: "/images/movie-1.jpg",
    year: "2026",
    rating: "TV-MA",
    duration: "2h 15m",
    match: 97,
    genres: ["Action", "Thriller", "Drama"],
  },
  {
    id: 2,
    title: "Beyond the Stars",
    imageUrl: "/images/movie-2.jpg",
    year: "2025",
    rating: "PG-13",
    duration: "2h 30m",
    match: 94,
    genres: ["Sci-Fi", "Adventure"],
  },
  {
    id: 3,
    title: "Eternal Shores",
    imageUrl: "/images/movie-3.jpg",
    year: "2026",
    rating: "R",
    duration: "1h 58m",
    match: 89,
    genres: ["Romance", "Drama"],
  },
  {
    id: 4,
    title: "The Haunting",
    imageUrl: "/images/movie-4.jpg",
    year: "2025",
    rating: "R",
    duration: "1h 45m",
    match: 92,
    genres: ["Horror", "Thriller"],
  },
  {
    id: 5,
    title: "Friends Forever",
    imageUrl: "/images/movie-5.jpg",
    year: "2026",
    rating: "PG",
    duration: "1h 40m",
    match: 85,
    genres: ["Comedy", "Family"],
  },
  {
    id: 6,
    title: "Peak Adventures",
    imageUrl: "/images/movie-6.jpg",
    year: "2025",
    rating: "G",
    duration: "1h 52m",
    match: 91,
    genres: ["Documentary", "Adventure"],
  },
  {
    id: 7,
    title: "Dark Interrogation",
    imageUrl: "/images/movie-7.jpg",
    year: "2026",
    rating: "TV-MA",
    duration: "10 Episodes",
    match: 96,
    genres: ["Crime", "Drama", "Mystery"],
  },
  {
    id: 8,
    title: "Dragon's Realm",
    imageUrl: "/images/movie-8.jpg",
    year: "2025",
    rating: "TV-14",
    duration: "8 Episodes",
    match: 98,
    genres: ["Fantasy", "Action", "Drama"],
  },
];

const popularOnStreamflix = [
  {
    id: 9,
    title: "Midnight Chase",
    imageUrl: "/images/movie-7.jpg",
    year: "2024",
    rating: "R",
    duration: "2h 5m",
    match: 88,
    genres: ["Action", "Crime"],
  },
  {
    id: 10,
    title: "Galactic Journey",
    imageUrl: "/images/movie-2.jpg",
    year: "2025",
    rating: "PG-13",
    duration: "2h 20m",
    match: 93,
    genres: ["Sci-Fi", "Adventure"],
  },
  {
    id: 11,
    title: "Summer Love",
    imageUrl: "/images/movie-3.jpg",
    year: "2026",
    rating: "PG-13",
    duration: "1h 55m",
    match: 87,
    genres: ["Romance", "Comedy"],
  },
  {
    id: 12,
    title: "Whispers in the Dark",
    imageUrl: "/images/movie-4.jpg",
    year: "2024",
    rating: "R",
    duration: "1h 50m",
    match: 90,
    genres: ["Horror", "Mystery"],
  },
  {
    id: 13,
    title: "The Great Escape",
    imageUrl: "/images/movie-5.jpg",
    year: "2025",
    rating: "PG",
    duration: "1h 48m",
    match: 84,
    genres: ["Comedy", "Adventure"],
  },
  {
    id: 14,
    title: "Wild Earth",
    imageUrl: "/images/movie-6.jpg",
    year: "2024",
    rating: "G",
    duration: "1h 30m",
    match: 95,
    genres: ["Documentary", "Nature"],
  },
  {
    id: 15,
    title: "City Nights",
    imageUrl: "/images/movie-1.jpg",
    year: "2026",
    rating: "TV-MA",
    duration: "6 Episodes",
    match: 91,
    genres: ["Drama", "Thriller"],
  },
  {
    id: 16,
    title: "Kingdom of Fire",
    imageUrl: "/images/movie-8.jpg",
    year: "2024",
    rating: "TV-14",
    duration: "10 Episodes",
    match: 97,
    genres: ["Fantasy", "Action"],
  },
];

const newReleases = [
  {
    id: 17,
    title: "The Awakening",
    imageUrl: "/images/movie-8.jpg",
    year: "2026",
    rating: "TV-MA",
    duration: "2h 10m",
    match: 94,
    genres: ["Fantasy", "Drama"],
  },
  {
    id: 18,
    title: "Neon Dreams",
    imageUrl: "/images/movie-1.jpg",
    year: "2026",
    rating: "R",
    duration: "1h 58m",
    match: 89,
    genres: ["Sci-Fi", "Action"],
  },
  {
    id: 19,
    title: "Ocean's Heart",
    imageUrl: "/images/movie-3.jpg",
    year: "2026",
    rating: "PG-13",
    duration: "2h 5m",
    match: 91,
    genres: ["Romance", "Adventure"],
  },
  {
    id: 20,
    title: "The Forgotten",
    imageUrl: "/images/movie-4.jpg",
    year: "2026",
    rating: "R",
    duration: "1h 55m",
    match: 86,
    genres: ["Horror", "Thriller"],
  },
  {
    id: 21,
    title: "Laugh Out Loud",
    imageUrl: "/images/movie-5.jpg",
    year: "2026",
    rating: "PG",
    duration: "1h 42m",
    match: 83,
    genres: ["Comedy"],
  },
  {
    id: 22,
    title: "Arctic Journey",
    imageUrl: "/images/movie-6.jpg",
    year: "2026",
    rating: "G",
    duration: "1h 35m",
    match: 92,
    genres: ["Documentary", "Adventure"],
  },
  {
    id: 23,
    title: "Shadow Protocol",
    imageUrl: "/images/movie-7.jpg",
    year: "2026",
    rating: "TV-MA",
    duration: "8 Episodes",
    match: 95,
    genres: ["Action", "Spy", "Thriller"],
  },
  {
    id: 24,
    title: "Cosmic Frontier",
    imageUrl: "/images/movie-2.jpg",
    year: "2026",
    rating: "PG-13",
    duration: "2h 25m",
    match: 90,
    genres: ["Sci-Fi", "Space"],
  },
];

const topTenToday = [
  { id: 1, rank: 1, title: "The Last Guardian", imageUrl: "/images/poster-1.jpg" },
  { id: 2, rank: 2, title: "Beyond the Stars", imageUrl: "/images/poster-2.jpg" },
  { id: 3, rank: 3, title: "Dark Interrogation", imageUrl: "/images/poster-3.jpg" },
  { id: 4, rank: 4, title: "The Haunting", imageUrl: "/images/poster-4.jpg" },
  { id: 5, rank: 5, title: "Dragon's Realm", imageUrl: "/images/poster-5.jpg" },
  { id: 6, rank: 6, title: "Eternal Shores", imageUrl: "/images/poster-6.jpg" },
  { id: 7, rank: 7, title: "Wild Earth", imageUrl: "/images/poster-7.jpg" },
  { id: 8, rank: 8, title: "Midnight Chase", imageUrl: "/images/poster-8.jpg" },
  { id: 9, rank: 9, title: "Friends Forever", imageUrl: "/images/poster-9.jpg" },
  { id: 10, rank: 10, title: "Kingdom of Fire", imageUrl: "/images/poster-10.jpg" },
];

const actionMovies = [
  {
    id: 25,
    title: "Strike Force",
    imageUrl: "/images/movie-1.jpg",
    year: "2025",
    rating: "R",
    duration: "2h 12m",
    match: 93,
    genres: ["Action", "Military"],
  },
  {
    id: 26,
    title: "Speed Demons",
    imageUrl: "/images/movie-7.jpg",
    year: "2024",
    rating: "PG-13",
    duration: "1h 58m",
    match: 88,
    genres: ["Action", "Racing"],
  },
  {
    id: 27,
    title: "Final Stand",
    imageUrl: "/images/movie-8.jpg",
    year: "2025",
    rating: "R",
    duration: "2h 5m",
    match: 91,
    genres: ["Action", "War"],
  },
  {
    id: 28,
    title: "Urban Warrior",
    imageUrl: "/images/movie-1.jpg",
    year: "2024",
    rating: "R",
    duration: "1h 52m",
    match: 86,
    genres: ["Action", "Martial Arts"],
  },
  {
    id: 29,
    title: "Mission Zero",
    imageUrl: "/images/movie-2.jpg",
    year: "2025",
    rating: "PG-13",
    duration: "2h 18m",
    match: 94,
    genres: ["Action", "Spy"],
  },
  {
    id: 30,
    title: "The Reckoning",
    imageUrl: "/images/movie-7.jpg",
    year: "2024",
    rating: "R",
    duration: "2h 1m",
    match: 89,
    genres: ["Action", "Revenge"],
  },
  {
    id: 31,
    title: "Blaze of Glory",
    imageUrl: "/images/movie-8.jpg",
    year: "2025",
    rating: "R",
    duration: "1h 55m",
    match: 87,
    genres: ["Action", "Western"],
  },
  {
    id: 32,
    title: "Cyber Strike",
    imageUrl: "/images/movie-1.jpg",
    year: "2024",
    rating: "PG-13",
    duration: "2h 8m",
    match: 90,
    genres: ["Action", "Tech-Thriller"],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <HeroBanner
        title="The Last Guardian"
        description="In a world torn apart by war, one soldier must protect the last hope for humanity. An epic journey across devastated landscapes leads to an unexpected alliance and a final battle that will determine the fate of all mankind."
        imageUrl="/images/hero-banner.jpg"
        year="2026"
        rating="TV-MA"
        duration="2h 15m"
      />

      <div className="-mt-32 relative z-10 space-y-6 pb-8">
        <ContentRow title="Trending Now" movies={trendingNow} />
        <TopTenRow title="Top 10 in Your Country Today" items={topTenToday} />
        <ContentRow title="Popular on StreamFlix" movies={popularOnStreamflix} />
        <ContentRow title="New Releases" movies={newReleases} />
        <ContentRow title="Action Movies" movies={actionMovies} />
      </div>

      <Footer />
    </main>
  );
}
