# 🎨 Frontend - React UI

Современный фронтенд на React для полнофункционального веб-приложения с Elixir/Phoenix бэкендом.

---

## 🎯 О проекте

Этот модуль содержит пользовательский интерфейс, который взаимодействует с Phoenix API сервером (бэкендом на порту 4000). Фронтенд автоматически обновляется при изменении кода и легко масштабируется.

---

## 🚀 Быстрый старт

### Требования
- **Node.js** 16 или выше
- **npm** или **yarn**

### Установка и запуск

```bash
# Установить зависимости
npm install

# Запустить dev сервер (localhost:3000)
npm start

# Открыть в браузере
# http://localhost:3000
```

---

## 📝 Доступные команды

| Команда | Описание |
|---------|---------|
| `npm start` | Запуск dev сервера с live reload |
| `npm test` | Запуск тестов в watch режиме |
| `npm run build` | Создание оптимизированной production сборки |
| `npm run eject` | Выход из Create React App *(необратимо)* |

---

## 📁 Структура проекта

```
frontend/
├── src/
│   ├── components/          # Переиспользуемые React компоненты
│   ├── pages/               # Страницы приложения
│   ├── services/            # API клиент и бизнес-логика
│   ├── styles/              # CSS файлы
│   ├── App.js               # Главный компонент
│   ├── index.js             # Точка входа
│   └── ...
├── public/                  # Статичные файлы
├── package.json             # Зависимости проекта
└── README.md
```

---

## 🔌 Подключение к API

По умолчанию фронтенд подключается к локальному бэкенду на `http://localhost:4000`.

### Пример API запроса:

```javascript
// src/services/api.js
const API_URL = 'http://localhost:4000/api';

export const fetchData = async () => {
  try {
    const response = await fetch(`${API_URL}/data`);
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
  }
};
```

### Настройка CORS

Убедитесь, что на бэкенде настроен CORS для `http://localhost:3000`:

```elixir
# backend/lib/your_app_web/endpoint.ex
plug CORSPlug, origins: ["localhost:3000"]
```

---

## 🧪 Тестирование

```bash
# Запустить все тесты
npm test

# Запустить с покрытием
npm test -- --coverage

# Запустить конкретный файл
npm test -- ComponentName.test.js
```

---

## 🏗️ Production сборка

```bash
# Создать оптимизированную сборку
npm run build

# Папка `build` готова к развертыванию
```

### Развертывание на:
- **Vercel** - автоматический деплой из GitHub
- **Netlify** - свяжите репо и выберите `npm run build`
- **AWS S3 + CloudFront** - загрузите папку `build`

---

## 🛠️ Полезные инструменты

- **React DevTools** - расширение для браузера для отладки React
- **Redux DevTools** - если используете Redux
- **VS Code Extensions** - ES7+ React/Redux/React-Native snippets

---

## 🔄 Переменные окружения

Создайте файл `.env` в корне `frontend/`:

```env
REACT_APP_API_URL=http://localhost:4000/api
REACT_APP_ENV=development
```

Используйте в коде:
```javascript
const API_URL = process.env.REACT_APP_API_URL;
```

**Важно:** Переменные должны начинаться с `REACT_APP_` чтобы быть доступными в браузере.

---

## 🐛 Решение проблем

### `npm start` не работает
```bash
# Очистить кэш
rm -rf node_modules package-lock.json
npm install
npm start
```

### CORS ошибки
✅ Проверьте что бэкенд запущен на `http://localhost:4000`  
✅ Убедитесь что CORS настроен в Phoenix endpoint

### Порт 3000 занят
```bash
# Использовать другой порт
PORT=3001 npm start
```

---

## 📚 Документация

- [React Docs](https://react.dev)
- [Create React App Docs](https://create-react-app.dev)
- [NPM Scripts](https://create-react-app.dev/docs/available-scripts/)
- [Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)

---

## 🤝 Разработка

При работе на проекте:

1. ✅ Пишите компоненты функциональные с hooks
2. ✅ Используйте PropTypes или TypeScript для типизации
3. ✅ Разбивайте компоненты по смыслу (one component = one file)
4. ✅ Создавайте custom hooks для переиспользуемой логики
5. ✅ Используйте миддлвэр для API запросов (не в компонентах)

---

**📖 Назад в главный проект:** [Elixir-React-server README](../README.md)
