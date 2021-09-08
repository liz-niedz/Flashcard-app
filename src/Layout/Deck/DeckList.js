import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

function DeckList({ decks }) {
  const history = useHistory();
  return (
    <ul className="deck-cards">
      {decks.map((deck) => (
        <li key={deck.id}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{deck.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {deck.cards.length} cards
              </h6>
              <p className="card-text">{deck.description}</p>
              <a href={`/decks/${deck.id}`} className="btn btn-secondary">
                View
              </a>
              <a href={`/decks/${deck.id}/study`} className="btn btn-primary">
                Study
              </a>
              <a
                href="/"
                className="btn btn-danger"
                onClick={() => {
                  if (
                    window.confirm(
                      "Delete this deck? You won't be able to recover it."
                    )
                  ) {
                    deleteDeck(`${deck.id}`);
                    history.go("/");
                  }
                }}
              >
                Delete
              </a>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default DeckList;
