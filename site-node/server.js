// Сайт №2: многостраничник на Node.js + Express
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.APP_PORT || 3000; // внутренний порт; наружу (80/$PORT) смотрит nginx

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const layout = (title, body) => `<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<link rel="stylesheet" href="/style.css"></head><body>
<header><h1>Сайт №1 — Node.js + Express</h1><nav>
<a href="/">Главная</a><a href="/about">О нас</a><a href="/contacts">Контакты</a><a href="/api/info">API</a>
</nav></header><main>${body}</main><footer>Node ${process.version} · Лаба «Компьютерные сети» 2026</footer></body></html>`;

app.get('/', (req, res) => res.send(layout('Главная', `
  <h2>Главная</h2><p>Это многостраничный сайт на Express. Каждая страница — отдельный route.</p>
  <p>Текущее серверное время: <b>${new Date().toLocaleString('ru-RU')}</b></p>`)));

app.get('/about', (req, res) => res.send(layout('О нас', `
  <h2>О нас</h2><p>Демо для методички: показываем маршрутизацию, статику и JSON API.</p>
  <ul><li>GET / — главная</li><li>GET /about — эта страница</li><li>GET /contacts — форма</li><li>GET /api/info — JSON</li></ul>`)));

app.get('/contacts', (req, res) => res.send(layout('Контакты', `
  <h2>Контакты</h2>
  <form method="POST" action="/contacts">
    <label>Имя: <input name="name" required></label><br><br>
    <label>Сообщение:<br><textarea name="msg" rows="4" cols="40" required></textarea></label><br><br>
    <button>Отправить</button>
  </form>`)));

app.post('/contacts', (req, res) => {
  const { name = 'аноним', msg = '' } = req.body;
  // Экранируем чтобы не было XSS в демо
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  res.send(layout('Спасибо', `<h2>Спасибо, ${esc(name)}!</h2><p>Сообщение получено: «${esc(msg)}»</p><a href="/">На главную</a>`));
});

// «Что-нибудь еще»: простой JSON API
app.get('/api/info', (req, res) => res.json({
  site: 'site-node', stack: 'Node.js + Express',
  time: new Date().toISOString(), uptime_sec: Math.round(process.uptime())
}));

app.listen(PORT, () => console.log(`[node] Express слушает 127.0.0.1:${PORT} (за nginx)`));
