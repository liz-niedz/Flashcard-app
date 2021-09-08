import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

function CreateDeck() {
  const history = useHistory();
  const [newDeck, setNewDeck] = useState({ name: "", desription: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await createDeck(newDeck);
    history.push(`/decks/${response.id}`);
  }

  const handleChange=(event)=>{
    setNewDeck({...newDeck,[event.target.name]:event.target.value})
}

  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Create Deck
            </li>
          </ol>
        </nav>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Deck Name"
              onChange={handleChange}
              value={newDeck.name}
              style={{ width: "100%" }}
            />
          </div>
          <div className="form-group">
            <label for="description">Description</label>
            <textarea
              name="description"
              id="description"
              type="textarea"
              rows="3"
              placeholder="Brief description of deck"
              onChange={handleChange}
              value={newDeck.description}
              style={{ width: "100%" }}
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.push("/")}
          >
            Cancel
          </button>
          <button 
          type="submit" 
          className="btn btn-primary"
          onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateDeck;
