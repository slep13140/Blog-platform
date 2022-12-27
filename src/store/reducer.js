const initialState = {}
const reducer = (state, action) => {
  if (state === undefined) {
    return initialState
  }

  switch (action.type) {
    case 'LOG_IN': {
      localStorage.setItem(
        'loggedData',
        JSON.stringify({
          ...action.data,
          isLoggedIn: true,
        })
      )
      console.log('action', action)
      const newObj = {
        ...action.data,
        isLoggedIn: true,
      }
      return {
        ...state,
        ...newObj,
      }
    }
    case 'LOG_OUT':
      localStorage.setItem(
        'loggedData',
        JSON.stringify({
          isLoggedIn: false,
        })
      )
      return {
        ...JSON.parse(localStorage.getItem('loggedData')),
      }

    default:
      return state
  }
}
export default reducer
