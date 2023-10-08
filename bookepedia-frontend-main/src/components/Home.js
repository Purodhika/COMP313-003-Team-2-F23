import React, { useState } from "react";
import axios from "axios";

import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { useNavigate } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);
  let navigate = useNavigate();
  React.useEffect(() => {
    axios
      .get("http://localhost:3500/book/")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }, []);


  const [isbn, setIsbn] = useState('');
  //const [book, setBook] = useState(null);
  //const [error, setError] = useState(null);

  const [sort, setSort] = useState(1);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3500/book/${isbn}`);
      setBooks(response.data);
      if(response.data.length == 0) alert("Search Returned 0 results")
      //setBook(response.data);
      //setError(null);
    } catch (err) {
      //setBooks([]);
      console.log(err)
     // setError('Book not found');
    }
  };


  const sortBooks = async (sortOrder) => {
    try {
      const response = await axios.get(`http://localhost:3500/book/sort/${sortOrder}`);
      setBooks(response.data);
      //if(response.data.length == 0) alert("Search Returned 0 results")
      //setBook(response.data);
      //setError(null);
    } catch (err) {
      //setBooks([]);
      console.log(err)
     // setError('Book not found');
    }
  };


  return (
<div style={{ margin: "90px" }}>
<br/>
<div style={{float: 'right'}}>
      <Form.Label htmlFor="sort">Sort By</Form.Label>
      <Form.Select value={sort} onChange={(e) => {setSort(e.target.value); sortBooks(e.target.value); }} id="sort" aria-label="Default select example" style={{display:"inline-block", width:"200px"}}>      
      <option value="1">Popularity/Newest</option>
      <option value="2">Price - High to Low</option>
      <option value="3">Price - Low to High</option>
    </Form.Select>
    </div>

    <input type="text" placeholder="ISBN"  value={isbn} onChange={(e) => setIsbn(e.target.value)}/>
      <button onClick={handleSearch}>Search</button>
      <br/><br/>



    <CardGroup>
      {books.map((book, index) => (
        <Card
          key={book._id}
          style={{
            margin: "15px",
            border: "1px solid black",
            borderRadius: "0px",
            minWidth: "250px",
            maxWidth: '400px'
          }}
        >
          <Card.Img
            variant="top"
            style={{
              width: "100%",

              maxHeight: "200px",
              objectFit: "contain",
              borderBottom: "1px solid black",
            }}
            src={"http://localhost:3500/BookImagesUploaded/" + book.image}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src="http://localhost:3500/BookImagesUploaded/noImage.png";}}
          />
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>
              {book.title}
            </Card.Title>
            <i style={{ textAlign: "center", display: "block" }}>
              by {book.authors}
            </i>
            <p>Condition: {book.condition}</p>
            <hr/>
            <Card.Text>{book.description}</Card.Text>
            <hr/>
            <Button variant="primary" onClick={() => navigate('/book-details/' + book._id)}>Price: ${book.price.toFixed(2)}</Button>
            
            {'         '}
            {book.sold ? (<Button variant="danger">SOLD</Button>) : (<span></span>)}
            
            
            
            <br/>
            <small className="text-muted">Book viewed {book.views} times</small>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Genre: {book.genre} <br/>
              ISBN: {book.isbn} <br />
              Sold by: {book.sellerEmail} <br/>
              Date Added: {new Date(book.dateAdded).toLocaleString("en-CA")}<br/>
              
            </small>
          </Card.Footer>
        </Card>
      ))}
    </CardGroup>

    </div>
  );

  /*

  const [isbn, setIsbn] = useState('');
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3500/book/${isbn}`);
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

  */
}

export default Home;
