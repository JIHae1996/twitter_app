import React, { useEffect,useState } from 'react';
import {db, storage} from 'fbase';
import { async } from '@firebase/util';
import { collection, addDoc, query, getDocs, onSnapshot, orderBy } from "firebase/firestore";
import Tweet from '../components/Tweet';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import TweetFactory from 'components/TweetFactory';

function Home({userObj}) {
  // console.log(userObj);
  const [tweet, setTweet] = useState(""); 
  const [tweets, setTweets] = useState([]); 
  const [attachment, setAttachment] = useState("");
  /*
  attachment
  const getTweets = async () => {
    const q = query(collection(db, "tweets"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      //setTweets(prev => [doc.data(), ...prev]) : 이렇게하면 아이디까지 안보이기 때문에 아이디까지 보이려면 아래 수식으로
      const tweetObject = {...doc.data(), id:doc.id }//기존값에다가 아이디만 추가 
      setTweets(prev => [tweetObject, ...prev])//트윗 순서 변경 , 새로운 트윗을 가장 먼저 보여준다
      // 만약 새로운 트윗이 가장 뒤로 보이고 싶으면 : [...prev, tweetObject] 이렇게 순서 변경
    });
  }
  //async() => {await}는 useEffect와 함께 쓸수없다.
  // 데이터를 가지고 오는 과정은 비동기식 (데이터를 서버에서 다 가져올때까지 동기를 잠깐 멈추는것) 과정이
  // 필요하기 때문에  useEffect를 사용전 async() => {await}를 미리 사용해준다.
  */

  useEffect( () => { //실시간 데이터베이스 문서 가져오기
    // getTweets();
    const q = query(collection(db, "tweets"),
              orderBy("createAt", "desc"));//내림차순 순서 정하기 
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({...doc.data(), id:doc.id});
      });
      // console.log(newArray);
      setTweets(newArray);
    });
  },[]);
  //실질적인 데이터 data는 getTweets이라는 함수를 이용해서 가지고온다.

  // console.log(tweets);

  // 벨류가 포함된 타겟 속성을 이벤트(e) 객체에서 가져온다 : if문이 필요없이
  // 바로 다이렉트로 전송할수 있는 경우 

  
 
  return (
    <>
    <TweetFactory />
    <div>
    {tweets.map(tweet => (
      <Tweet 
      key={tweet.id}
      tweetObj={tweet}
      isOwner={tweet.createId === userObj.uid}
      />
    ))}
    </div>
    </>
  )
}

export default Home