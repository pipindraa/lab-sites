# lab-sites — 3 мини-сайта + методичка

| № | Папка | Тип |
|---|-------|-----|
| 1 | `site-node` | Многостраничник на Express |
| 2 | `site-php` | Одностраничник на чистом PHP |
| 3 | `site-aspnet` | API + страницы на ASP.NET Core |

Быстрый старт (Windows, локально):

```powershell
# №1:
cd site-node; npm install; npm start   # http://localhost:3001
# №2:
cd site-php; php -S localhost:3002     # http://localhost:3002
# №3:
cd site-aspnet; dotnet run             # порт из лога
```

Деплой на сервер — см. `МЕТОДИЧКА.md`, конфиги — в `deploy/`, бесплатный хостинг — `render.yaml`.
