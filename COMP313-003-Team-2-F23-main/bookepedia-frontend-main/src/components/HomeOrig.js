import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [isbn, setIsbn] = useState('');
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/books/${isbn}`);
      setBook(response.data);
      setError(null);
    } catch (err) {
      setBook(null);
      setError('Book not found');
    }
  };

  return (
    <div>
      <input type="text" placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {book ? (
        <div>
          <h2>{book.title}</h2>
          <p>Author: {book.authors}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Description: {book.description}</p>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : null}
    </div>
  );
}

export default Home;
