const express = require("express");
const router = express.Router();
const Book = require("../models/book.js")

//https://www.sammeechward.com/uploading-images-express-and-react#react
//Used for image uploads to store images in a folder (on the server)
// 1
const multer = require('multer')
// 2
const upload = multer({ dest: './BookImagesUploaded/' })

//Creating one book
router.post("/upload/", upload.single('image'), async (req, res) => {
  //console.log("Server made it")
  let fileName = 'noImage.png' //default placeholder image
  if (req.file) {
    fileName = req.file.filename
  }
  

  const book = new Book({  
    
    title: req.body.title,
    isbn: req.body.isbn,
    authors: req.body.authors,
    genre: req.body.genre,
    price: req.body.price,
    description: req.body.description,
    sellerEmail: req.body.sellerEmail,
    image: fileName, 
    condition: req.body.condition,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    

  }); 
  console.log(book)  
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

});

//Get all books
router.get('/', async (req, res) =>{

  try {
    const books = await Book.find().sort({views: -1, dateAdded: -1})
    res.json(books)    
  } catch (err) {
    res.status(500).json({message: err.message})
  }

})

router.get('/:_id', async (req, res) => {
  const bookId = req.params._id;

  try {
    // Use Mongoose or your preferred database library to fetch the book data by its ID
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching book data' });
  }
});

//Get route to get the book based on the ISBN number
router.get('/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  try {
    const book = await Book.findOne({ isbn: isbn });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json([book]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/title/:title', async (req, res) => {
  const title = req.params.title;
  try {
    const book = await Book.findOne({ title: title });
    if (!book) {
      // If book is not found, respond with 404 Not Found
      return res.status(404).json({ error: 'Book not found' });
    }
    // If book is found, respond with 200 OK and the book data
    res.status(200).json([book]);
  } catch (err) {
    // If an error occurs, respond with 500 Internal Server Error
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// PUT route to edit a book
router.post('/edit/:_id', upload.single('image'), async (req, res) => {
  try {
    const bookId = req.params._id;
    let filename = "";
    if (req.file) {
      filename = req.file.filename
    }
    let updatedData = req.body;
    updatedData.image = filename;
    console.log('Received PUT request with updated data:', updatedData);

    // Use Mongoose to find and update the book
    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(updatedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating the book' });
  }
});


router.delete("/:isbn", getBookByIsbn, async (req, res) => {
  try {
    await res.book.deleteOne();
    console.log(res.book)
    res.json({ message: "Deleted Book" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  console.log("delete " + req.params.id);
  try {
    await Book.findByIdAndDelete(req.params.id);
    console.log(res.book)
    res.json({ message: "Deleted Book" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
  
router.get("/:isbn", async (req, res) => { 
  try {
    const books = await Book.find({ isbn: req.params.isbn }).sort({views: -1, dateAdded: -1});
    res.json(books);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  } 
  
});


router.get("/details/:_id", async (req, res) => { 
  //console.log("made it ")
  try {
    const book = await Book.findOne({ _id: req.params._id });
    book.views++
    book.save()
    res.json(book);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  } 
  
});


router.get("/sort/:sort", async (req, res) => { 
  sortOrder = req.params.sort;
  console.log(sortOrder)
  let books;
  try {
    if(sortOrder == 1){
      console.log(sortOrder)
       books = await Book.find().sort({views: -1, dateAdded: -1});
    }else if (sortOrder == 2) {
      console.log(sortOrder)
       books = await Book.find().sort({price: -1});
    } else if (sortOrder == 3){
      console.log(sortOrder)
       books = await Book.find().sort({price: 1});
    }else if (sortOrder == 4){
      console.log(sortOrder)
       books = await Book.find().sort({genre: 1});
    }else if (sortOrder == 5){
      console.log(sortOrder)
       books = await Book.find().sort({authors: 1});
    }else if (sortOrder == 6){
      console.log(sortOrder)
      books = await Book.find().sort({condition: -1});
    }else if (sortOrder == 7) {
      console.log(sortOrder)
       books = await Book.find().sort({price: -1});
    }else if (sortOrder == 8) {
      console.log(sortOrder)
       books = await Book.find().sort({condition: 1});
    }
    
    res.json(books);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  } 
  
});

//generic function get user by email
async function getBookByIsbn(req, res, next) {
  let book;
  try {
    book = await Book.findOne({ isbn: req.params.isbn });
    if (book == null) {
      return res
        .status(404)
        .json({ message: "Cannot find book isbn " + req.params.isbn });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  
  res.book = book;
  next();
}

module.exports = router;