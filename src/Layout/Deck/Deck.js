import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api";

function Deck() {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const history = useHistory();
  //const { id, name, description, cards } = deck

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      const getDeckFromAPI = await readDeck(deckId, abortController.signal);
      setDeck(getDeckFromAPI);
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.push(`/decks/${deckId}/edit`)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => history.push(`/decks/${deckId}/study`)}
        >
          Study
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => history.push(`/decks/${deckId}/cards/new`)}
        >
          + Add Cards
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={async (event) => {
            event.preventDefault();
            if (
              window.confirm(
                "Delete this deck? You won't be able to recover it."
              )
            ) {
              await deleteDeck(deck.id);
              history.push("/")
              window.location.reload(false);
            }
          }}
        >
          Delete
        </button>
      </div>

      <div>
        <h2>Cards</h2>

        {deck.cards &&
          deck.cards.map((card) => (
            <div className="card" key={card.id}>
              <div className="card-body">
                <div className="row-card-body">
                  <p className="card-text">{card.front}</p>
                  <p className="card-text">{card.back}</p>
                </div>
                <a
                  href={`/decks/${deck.id}/cards/${card.id}/edit`}
                  className="btn btn-secondary"
                >
                  Edit
                </a>
                <a
                  href={`/decks/${deck.id}`}
                  className="btn btn-danger"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Delete this card? You won't be able to recover it."
                      )
                    ) {
                      deleteCard(`${card.id}`);
                    }
                  }}
                >
                  Delete
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Deck;
