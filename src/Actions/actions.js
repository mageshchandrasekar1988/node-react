import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
export const SET_GAMES = "SET_GAMES";
export const Add_GAME = "Add_GAME";
export const GAME_FETCHED = "GAME_FETCHED";
export const GAME_UPDATED = "GAME_UPDATED";
export const GAME_DELETE = "GAME_DELETE";

export const setGame = games => {
  return {
    type: SET_GAMES,
    games: games
  };
};
export const addGame = game => {
  return {
    type: Add_GAME,
    games: game
  };
};
export const gameUpdated = games => {
  return {
    type: GAME_UPDATED,
    games: games
  };
};
export const gameFetched = game => {
  return {
    type: GAME_FETCHED,
    games: game
  };
};
export const gameDelete = id => {
  return {
    type: GAME_DELETE,
    games: id
  };
};

function handelResponce(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
export const fecthGames = () => {
  return dispatch => {
    fetch("http://localhost:3002/api/games")
      .then(res => res.json())
      .then(data => dispatch(setGame(data.games)));
  };
};

export const fecthGame = id => {
  return dispatch => {
    fetch(`http://localhost:3002/api/games/${id}`)
      .then(res => res.json())
      .then(data => dispatch(gameFetched(data.games)));
  };
};

export const saveGame = data => {
  return dispatch => {
    return fetch("http://localhost:3002/api/games", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(handelResponce)
      .then(data => {
        dispatch(addGame(data));
      });
  };
};

export const updateGame = data => {
  return dispatch => {
    return fetch(`http://localhost:3002/api/gamesUpdate/${data.id}`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(handelResponce)
      .then(data => {
        dispatch(gameUpdated(data));
      });
  };
};

export const deleteGame = id => {
  return dispatch => {
    return fetch(`http://localhost:3002/api/gamesDelete/${id}`, {
      method: "delete",
      // body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(handelResponce)
      .then(data => {
        dispatch(gameDelete(id));
      });
  };
};

export const deleteGame1 = () => {
  confirmAlert({
    title: "Confirm to submit", // Title dialog
    message: "Are you sure to do this.", // Message dialog
    childrenElement: () => <div>Custom UI</div>, // Custom UI or Component
    confirmLabel: "Confirm", // Text button confirm
    cancelLabel: "Cancel", // Text button cancel
    onConfirm: () => alert("Action after Confirm"), // Action after Confirm
    onCancel: () => alert("Action after Cancel") // Action after Cancel
  });
};
