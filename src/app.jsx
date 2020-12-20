import React, { useEffect, useState, useCallback } from 'react';
import styles from './app.module.css';
import SearchHeader from './components/search_header/search_header';
import VideoDetail from './components/video_detail/video_detail';
import VideoList from './components/video_list/video_list';

function App({ youtube }) {

  const [videos, setVideos] = useState([]); // 함수형 컴포넌트의 state 선언 방법
  const [selectedVideo, setSelectedVideo] = useState(null);

  const selectVideo = (video) => {
    setSelectedVideo(video);
  };

  const search = useCallback(query => {
    youtube
      .search(query)
      .then(videos => {
        setVideos(videos);
        setSelectedVideo(null);
      });
  }, [youtube]);

  useEffect(() => {
    youtube
      .mostPopular()
      .then(videos => setVideos(videos));
  }, [youtube]); // 두번 째 인자로 빈배열을 주면 컴포넌트가 마운트 될 때 한 번만 호출

  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} />
      <section className={styles.content}>
        {selectedVideo && (
          <div className={styles.detail}>
            <VideoDetail video={selectedVideo} />
          </div>
        )}
        <div className={styles.list}>
          <VideoList
            videos={videos}
            onVideoClick={selectVideo}
            display={selectedVideo ? `list` : `grid`}
          />
        </div>
      </section>
    </div>
  )
}

export default App;
