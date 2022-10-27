import React, { useEffect, useState } from 'react'
import { authService, db } from 'fbase'
import {storage} from 'fbase';
import{useNavigate} from "react-router-dom"
import { collection, addDoc, query, getDocs, onSnapshot, where, orderBy } from "firebase/firestore";
import Tweet from 'components/Tweet';
import { v4 as uuidv4 } from 'uuid';
import { updateProfile } from 'firebase/auth';
import { async } from '@firebase/util';

function Profiles({userObj}) {
  const [tweets, setTweets] = useState([]); 
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  

  const onLogOutClick = () => {
    authService.signOut();
    navigate('/'); //홈으로 이동 즉 리다이렉트 기능이다.
  }

  const getMyTweets = async () => {
    const q = query(collection(db, "tweets"),
                    where("createId", "==" , userObj.uid), 
                    orderBy("createAt","asc"))
                    // asc오름차순
    const querySnapshot = await getDocs(q);
    const newArray = [];
    querySnapshot.forEach((doc) => {
      newArray.push({...doc.data(), id:doc.id})//기존값에다가 아이디만 추가 
    });
    setTweets(newArray);
  }

  useEffect( () => { //실시간 데이터베이스 문서 가져오기
    getMyTweets();
    // const q = query(collection(db, "tweets"),
    //                 where("createId", "==" , userObj.uid), 
    //                 orderBy("createAt","asc"))
    //                 // asc오름차순
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   const newArray = [];
    //   querySnapshot.forEach((doc) => {
    //     newArray.push({...doc.data(), id:doc.id});
    //   });
    //   // console.log(newArray);
    //   setTweets(newArray);
    // });
  },[]);
    // useEffect(() => {},[]); 를 사용해서 로그인한 트윗의 사진만 가지고 온다 

    const onChange = e => {
      const {target: {value}} = e;
      setNewDisplayName(value);
    }
  
    const onSubmit = async (e) => {
      e.preventDefault();
      if(userObj.displayName != newDisplayName){
        await updateProfile(userObj, {displayName: newDisplayName, photoURL: ""});
      }  
    }
      

  return (
    <>
    <form onSubmit={onSubmit}>
      <input type="text" placeholder='Display name' 
      onChange={onChange} value={newDisplayName} />
      <input type="submit" value="Update Profile" />
      {/* //기존에 로그인한 사람의 닉이 보이게  */}
    </form>
    <div>
    <button onClick={onLogOutClick}>Log Out</button>
    <img src={attachment} width='50' height='50' />
        <button onClick={onClearAttachment}>Clear</button>
    </div>
    <div>
      {tweets.map(tweet => (
        <Tweet 
        key={tweet.Id}
        tweetObj={tweet}
        isOwner={tweet.createId === userObj.uid}
        />
      ))}
    </div>
    </>
  )
}

export default Profiles