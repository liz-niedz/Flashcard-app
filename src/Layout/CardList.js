import React, { useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

function CardList({ cards }) {
  const history = useHistory();
  const deckId = useParams();
  let [currentCard, setCurrentCard] = useState(0);
  const [frontSide, setFrontSide] = useState(true);

  const handleLast = () => {
    const result = window.confirm(
      "Restart cards? Click cancel to return to the home page."
    );
    if (result === true) {
      setCurrentCard(0);
    } else {
      history.push("/");
    }
  };

  function handleNext() {
    if (currentCard + 1 === cards.length) {
      handleLast();
      return
    }
    setCurrentCard(currentCard + 1);
    setFrontSide(() => !frontSide);
  }

  const flipHandler = () => {
    setFrontSide(() => !frontSide);
  };
console.log(currentCard)
  if (!cards) {
    return null;
  }

  if (cards.length > 2) {
    return (
      <ul className="deck-cards">
        {cards && (
          <li>
            <div className="card" key={cards[currentCard].id}>
              <div className="card-body">
                <h5 className="card-title">
                  Card {currentCard + 1} of {cards.length}
                </h5>
                <p className="card-text">
                  {frontSide
                    ? cards[currentCard].front
                    : cards[currentCard].back}
                </p>
                <button className="btn btn-secondary" onClick={flipHandler}>
                  Flip
                </button>
                {frontSide ? null : (
                  <button className="btn btn-primary" onClick={handleNext}>
                    Next
                  </button>
                )}
              </div>
            </div>
          </li>
        )}
      </ul>
    );
  } else {
    return (
      <div>
        <h3>Not enough cards</h3>
        <p>
          You need at least 3 cards to study this deck. There are{" "}
          {cards ? cards.length : 0} cards in this deck.
        </p>
        <Link
          to={`/decks/${deckId}/cards/new`}
          className="btn btn-primary ml-3"
        >
          Add Cards
        </Link>
      </div>
    );
  }
}

export default CardList;
