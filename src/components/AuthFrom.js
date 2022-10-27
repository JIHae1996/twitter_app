import React, { useState } from 'react'
import {authService} from 'fbase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
function AuthFrom() {
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = e => {
    // console.log(e.target.name); 이벤트 객체에는 타겟속성이 있고, 그 안에는 네임과 벨류라는 속성이 있다.
    const {target: {name, value}} = e;
    // 네임과 벨류가 포함된 타겟 속성을 이벤트(e) 객체에서 가져온다 : 이벤트 객체에는 타겟과, 벨류라는 속성이 있기 때문에 사용을 한거다.
    if(name === "email"){
      setEmail(value);
      // 만약 "email" 에 입력을 하면 setEmail에 value 값을 입력한다.
    }else if(name === "password"){
      setPassword(value);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if(newAccount){
        //create newAccount
        data = await createUserWithEmailAndPassword(authService, email, password)
      }else{
        //log in
        data = await signInWithEmailAndPassword(authService, email, password)
        //async await : 서버에서 데이터 값을 가지고 올때까지 기다려주는 코드
      }
    //   console.log(data); //회원가입을 마친 사용자 정보 
    } catch (error) {
      setError(error.message);
    }
    //try {} catch (error) {} : 데이터 전송 실패시 ex이미 있는 아이디 등등  try시도를 실패하면 에러 메시지가 뜨게 한다.
  }

  const toggleAccount = () => setNewAccount((prev) => !prev);


  return (
    <>
    <form onSubmit={onSubmit}>
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
    </span>
    </>
  )
}

export default AuthFrom