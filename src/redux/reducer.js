import cards from "../utils/getCards";

const initialState = {
  deck: cards,
  setsfound: [],
  difficulty: 0,
}

export default function counterReducer (state = initialState, action) {
  switch(action.type) {
      case 'SET_FOUND': {
        return {
          ...state,
          setsfound: action.payload,
        }
      }
      case 'CLEAR_SET': {
        return {
          ...state,
          setsfound: [],
        }
      }
      case 'CHANGE_DIFFICULTY': {
        console.log('action.payload', action.payload)
        return {
          ...state,
          difficulty: action.payload,
        }
      }
      default:
          return state
  }
}