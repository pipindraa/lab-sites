const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('home', { title: 'Главная', client: req.headers['x-forwarded-for'] || req.socket.remoteAddress }));

app.get('/about', (req, res) => res.render('about', { title: 'О нас' }));

app.get('/contacts', (req, res) => res.render('contacts', { title: 'Контакты' }));

app.post('/contacts', (req, res) => {
  const { name = 'аноним', msg = '' } = req.body;
  res.render('thanks', { title: 'Спасибо', name, msg });
});

app.get('/api/info', (req, res) => res.json({
  site: 'site-node', stack: 'Node.js + Express + EJS',
  time: new Date().toISOString(), uptime_sec: Math.round(process.uptime())
}));

app.listen(PORT, () => console.log(`[node] Express слушает 127.0.0.1:${PORT} (за nginx)`));