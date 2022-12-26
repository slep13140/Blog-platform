export function currentUser(option) {
  return async (dispatch) => {
    const response = await fetch('https://blog.kata.academy/api/user', option)
    const jsonSearch = await response.json()
    dispatch({
      type: 'LOG_IN',
      data: jsonSearch.user,
    })
  }
}

export function logOut() {
  return { type: 'LOG_OUT' }
}
