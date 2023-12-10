import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'react-bootstrap/Image';
import accountContext from '../userAccounts/accountContext';

/**
 * Component to edit an existing book uploaded by the same seller
 */
function EditListing() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userEmail } = React.useContext(accountContext);

  const [file, setFile] = React.useState();

  const [bookRec, setBookRec] = React.useState({
    title: "",
    isbn: "",
    authors: "",
    genre: "",
    price: "",
    description: "",
    sellerEmail: userEmail,
    condition: "",
    image: ""
  });

  useEffect(() => {
    // Fetch the book data based on the 'id' from the URL
    axios.get(`https://bookepedia-qta8.onrender.com/book/${id}`)
      .then((response) => {
        const bookData = response.data;

        // Populate the form with the fetched book data
        setBookRec({
          title: bookData.title,
          isbn: bookData.isbn,
          authors: bookData.authors,
          genre: bookData.genre,
          price: bookData.price,
          description: bookData.description,
          sellerEmail: bookData.sellerEmail,
          condition: bookData.condition,
          image: bookData.image
        });
      })
      .catch((error) => {
        console.error('Error fetching book data:', error);
      });
  }, [id]);

  useEffect(() => {
    setFile(file);
  }, [file]);
  
  const onchange = (e) => {
    setBookRec({ ...bookRec, [e.target.name]: e.target.value });
  };

  const SubmitRec = async (e) => {
    e.preventDefault();
    console.log(file);

    var formData = new FormData();
    formData.append("image", file);
    formData.append("title", bookRec.title);
    formData.append("isbn", bookRec.isbn);
    formData.append("authors", bookRec.authors);
    formData.append("genre", bookRec.genre);
    formData.append("price", bookRec.price);
    formData.append("description", bookRec.description);
    formData.append("sellerEmail", bookRec.sellerEmail);
    formData.append("condition", bookRec.condition);
    
     // Send the updated data to the server
    axios
      .post(`https://bookepedia-qta8.onrender.com/book/edit/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        console.log(res);
        alert(`The Book "${bookRec.title}" has been updated successfully`);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        alert('Please try again, an error occurred');
      });
  };

  useEffect(() => {
    // Fetch the image from the server and set it as the 'file' state
    if (bookRec.image) {
      fetch(`https://bookepedia-qta8.onrender.com/BookImagesUploaded/${bookRec.image}`)
        .then((response) => response.blob()) // Get the image as a Blob
        .then((blob) => {
          const fileFromBlob = new File([blob], bookRec.image);
          setFile(fileFromBlob);
        })
        .catch((error) => {
          console.error('Error fetching image:', error);
        });
    }
  }, [bookRec.image]);
  return (
    
    <div style={{margin:"90px"}}>
   
      <h1
        className="text-center border border-2"
        style={{ padding: "10px", background: "#0084ab52" }}
      >
        Book Update
      </h1>
   

      <Form
        encType="multipart/form-data"
        onSubmit={SubmitRec}
        style={{ padding: "30px" }}
        className="mx-auto d-block border border-2"
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={onchange}
            value={bookRec.title}
            name="title"
            type="text"
            placeholder="Enter Book Title"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            onChange={onchange}
            value={bookRec.isbn}
            name="isbn"
            type="text"
            placeholder="Enter ISBN"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Author(s)</Form.Label>
          <Form.Control
            onChange={onchange}
            value={bookRec.authors}
            name="authors"
            type="text"
            placeholder="Enter Authors"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <div style={{ width: "45%", display: "inline-block" }}>
            <Form.Label>Genre</Form.Label>
            <Form.Select
              onChange={onchange}
              value={bookRec.genre}
              name="genre"            
              
              aria-label="Default select example"
            >
              <option>Open this select menu</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Text-Book">Text-Book</option>
              <option value="other">other</option>
            </Form.Select>
          </div>

          <div
            style={{ width: "45%", display: "inline-block", marginLeft: "10%" }}
          >
            <Form.Label>Price</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <InputGroup.Text>0.00</InputGroup.Text>
              <Form.Control
                onChange={onchange}
                value={bookRec.price}
                name="price"
                type="number"
                placeholder="Enter Price"
                min="0"
                step=".01"
                aria-label="Dollar amount (with dot and two decimal places)"
              />
            </InputGroup>
          </div>
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicEmail">
        <div style={{ width: "45%", display: "inline-block" }}>
            <Form.Label>Condition</Form.Label>
            <Form.Select
              onChange={onchange}
              value={bookRec.condition}
              name="condition"           
              
              aria-label="Default select example"
            >
              <option>Open this select menu</option>
              <option value="New">New</option>
              <option value="Used (Excellent)">Used (Excellent)</option>
              <option value="Used (Good)">Used (Good)</option>
              <option value="Other">Other</option>
            </Form.Select>
          </div>
        </Form.Group>


        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            placeholder="Enter Book Description"
            onChange={onchange}
            value={bookRec.description}
            name="description"
            as="textarea"
            rows={4}
          />
        </Form.Group>

        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label>Upload Book Image</Form.Label>
          <Form.Control
            
            filename={file}
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <br />
          <Image
            thumbnail
            //src={file ? URL.createObjectURL(file) : ""}
            src={file ? URL.createObjectURL(file) : ""}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src="https://bookepedia-qta8.onrender.com/BookImagesUploaded/noImage.png";}}
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              objectFit: "contain",
            }}
          />
        </Form.Group>


        <Button variant="primary" type="submit">
          Update Book
        </Button>
      </Form>
    </div>
  );
}

export default EditListing;


  


