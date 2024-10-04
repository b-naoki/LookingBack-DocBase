// 特定のドキュメントを取得する
// templateGet.jsで取得したドキュメントを元に、投稿ページを生成します。
// タイトルを変更します。

const axios = require('axios');
require('dotenv').config();

async function docbaseGetAndPost(today) {

  const url = `https://api.docbase.io/teams/u001/posts?q=title:振り返り_テンプレート`;
  const token = process.env.DOCBASE_TOKEN;

  try {
    const response = await axios.get(url, {
      headers: {
        'X-DocBaseToken': token
      }
    });

    const data = response.data;
    const post = data.posts[0];

    const postUrl = 'https://api.docbase.io/teams/u001/posts';
    const postData = {
      title: newTitle,
      body: post.body,
      draft: post.draft,
      tags: post.tags.map(tag => tag.name),
      scope: post.scope,
      notice: false
    };

    const newPostResponse = await axios.post(postUrl, postData, {
      headers: {
        'X-DocBaseToken': token,
        'Content-Type': 'application/json'
      }
    });

    const newPostData = newPostResponse.data;
    console.log('新規投稿のデータ:', newPostData);

  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = docbaseGetAndPost;