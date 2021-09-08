import React, { useEffect, useState } from "react";
import { createCard, readDeck } from "../utils/api/index";
import { useHistory, useParams } from "react-router-dom";
import CardForm from "./CardForm";

function AddCard() {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const history = useHistory();
  const [front, setFront] = useState("Front side of card");
  const [back, setBack] = useState("Back side of card");
 

  useEffect(() => {
    async function loadDeck() {
        const getDeckFromAPI = await readDeck(deckId);
        setDeck(getDeckFromAPI);
    }
    loadDeck();
  }, [deckId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const card = {
      front: front,
      back: back,
      deckId: deckId,
    };
    async function updateCard() {
        await createCard(deckId, card);
      };
      updateCard();
      setFront("Front side of card");
      setBack("Back side of card");
    
    history.push(`/decks/${deck.id}`);
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
              <a href="/">{deck.name}</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Card
            </li>
          </ol>
        </nav>
      </div>

      <div>
        <CardForm 
        front={front} 
        back={back} 
        handleSubmit={handleSubmit} 
        setFront={setFront}
        setBack={setBack}/>
      </div>
    </div>
  );
}

export default AddCard;
