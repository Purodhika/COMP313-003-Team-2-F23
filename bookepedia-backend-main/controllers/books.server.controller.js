//search for a book by ID


app.get('/books/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const book = books.find(b => b.isbn === isbn);

  if (book) {
    res.send(book);
  } else {
    res.status(404).send('Book not found');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
