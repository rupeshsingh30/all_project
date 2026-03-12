import React, { useState } from "react";
import "../CSSFiles/admincategory.css";

const Category = () => {

  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCategory = {
      id: categories.length + 1,
      name: categoryName,
      desc: description,
      image: image ? image.name : ""
    };

    setCategories([...categories, newCategory]);

    setCategoryName("");
    setDescription("");
    setImage(null);
  };

  return (
    <div className="container">

      {/* LEFT SIDE FORM */}
      <div className="formSection">
        <h3>Add Category</h3>

        <form onSubmit={handleSubmit}>
          
          <label>Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />

          {/* <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea> */}

          <label>Category Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button type="submit">Add Category</button>

        </form>
      </div>

      {/* RIGHT SIDE TABLE */}
      <div className="tableSection">
        <h3>Category List</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              {/* <th>Description</th> */}
              <th>Image</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                {/* <td>{cat.desc}</td> */}
                <td>{cat.image}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Category;