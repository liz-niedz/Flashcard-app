import React from "react";
import { useHistory } from "react-router-dom";

function CardForm ({handleSubmit, front, back, setFront, setBack}){
    const history = useHistory();
    return (
        <form>
          <div className="form-group">
            <label className="name">Front</label>
            <textarea
              className="form-control"
              required
              rows="3"
              value={front}
              onChange={(event) => setFront(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="exampleFormControlTextarea1">Back</label>
            <textarea 
            className="form-control" 
            required rows="3" 
            value={back} 
            onChange={(event) => setBack(event.target.value)}/>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.push("/")}
          >
            Done
          </button>
          <button 
          type="submit" 
          className="btn btn-primary"
          onClick={handleSubmit}>
            Save
          </button>
        </form>
    )
}

export default CardForm