<?php
// Сайт №2: ОДНОСТРАНИЧНИК на чистом PHP (без фреймворков)
function esc($s){ return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
$name = $_POST['name'] ?? '';
$msg  = $_POST['msg'] ?? '';
$sent = ($_SERVER['REQUEST_METHOD'] === 'POST');
?>
<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Лаба КС — PHP одностраничник</title><link rel="stylesheet" href="style.css"></head>
<body>
<header class="hero">
  <h1>Компьютерные сети — одностраничник на PHP</h1>
  <p>Сайт №2: весь сайт — один файл <code>index.php</code></p>
  <nav><a href="#about">О работе</a><a href="#stack">Стек</a><a href="#contacts">Контакты</a></nav>
</header>
<main>
  <section id="about">
    <h2>О работе</h2>
    <p>Цель лабы: показать развертывание сайтов разными способами на один сервер (nginx как reverse-proxy).</p>
    <p>Серверное время: <b><?= date('d.m.Y H:i:s') ?></b> · PHP: <?= esc(phpversion()) ?></p>
  </section>
  <section id="stack">
    <h2>Стек этого сайта</h2>
    <ul>
      <li>Чистый PHP, без фреймворков</li>
      <li>Один файл + один CSS — проще некуда</li>
      <li>На сервере работает через <code>php-fpm + nginx</code>, локально — через <code>php -S</code></li>
    </ul>
  </section>
  <section id="contacts">
    <h2>Контакты</h2>
    <?php if ($sent): ?>
      <p class="ok">Спасибо, <?= esc($name ?: 'аноним') ?>! Получено: «<?= esc($msg) ?>»</p>
    <?php endif; ?>
    <form method="POST" action="#contacts">
      <label>Имя: <input name="name" value="<?= esc($name) ?>" required></label><br><br>
      <label>Сообщение:<br><textarea name="msg" rows="4" cols="40" required><?= esc($msg) ?></textarea></label><br><br>
      <button>Отправить</button>
    </form>
  </section>
</main>
<footer>PHP <?= esc(phpversion()) ?> · Лаба «Компьютерные сети» 2026 · Запуск: <code>php -S localhost:3002</code></footer>
</body></html>
