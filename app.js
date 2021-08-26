const ajax = new XMLHttpRequest();
// ajax는  new XMLHttpRequest가 반환하는 값을 저장하는 변수

const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
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

for(let i = 0; i < newsFeed.length; i++) {
  const li = document.createElement('li');
  li.innerHTML = newsFeed[i].title;
  ul.appendChild(li);
}
document.getElementById('root').appendChild(ul);