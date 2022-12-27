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

export function articlesData(id) {
  return async (dispatch) => {
    const response = await fetch(`https://blog.kata.academy/api/articles/?offset=${id}`)
    const jsonSearch = await response.json()
    if (response.status !== 200) {
      dispatch({
        type: 'ARTICLES_NO_LOAD',
      })
    }
    dispatch({
      type: 'GET_LIST_ARTICLES',
      data: jsonSearch.articles,
    })
  }
}

export function setFavorite(slug, tokenUser) {
  if (!tokenUser) {
    return
  }
  const authorizationOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${tokenUser}`,
    },
  }
  return async (dispatch) => {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, authorizationOptions)
    const result = await response.json()

    let favoriteOptions
    if (result.article.favorited) {
      favoriteOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${tokenUser}`,
        },
      }
    } else {
      favoriteOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${tokenUser}`,
        },
      }
    }

    const resp = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, favoriteOptions)
    let res = await resp.json()

    dispatch({
      type: 'FAVORITE_ARTICLE',
      data: res.article,
    })
  }
}
