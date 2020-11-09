import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([{}]);

  useEffect(() => {
    setInterval(() => {
      fetch("/api/books")
        .then((res) => res.json())
        .then((data) => {
          setBooks(data);
        });
    }, 2000);
  }, []);

  const addBook = () => {
    console.log("Book Added");
    const title = prompt("Enter Book Title");
    const author = prompt("Enter Book Author");
    
    if(!title || !author)
      return false;

    fetch("/api/add", {
      method: "POST",
      body: JSON.stringify({ title, author }),
    })
      .then((res) => res.json())
      .then((data) => console.log("data", data));
  };

  if(!books.length)
    return <h2>Loading...</h2>
 
  return (
    <div className="App">
      <h1>Available Books</h1>
      <table>
        {books.map((booksObj, ind) => {
          return (
            <tr key={ind}>
              <td >{booksObj.title}</td>
              <td>{booksObj.author}</td>
            </tr>
          );
        })}
      </table>
      <button onClick={addBook}>Add Book</button>
    </div>
  );
}

export default App;
