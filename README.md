# 🚀 Elixir-React-server

Fullstack приложение с **Elixir + Phoenix** бэкендом и **React** фронтендом.

> Мощный сервер на Elixir + современный React интерфейс для быстрой разработки веб-приложений

---

## 📊 Стек технологий

| Компонент | Технологии | Процент |
|-----------|-----------|---------|
| **Backend** | ![Elixir](https://img.shields.io/badge/Elixir-4B275F?style=flat) ![Phoenix](https://img.shields.io/badge/Phoenix-FD4F00?style=flat) | 73.7% |
| **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | 13.4% |
| **Стили** | ![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3) ![HTML](https://img.shields.io/badge/HTML-E34C26?style=flat&logo=html5) | 10.2% + 2.7% |

---

## 🚀 Быстрый старт

### Требования
- **Elixir** 1.14+
- **Node.js** 16+
- **PostgreSQL** (опционально)

### Установка и запуск

#### 1️⃣ Бэкенд (Elixir + Phoenix)

```bash
cd backend
mix setup          # Установка зависимостей
mix phx.server     # Запуск сервера на localhost:4000
```

#### 2️⃣ Фронтенд (React)

```bash
cd frontend
npm install        # Установка зависимостей
npm start          # Запуск на localhost:3000
```

---

## 📁 Структура проекта

```
Elixir-React-server/
├── backend/                    # Phoenix сервер
│   ├── lib/
│   ├── mix.exs               # Зависимости Elixir
│   └── config/
├── frontend/                   # React приложение
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

---

## 🛠️ Основные команды

### Backend (Elixir/Phoenix)

| Команда | Описание |
|---------|---------|
| `mix phx.server` | Запуск dev сервера |
| `mix test` | Запуск тестов |
| `mix phx.new` | Создание нового Phoenix проекта |
| `mix ecto.migrate` | Выполнить миграции БД |

### Frontend (React)

| Команда | Описание |
|---------|---------|
| `npm start` | Запуск dev сервера (localhost:3000) |
| `npm test` | Запуск тестов |
| `npm run build` | Продакшн сборка |
| `npm run eject` | Выход из Create React App (⚠️ необратимо) |

---

## 🔗 Доступные сервисы

- **API Сервер**: [http://localhost:4000](http://localhost:4000)
- **React App**: [http://localhost:3000](http://localhost:3000)

---

## 📚 Полезные ссылки

### Elixir & Phoenix
- 🌐 [Phoenix Framework](https://www.phoenixframework.org/)
- 📖 [Phoenix Docs](https://hexdocs.pm/phoenix)
- 💬 [Elixir Forum](https://elixirforum.com/c/phoenix-forum)
- 📚 [Elixir Guides](https://elixir-lang.org/getting-started/introduction.html)

### React
- ⚛️ [React Documentation](https://react.dev)
- 📖 [Create React App Docs](https://create-react-app.dev)
- 🎨 [React Best Practices](https://react.dev/learn)

---

## 🚀 Deployment

### Phoenix (Heroku, Fly.io, Render)
```bash
# Подробнее в документации Phoenix
https://hexdocs.pm/phoenix/deployment.html
```

### React (Vercel, Netlify, AWS S3)
```bash
npm run build      # Создать оптимизированную сборку
# Распубликовать содержимое папки build
```

---

## 🤝 Как внести вклад

1. **Fork** репозиторий
2. Создайте **feature branch** (`git checkout -b feature/amazing-feature`)
3. Сделайте **commit** (`git commit -m 'Add amazing feature'`)
4. **Push** на branch (`git push origin feature/amazing-feature`)
5. Откройте **Pull Request**

---

## 📝 Лицензия

Этот проект лицензирован под MIT License - смотри файл [LICENSE](LICENSE) для деталей.

---

## 💡 Советы и рекомендации

- ✅ Используйте **live reload** для быстрой разработки
- ✅ Пишите **тесты** для обеих частей приложения
- ✅ Следуйте **best practices** Elixir и React
- ✅ Используйте **environment переменные** для конфигурации
- ✅ Регулярно обновляйте зависимости

---

## ❓ FAQ

**Q: Как подключить БД?**
A: Отредактируйте `backend/config/dev.exs` и используйте `mix ecto.migrate`

**Q: Как настроить CORS?**
A: В Phoenix используйте plug Corsica в файле endpoint.ex

**Q: Как деплоить оба приложения?**
A: Рекомендуется использовать Docker для контейнеризации обоих сервисов

---

**Автор**: [@mrbezarate](https://github.com/mrbezarate)  
**Последнее обновление**: 2026-05-18
