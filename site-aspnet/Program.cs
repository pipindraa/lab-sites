// Сайт №3: ASP.NET Core — минимальное API + 2 страницы
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

string Layout(string title, string body) =>
"<!DOCTYPE html><html lang=\"ru\"><head><meta charset=\"UTF-8\">" +
"<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>" + title + "</title>" +
"<style>body{font-family:system-ui,Arial;margin:0;background:#fff7ed;color:#222}" +
"header{background:#c2410c;color:#fff;padding:20px;text-align:center}" +
"header nav a{color:#fff;margin:0 10px}main{max-width:750px;margin:20px auto;background:#fff;" +
"padding:20px;border-radius:12px;border:1px solid #fed7aa}footer{text-align:center;color:#666;padding:14px}</style>" +
"</head><body><header><h1>Сайт №3 — ASP.NET Core</h1>" +
"<nav><a href=\"/\">Главная</a><a href=\"/about\">О нас</a><a href=\"/api/info\">API</a></nav></header>" +
"<main>" + body + "</main><footer>ASP.NET " + Environment.Version + " · Лаба «Компьютерные сети» 2026</footer></body></html>";

app.MapGet("/", () => Results.Content(Layout("Главная",
  $"<h2>Главная</h2><p>Минимальное API без MVC/Razor — весь сайт в одном Program.cs.</p><p>Время сервера: <b>{DateTime.Now:dd.MM.yyyy HH:mm:ss}</b></p>"), "text/html; charset=utf-8"));

app.MapGet("/about", () => Results.Content(Layout("О нас",
  "<h2>О нас</h2><ul><li>GET / — главная</li><li>GET /about — эта страница</li><li>GET /api/info — JSON</li></ul>"), "text/html; charset=utf-8"));

app.MapGet("/api/info", () => Results.Json(new {
  site = "site-aspnet",
  stack = "ASP.NET Core Minimal API",
  time = DateTimeOffset.UtcNow,
  framework = Environment.Version.ToString()
}));

app.Run();
