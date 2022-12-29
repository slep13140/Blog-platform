const initialState = {
  isLoggedIn: false,
  loading: true,
  error: false,
  articlesData: [],
}
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
          ...state,
          isLoggedIn: false,
        })
      )
      return {
        ...JSON.parse(localStorage.getItem('loggedData')),
      }
    case 'GET_LIST_ARTICLES': {
      const newArticles = [...state.articlesData, ...action.data]
      return {
        ...state,
        loading: false,
        articlesData: newArticles,
      }
    }
    case 'ARTICLES_NO_LOAD':
      return { ...state, error: true }
    case 'FAVORITE_ARTICLE': {
      const { slug, favorited, favoritesCount } = action.data
      const favoriteArticle = state.articlesData.map((item) => {
        if (slug === item.slug) {
          item.favorited = favorited
          item.favoritesCount = favoritesCount
        }
        return item
      })
      const newArticlesData = [...favoriteArticle]

      return {
        ...state,
        articlesData: newArticlesData,
      }
    }
    case 'EDIT_ARTICLE': {
      const newArticle = state.articlesData.map((item) => {
        if (action.data.slug === item.slug) {
          item = action.data
        }
        return item
      })
      const newArticles = [...newArticle]
      return {
        ...state,
        loading: false,
        articlesData: newArticles,
      }
    }
    case 'NEW_ARTICLE': {
      const newArticles = [{ ...action.data }, ...state.articlesData]
      return {
        ...state,
        loading: false,
        articlesData: newArticles,
      }
    }
    case 'DEL_ARTICLE': {
      const newArticles = [...action.data]
      return {
        ...state,
        loading: false,
        articlesData: newArticles,
      }
    }
    default:
      return state
  }
}
export default reducer
