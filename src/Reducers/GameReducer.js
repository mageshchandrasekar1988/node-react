import {
  SET_GAMES,
  Add_GAME,
  GAME_FETCHED,
  GAME_UPDATED,
  GAME_DELETE
} from "../Actions/actions";
const initalState = {
  games: []
};

const GameReducer = (state = initalState, action) => {
  switch (action.type) {
    case Add_GAME:
      return { games: [...state.games, action.games] };
    case GAME_UPDATED:
      const update = state.games.map(item => {
        if (item.id === action.games.id) return { games: action.games };
        return item;
      });
      return { games: [...state.games, update] };
    case GAME_FETCHED:
      const index = state.games.findIndex(
        item => item.id === parseInt(action.games.id)
      );
      if (index > -1) {
        const s = state.games.map(item => {
          if (item.id === parseInt(action.games.id))
            return { games: action.games };
          return item;
        });
        return { games: [...state.games, s] };
      } else {
        return { games: [...state.games, action.games] };
      }

    case SET_GAMES:
      return { games: action.games };
    case GAME_DELETE:
      const d = state.games.filter(item => item.id !== action.games);
      return { games: d };
    default:
      return state;
  }
};

export default GameReducer;
