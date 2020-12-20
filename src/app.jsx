import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import SearchHeader from './components/search_header/search_header';
import VideoList from './components/video_list/video_list';

function App({ youtube }) {
  const [videos, setVideos] = useState([]); // 함수형 컴포넌트의 state 선언 방법

  const search = query => {
    youtube
      .search(query)
      .then(videos => setVideos(videos));
  };

  useEffect(() => {
    youtube
      .mostPopular()
      .then(videos => setVideos(videos));
  }, []); // 두번 째 인자로 빈배열을 주면 컴포넌트가 마운트 될 때 한 번만 호출

  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} />
      <VideoList videos={videos} />
    </div>
  )
}

export default App;
