import React, { useState } from 'react'
import {authService} from 'fbase';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import AuthFrom from 'components/AuthFrom';

function Auth() {
  const onSocialClick = (e) => {
    // console.log(e.target.name)
    const {target: {name}} = e;
    let provider
    if(name === "google"){
      provider = new GoogleAuthProvider();
    }else if(name === "github"){
      provider = new GithubAuthProvider();
    }
    const data = signInWithPopup(authService, provider);
    // console.log(data);
  }
  // setNewAccount를 이전값에서 !이전= 부정값 으로 바꾼다.


  return (
    <div>
      {/* <form onSubmit={onSubmit}>
        <input type="email" placeholder='Email' required
        name="email" value={email} onChange={onChange}/>
        <input type="password" placeholder='Password' required 
        name="password" value={password} onChange={onChange}/>
        <input type="submit" 
          value={newAccount ? "Create Account" : "Log In"}/>
          {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sing IN" : "Create Account"}
      </span> */}
      {/* onSubmit={onSubmit}  onSubmit 이벤트가 발생할때 onSubmit 함수를 호출해라
      onChange={onChange}도 마찬가지  
      value={email} 위의 const의 email 값을 value 값에 입력해라*/}
      <AuthFrom />
      <div>
        <button onClick={onSocialClick} name="google"> Continue with Google</button>
        <button onClick={onSocialClick} name="github">Continue with Github</button>
      </div>
    </div>
  )
}

export default Auth