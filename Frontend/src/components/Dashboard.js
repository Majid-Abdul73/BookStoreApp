import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBooks = books.filter(book =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Book Store Dashboard</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search books"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="row">
        {filteredBooks.map((book) => (
          <div className="col-md-4 mb-3" key={book.bookId}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{book.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{book.category}</h6>
                <p className="card-text">{book.description}</p>
                <p className="card-text"><strong>Price:</strong> ${book.price}</p>
                {/* Add buttons for update and delete */}
                <button className="btn btn-primary me-2">Update</button>
                <button className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
