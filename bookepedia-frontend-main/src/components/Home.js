import React, { useState } from "react";
import axios from "axios";

import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { useNavigate } from "react-router-dom";
import "./BookUpload.css";

function Home() {
  const [books, setBooks] = useState([]);
  let navigate = useNavigate();
  React.useEffect(() => {
    axios
      .get("https://bookepedia-qta8.onrender.com/book/")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }, []);


  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [sort, setSort] = useState(1);

  const handleSearch = async () => {
    try {
      if (!isbn && !title) {
        alert('Please insert ISBN or book title!');
        return;
      }
  
      let response;
  
      if (isbn) {
        response = await axios.get(`https://bookepedia-qta8.onrender.com/book/isbn/${isbn}`);
      } else if (title) {
        response = await axios.get(`https://bookepedia-qta8.onrender.com/book/title/${title}`);
      }
  
      if (response.data.length === 0) {
        alert('No matching books found!');
      } else {
        setBooks(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const sortBooks = async (sortOrder) => {
    try {
      const response = await axios.get(`https://bookepedia-qta8.onrender.com/book/sort/${sortOrder}`);
      setBooks(response.data);
  
    } catch (err) {
      console.log(err)
    }
  };


  return (
<div style={{ 
margin: "1px",
background: "rgb(238,174,202)",
background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
minHeight: "100vh",

}}>
<br/>
<div style={{float: 'right'}}>
      <Form.Label htmlFor="sort">Sort By</Form.Label>
      <Form.Select value={sort} onChange={(e) => {setSort(e.target.value); sortBooks(e.target.value); }} id="sort" aria-label="Default select example" style={{display:"inline-block", width:"200px"}}>      
      <option value="1">Popularity/Newest</option>
      <option value="2">Price - High to Low</option>
      <option value="3">Price - Low to High</option>
      <option value="4">Genre</option>
      <option value="5">Authors</option>
      <option value="6">Date added - Old to New</option>
      <option value="7">Date added - New to Old</option>
      <option value="8">Condition</option>
      <option value="9">Sell Condition</option>
    </Form.Select>
    </div>

    <div style={{ display: "flex",justifyContent: "center", alignItems: "center" }}>
    <input
  type="text"
  placeholder="Search your book"
  value={isbn || title}
  onChange={(e) => {
    const inputText = e.target.value;

    // Assuming ISBN is a number (you may need to modify the condition based on your ISBN format)
    if (!isNaN(inputText)) {
      setIsbn(inputText);
      setTitle(''); // Clear the title when ISBN is being typed
    } else {
      setTitle(inputText);
      setIsbn(''); // Clear the ISBN when title is being typed
    }
  }}
  style={{
    padding: "6px",
    border: "1px solid #ddd",
    borderRadius: "20px",
    background: "#f8f8f8",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s",
    width: "10cm",
  }}
  onFocus={(e) => (e.target.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)")}
  onBlur={(e) => (e.target.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.1)")}
/>

  <button
    onClick={handleSearch}
    style={{
      background: "#E76F51",
      color: "#fff",
      margin: "5px",
      padding: "5px 15px",
      border: "none",
      borderRadius: "20px",
      cursor: "pointer",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
    }}
    onMouseOver={(e) => (e.target.style.background = "#FFA726")}
    onMouseOut={(e) => (e.target.style.background = "#E76F51")}
  >
    Search
  </button>
</div>

      <br/><br/>
    {/* <input type="text" placeholder="TITLE"  value={title} onChange={(e) => setTitle(e.target.value)}/>
      <button onClick={handleSearch2}>Search</button>
      <br/><br/> */}


      <CardGroup>
  {books.map((book, index) => (
     <Card
     key={book._id}
     className="cardHover"
     style={{
       margin: "15px",
       border: "1px solid #ddd",
       borderRadius: "15px",
       boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
       minWidth: "250px",
       maxWidth: "400px",
       transition: "transform 0.4s ease-in-out",
      
     }}>
      <Card.Img
        variant="top"
        style={{
          width: "100%",
          maxHeight: "200px",
          objectFit: "cover",
          borderBottom: "1px solid #ddd",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
        }}
        src={
          "https://bookepedia-qta8.onrender.com/BookImagesUploaded/" +
          book.image
        }
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src =
            "https://bookepedia-qta8.onrender.com/BookImagesUploaded/noImage.png";
        }}
      />
      <Card.Body>
        <Card.Title style={{ textAlign: "center", fontWeight: "bold", color: "#333" }}>
          {book.title}
        </Card.Title>
        <i style={{ textAlign: "center", display: "block", color: "#555" }}>
          by {book.authors}
        </i>
        <p style={{ marginBottom: "10px", color: "#777" }}>
          <strong>Condition:</strong> {book.condition}
        </p>
        <Card.Text style={{ color: "#333" }}>{book.description}</Card.Text>
        <Button
          variant="primary"
          onClick={() => navigate("/book-details/" + book._id)}
          style={{
            background: "#3498db",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#2980b9")}
          onMouseOut={(e) => (e.target.style.background = "#3498db")}
        >
          Price: ${book.price.toFixed(2)}
        </Button>
        {'         '}
        {book.sold ? (
          <Button
            variant="danger"
            style={{
              background: "#e74c3c",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#c0392b")}
            onMouseOut={(e) => (e.target.style.background = "#e74c3c")}
          >
            SOLD
          </Button>
        ) : (
          <span></span>
        )}
        <br />
        <small className="text-muted">Book viewed {book.views} times</small>
      </Card.Body>
      <Card.Footer style={{ borderTop: "1px solid #ddd", borderRadius: "15px", backgroundColor: "#f8f8f8" }}>
        <small style={{ color: "#555" }}>
          <strong>Genre:</strong> {book.genre} <br />
          <strong>ISBN:</strong> {book.isbn} <br />
          <strong>Sold by:</strong> {book.sellerEmail} <br />
          <strong>Date Added:</strong>{" "}
          {new Date(book.dateAdded).toLocaleString("en-CA")}{" "}
          <br />
        </small>
      </Card.Footer>
    </Card>
  ))}
</CardGroup>;

    </div>
  );

 
}

export default Home;
