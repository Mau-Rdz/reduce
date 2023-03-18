//@ts-nocheck
import React, { FormEvent, useReducer, useState } from "react";
import useForm from "../../hooks/useForm.ts";
import './UseForm.css'

interface LogStatus {
  username: string,
  status: boolean,
}

interface LoginPayload {
  username: string,
  password: string
}

const initialState: LogStatus = {
  username: "",
  status: false,
  error: false
}

const initialStatePayload: LoginPayload = {
  username: "",
  password: "",
}


type LogAction = 
| { type: "login", payload: LoginPayload } 
| { type: "logout" };

const Login = (state: LogStatus, action: LogAction): LogStatus => {
  switch (action.type){
    case 'login':
      const { username, password } = action.payload
      if(username === 'Admin' && password === '12345'){
        return {
          username,
          status: true,
          error: false
        }
      }
      else{
        return {
          ...initialState,
          status: false,
          error: true
        }
      }
    case 'logout':
      return {
        ...initialState,
        status: false,
        error: false
      }
    default:
      return state;
  }
}


function UseForm() {
  const [state, dispatch] = useReducer(Login,initialState);
  const [{ username, password }, handleChange] = useForm(initialStatePayload);
  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(state.status){
      dispatch({ type: 'logout' })
    }else{
      dispatch({ type: 'login', payload: {username, password} })
      console.log(state)
    }
  };

  return (
    <form onSubmit={login}>
      <br />
      <label className="label">username</label>
      <input
        className="text"
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
      />
      <br />
      <br />
      <label className="label" >password</label>
      <input
        className="text"
        type="text"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <br />
      <br />
      { !state.status === true ? <input className="button" type="submit" value="login" />  : <input className="button" type="submit" value="logout" /> }
      <br />
      {!state.error ? state.status ? (<h4 className="success">
          Welcome {state.username}
        </h4>) : ' ' : <h4 className="error"> ERROR </h4>}
    </form>
  );
}

export default UseForm;
