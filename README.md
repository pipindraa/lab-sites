# Лабораторная работа «Компьютерные сети»: развертывание веб-сайтов разными способами

**Цель:** развернуть 3 простых сайта разными технологиями на бесплатном хостинге и описать процесс.

**Что в папке `lab-sites`:**

| №   | Папка         | Тип                                     | Технология                  |
| --- | ------------- | --------------------------------------- | --------------------------- |
| 1   | `site-node`   | Многостраничник + JSON API              | Node.js 20 + Express        |
| 2   | `site-php`    | Одностраничник-лендинг с формой         | Чистый PHP 8 без фреймворка |
| 3   | `site-aspnet` | «Еще что-нибудь»: 2 страницы + JSON API | ASP.NET Core 10 Minimal API |

Схема развертывания:

```
GitHub (pipindraa/lab-sites) ──render.yaml──→ Render Blueprint ─┬─ lab-node   → https://lab-node-….onrender.com
                                                                 ├─ lab-php    → https://lab-php-….onrender.com
                                                                 └─ lab-aspnet → https://lab-aspnet-….onrender.com
```

---

## 0. Регистрации

1. **github.com** — Sign Up (email + пароль).
2. **render.com** — **Sign up with GitHub** (отдельный пароль не нужен).

## 1. Залить код на GitHub

Создать пустой репозиторий: github.com/new → имя `lab-sites`, Public, без галочек → Create repository.

```powershell
cd C:\Users\kiril\lab-sites
git remote add origin https://github.com/pipindraa/lab-sites.git
git push -u origin main
```

> GitHub больше не принимает пароль от аккаунта при push — нужен Personal Access Token:
> Settings → Developer settings → Personal access tokens → Generate new (галочка `repo`).

## 2. Что уже подготовлено для хостинга
- `site-node/package.json` — команды `npm install` / `npm start`. Сервер слушает порт из переменной `PORT`.
- `site-php/Dockerfile` — образ `php:8.3-apache`; при старте Apache переводится на порт `$PORT` (Render требует слушать именно его).
- `site-aspnet/Dockerfile` — двухстадийная сборка (sdk → aspnet); запуск через `--urls http://+:$PORT`.
- `render.yaml` в корне — Blueprint: описывает все 3 сервиса (имя, runtime, где код, как собирать). Пути `dockerfilePath` считаются от корня репозитория.

## 3. Деплой одной кнопкой

1. dashboard.render.com → New → **Blueprint** → выбрать `pipindraa/lab-sites`.
2. Заполнить:
   - **Blueprint Name:** `lab-sites` (любое уникальное имя);
   - **Branch:** `main`;
   - **Blueprint Path:** `render.yaml` (файл в корне репо, оставить как есть).
3. Нажать Deploy/Apply. Render покажет 3 сервиса (lab-node, lab-php, lab-aspnet) — подтвердить.
4. Ждать 5–10 минут (Docker для PHP/ASP.NET собирается дольше всего).

## 4. Проверка

- Открываются 3 URL вида `https://lab-NAME-xxxx.onrender.com`.
- `…/api/info` у Node и ASP.NET возвращают JSON (у Node также `/`, `/about`, `/contacts`).
- Формы на PHP (одностраничник) и на Node принимают POST и показывают «Спасибо».
- Бесплатный тариф засыпает без трафика (первый запрос после паузы идёт ~30–60 сек) — для демо это нормально, на защите просто открыть ссылки заранее.

## 5. Типовые ошибки

| Ошибка                           | Причина → решение                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------------ |
| Blueprint не находит Dockerfile  | `dockerfilePath` должен быть от корня репо (`./site-php/Dockerfile`)                       |
| Сервис упал с ошибкой порта      | приложение слушает фиксированный порт вместо `$PORT` → смотреть `Dockerfile` / `server.js` |
| 404/пустая страница после деплоя | проверить Logs сервиса и что код запушен (`git push`)                                      |

## Локальный прогон (без хостинга)

```bash
# №1 (многостраничник):
cd site-node && npm install && npm start      # → http://localhost:3001
# №2 (одностраничник):
cd site-php && php -S localhost:3002          # → http://localhost:3002
# №3 (API):
cd site-aspnet && dotnet run                   # → http://localhost:5001 (порт из лога)
```

