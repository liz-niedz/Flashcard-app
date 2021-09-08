import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

function EditDeck() {
    const deckObject = { name:"", description:""}
  const [deck, setDeck] = useState(deckObject);
  const { deckId } = useParams();
  const history = useHistory();
  const[name, setName] = useState("")
  const [description, setDescription] = useState(deck.description)

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      const getDeckFromAPI = await readDeck(deckId, abortController.signal);
      setDeck(getDeckFromAPI);
      setName(getDeckFromAPI.name);
      setDescription(getDeckFromAPI.description);
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const handleNameChange = (event) => {
      setName(event.target.value)

  }

  const handleDescriptionChange = (event) => {
setDescription(event.target.value)
  }

  const handleSubmit = (event) => {
event.preventDefault();
const currentDeck = {
    ...deck,
    name,
    description
}
updateDeck(currentDeck)
.then(response => {
    setDeck(response)
    history.push(`/decks/${deck.id}`)
})
  }

  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href={`/decks/${deckId}`}>{deck.name}</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>
      </div>
      <h2>Edit Deck</h2>
      <div>
        <form>
          <div className="form-group">
            <label for="name">Name</label>
            <input
              type="name"
              className="form-control"
              id="exampleFormControlInput1"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="form-group">
            <label for="exampleFormControlTextarea1">Description</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.push(`/decks/${deck.id}`)}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditDeck;
