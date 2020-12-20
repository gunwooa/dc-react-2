class Youtube {
  constructor(key) {
    this.key = key;
    this.getRequestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  }

  async mostPopular() {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${this.key}`,
      this.getRequestOptions
    );
    const result = await response.json();
    return result.items;
  }

  async search(query) {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${this.key}`,
      this.requestOptions
    );
    const result = await response.json();
    return result.items.map(item => ({ ...item, id: item.id.videoId }));
  }

  // none async 일 때 함수
  // search(query) {
  //   return fetch(
  //     `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${this.key}`,
  //     this.requestOptions
  //   )
  //     .then(response => response.json())
  //     // .then(result => {
  //     //   return result.items.map(item => {
  //     //     return { ...item, id: item.id.videoId };
  //     //   })
  //     // })
  //     .then(result =>
  //       result.items.map(item => ({ ...item, id: item.id.videoId }))
  //     );
  // }
}

export default Youtube;