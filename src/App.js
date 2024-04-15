import React, { useState } from 'react';
import './App.css';

function App() {
  const [article, setArticle] = useState({
    name: '',
    date: '',
    imgname: null,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "imgname") {
      setArticle(prevState => ({
        ...prevState,
        imgname: files[0]
      }));
    } else {
      setArticle(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', article.name);
    formData.append('date', article.date);
    formData.append('imgname', article.imgname);

    const url = 'http://127.0.0.1:8000/api/articles';

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const result = await response.json();
      console.log(result);
      alert('Article added successfully');
    } catch (error) {
      console.error('Failed to submit the form: ', error);
      alert('Failed to submit the form');
    }
  };

  return (
    <div className="App">
      <h2>Add Article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={article.name} onChange={handleChange} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" name="date" value={article.date} onChange={handleChange} />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="imgname" onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
