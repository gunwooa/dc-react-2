import React, { useEffect, useState } from 'react';
import './app.css';
import VideoList from './components/video_list/video_list';

function App() {
  const [videos, setVideos] = useState([]); // 함수형 컴포넌트의 state 선언 방법

  useEffect(() => {
    console.log('useEffect');
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=AIzaSyDIw57i69CFDJbaWBB7Ql7iL7c6uapDUZg",
      requestOptions
    )
      .then(response => response.json()) // 응답을 json으로 변환
      .then(result => setVideos(result.items))
      .catch(error => console.log('error', error));

  }, []); // 두번 째 인자로 빈배열을 주면 컴포넌트가 마운트 될 때 한 번만 호출

  return <VideoList videos={videos} />;
}

export default App;
