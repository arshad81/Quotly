import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [quotes, setQuotes] = useState<string[]>([])

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await axios.get('https://quotly.onrender.com/api/quotes');
        console.log(res.data.quotes);
        setQuotes(res.data.quotes);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    }
    fetchQuotes();

  }, []);
  return (
    <>
      <h1 className='text-3xl underline'>Quotly</h1>
      <div>
        {quotes.map((quote, index) => (
          <div key={index} className="quote-card">
            <p>{quote}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
