export default {
  platform: "qqmusic",  // 平台名称
  version: "1.0.0",     // 插件版本
  author: "SHIN",       // 作者
  homepage: "https://github.com/shenxin1106/musicfree-qqmusic-plugin",  // 插件主页（可以自定义）

  // 搜索函数
  search: async (query, type) => {
    const res = await fetch(
      `https://api.i-meto.com/meting/api/?server=tencent&type=search&format=json&keyword=${encodeURIComponent(query)}`
    );
    const data = await res.json();

    // 返回搜索结果
    return data.map(item => ({
      id: item.url,        // 歌曲ID，后面用来获取播放地址
      name: item.name,     // 歌曲名称
      artist: item.artist, // 歌手名
      album: item.album,   // 专辑名
      duration: Number(item.duration) * 1000, // 歌曲时长（转换成毫秒）
      platform: "qqmusic", // 所属平台
      sourceUrl: item.url, // 歌曲播放链接
      artwork: item.pic,  // 歌曲封面
    }));
  },

  // 获取播放源
  getMediaSource: async (songId) => {
    return {
      url: songId, // 返回歌曲播放链接
      quality: "standard", // 播放质量
    };
  },
};
