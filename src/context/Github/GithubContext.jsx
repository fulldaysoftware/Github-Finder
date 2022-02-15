import { createContext } from "react";
import React, { useReducer } from 'react';
import githubReducer from "./GithubReducer";

export const GithubContext = createContext();


function GithubContextProvider({children}) {
    const initialState = {
        users: [],
        user:{},
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    const setLoading = ()=>{
        dispatch({type: "SET_SPINNER"})
    }
    const fetchUser = (userName)=>{
        setLoading()
        fetch(`https://api.github.com/search/users?q=${userName}`)
          .then(response=>response.json())
          .then((data) => {
            const {items} = data
              dispatch({
                type: "GET_USERS",
                payload: items
              })    
            }).catch(err=>console.log(err))
    }
    const clearSearch = ()=>{
      dispatch({type: "CLEAR"})
    }
    const viewUser = (userName)=>{
        setLoading()
        fetch(`https://api.github.com/users/${userName}`)
          .then(response=>response.json())
          .then((data) => {
              dispatch({
                type: "GET_USER",
                payload: data
              })    
            }).catch(err=>console.log(err))
    }

  return <GithubContext.Provider value={{
      users: state.users,
      loading: state.loading,
      user: state.user,
      fetchUser,
      setLoading,
      clearSearch,
      viewUser
  }}>
      {children}
  </GithubContext.Provider>;
}

export default GithubContextProvider;
