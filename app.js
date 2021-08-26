const ajax = new XMLHttpRequest();
// ajax는  new XMLHttpRequest가 반환하는 값을 저장하는 변수

const container = document.getElementById('root');
const content = document.createElement('div');

const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';


function getData(url) {
  ajax.open('GET', url, false);   // open의 메소드는 첫번째 string, 두번째는 url 문자열 세번째는 async: boolean (false: 동기로 가져옴)
  ajax.send(); // 데이터를 가져옴

  return JSON.parse(ajax.response);
}

const newsFeed = getData(NEWS_URL);
const ul = document.createElement('ul');

window.addEventListener('hashchange', function() {
  const id = location.hash.substr(1);
  const newsContent = getData(CONTENT_URL.replace('@id', id));

  container.innerHTML = `
    <h1>${newsContent.title}</h1>

    <div>
      <a href="#">목록으로</a>
    </div>
  `
});

const newsList = [];

newsList.push('<ul>');

for(let i = 0; i < newsFeed.length; i++) {
  newsList.push(`
    <li>
      <a href=#${newsFeed[i].id}>
        ${newsFeed[i].title} (${newsFeed[i].comments_count})
      </a>
    </li>
  `)
}
newsList.push('</ul>');

container.innerHTML = newsList.join('');