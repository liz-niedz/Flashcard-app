import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { listDecks } from "../utils/api/index";
import DeckList from "./Deck/DeckList";

function Home() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);
  useEffect(() => {
    async function getDeck() {
      const getDeckFromAPI = await listDecks();
      setDecks(getDeckFromAPI);
    }
    getDeck();
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => history.push("/decks/new")}
      >
        + Create Deck
      </button>
      <DeckList decks={decks} />
    </>
  );
}

export default Home;