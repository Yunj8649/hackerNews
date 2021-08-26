const ajax = new XMLHttpRequest();
// ajax는  new XMLHttpRequest가 반환하는 값을 저장하는 변수

const container = document.getElementById('root');
const content = document.createElement('div');

const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

ajax.open('GET', NEWS_URL, false);
// open의 메소드는 첫번째 string, 두번째는 url 문자열 세번째는 async: boolean (false: 동기로 가져옴)

ajax.send();
// 데이터를 가져옴

// 응답값을 json형태인 객체로 변환
const newsFeed = JSON.parse(ajax.response);
console.log(newsFeed);

// 정적으로 태그 추가
// document.getElementById('root').innerHTML = `
// <ul>
//   <li>${newsFeed[0].title}</li>
//   <li>${newsFeed[1].title}</li>
//   <li>${newsFeed[2].title}</li>
// </ul>
// `

// 동적으로 태그 추가
const ul = document.createElement('ul');

window.addEventListener('hashchange', function() {
  const id = location.hash.substr(1);

  console.log(id, CONTENT_URL.replace('@id', id))

  ajax.open('GET', CONTENT_URL.replace('@id', id), false);
  ajax.send();

  const newsContent = JSON.parse(ajax.response);
  console.log('newsContent :', newsContent)

  const title = document.createElement('h1');

  title.innerHTML = newsContent.title;
  content.appendChild(title);
});

for(let i = 0; i < newsFeed.length; i++) {
  const li = document.createElement('li');
  const a = document.createElement('a');
 
  a.href = `#${newsFeed[i].id}`;
  a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`;

  li.appendChild(a);
  ul.appendChild(li);
}

container.appendChild(ul);
container.appendChild(content);