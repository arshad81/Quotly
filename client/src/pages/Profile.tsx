import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

interface Quote {
  _id: string;
  text: string;
  author?: string;
}

function Profile() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [newQuote, setNewQuote] = useState("");

  // Fetch user's quotes
  const fetchUserQuotes = async () => {
    const res = await axios.get("https://quotly.onrender.com/api/quotes/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setQuotes(res.data.quotes);
  };

  useEffect(() => {
    fetchUserQuotes();
  }, []);

  // Handle new quote submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post(
      "https://quotly.onrender.com/api/quotes/quotes",
      { text: newQuote },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setQuotes([...quotes, res.data.quote]);
    setNewQuote("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Header/>

      {/* Add quote form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto flex gap-3 mb-12"
      >
        <input
          type="text"
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
          placeholder="Write your quote..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      {/* Quote list */}
      <div className="max-w-3xl mx-auto grid gap-6">
        {quotes.length === 0 ? (
          <p className="text-center text-gray-500">
            You haven't added any quotes yet.
          </p>
        ) : (
          quotes.map((quote) => (
            <div
              key={quote._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <p className="text-lg text-gray-800 leading-relaxed">
                “{quote.text}”
              </p>
              {quote.author && (
                <p className="text-right text-sm text-gray-500 mt-2">
                  - {quote.author}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;
