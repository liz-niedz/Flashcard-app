import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, updateCard } from "../utils/api";

function EditCard() {
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({});
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    async function loadInfo() {
      try {
        const deckInfo = await readDeck(deckId, abortController.signal);
        setDeck(deckInfo);
        setCard(deckInfo.cards.find((card) => card.id + "" === cardId));
        setFront(deckInfo.cards.find((card) => card.id + "" === cardId).front);
        setBack(deckInfo.cards.find((card) => card.id + "" === cardId).back);
      } catch (error) {
        console.log(error);
      }
    }
    loadInfo();
    return () => abortController.abort();
  }, [deckId, cardId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const editedCard = {
      ...card,
      front,
      back,
    };
    updateCard(editedCard).then((response) => {
      setCard(response);
      history.push(`/decks/${deckId}`);
    });
  };

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
              Edit Card
            </li>
          </ol>
        </nav>
      </div>
      <h2>Edit Card</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label for="name">Front</label>
            <input
              type="name"
              className="form-control"
              id="exampleFormControlInput1"
              value={front}
              onChange={(event) => setFront(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="exampleFormControlTextarea1">Back</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={back}
              onChange={(event) => setBack(event.target.value)}
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.push("/")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCard;