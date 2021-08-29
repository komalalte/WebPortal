import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ items, removeItem, editItem }) => {

  return (
    <div className="grocery-list">
      {items.map((item) => {
        console.log("itemList", item);

        const { id, title, email, lastName, language } = item;
        return (
          <article className="grocery-item" key={id}>
            <p className="title">{id}</p>
            <p className="title">{title}</p>
            <p className="title">{lastName}</p>
            <p className="title">{email}</p>
            <p className="title">{language}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
