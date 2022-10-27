import React, { useEffect, useState } from 'react'
import AppRouter from "Router"
import {authService} from 'fbase';
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      console.log(user);
      if (user) {
        setIsLoggedIn(user);
        setUserObj(user);
        // const uid = user.uid;
        // 로그인한 유저가 있을때의 상황
      } else {
        setIsLoggedIn(false);
        //로그아웃한 유저가 있을때의 상황
      }
      setInit(true);
    });
  }, [])
  //useEffect(() => {} 실행부분  []) 업데이트
  //console.log(authService.currentUser); //currentUser는 현재 로그인한 사람 확인 함수 

  return (
    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "initializing..."}
    <footer>&copy; {new Date().getFullYear()} Twitter app </footer>
    </>
  );
  }

export default App;
