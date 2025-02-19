import axios from "axios";
import { useEffect, useState } from "react";

interface FetchedData {
  name: string;
  url: string;
}

function App() {
  const [cards, setCards] = useState<FetchedData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20"
      );
      setCards(response?.data?.results);
    } catch (err) {
      setError("Failed to fetch Pokémon data. Please try again later.");
      console.error("Error fetching data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getPokemonId = (url: string) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center py-10">
      {/* Title */}
      <h1 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
        Pokémon List
      </h1>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-lg font-semibold">{error}</div>
      )}

      {/* Pokémon Cards */}
      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 w-full max-w-7xl">
          {cards.map((card) => {
            const id = getPokemonId(card.url);
            return (
              <div
                key={id}
                className="bg-white p-6 rounded-3xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl overflow-hidden relative group border border-gray-200"
              >
                {/*  I couldn't get the image from the URL given by the API. I take ChatGPT's help to find the correct Pokémon image URL. */}

                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                  alt={card.name}
                  className="w-32 h-32 mx-auto relative z-10"
                />

                {/* Name */}
                <h2 className="text-xl text-center capitalize mt-4 relative z-10 text-gray-800 group-hover:text-blue-600 transition-colors">
                  {card.name}
                </h2>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
