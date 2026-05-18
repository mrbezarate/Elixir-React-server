# 🚀 Elixir-React-server

Fullstack application with **Elixir + Phoenix** backend and **React** frontend.

> Powerful Elixir server + modern React interface for rapid web application development

---

## 📊 Technology Stack

| Component | Technologies | Percent |
|-----------|-----------|---------|
| **Backend** | ![Elixir](https://img.shields.io/badge/Elixir-4B275F?style=flat) ![Phoenix](https://img.shields.io/badge/Phoenix-FD4F00?style=flat) | 73.7% |
| **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | 13.4% |
| **Styles** | ![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3) ![HTML](https://img.shields.io/badge/HTML-E34C26?style=flat&logo=html5) | 10.2% + 2.7% |

---

## 🚀 Quick Start

### Requirements
- **Elixir** 1.14+
- **Node.js** 16+
- **PostgreSQL** (optional)

### Installation and Run

#### 1️⃣ Backend (Elixir + Phoenix)

```bash
cd backend
mix setup          # Install dependencies
mix phx.server     # Run server on localhost:4000
```

#### 2️⃣ Frontend (React)

```bash
cd frontend
npm install        # Install dependencies
npm start          # Run on localhost:3000
```

---

## 📁 Project Structure

```
Elixir-React-server/
├── backend/                    # Phoenix server
│   ├── lib/
│   ├── mix.exs               # Elixir dependencies
│   └── config/
├── frontend/                   # React application
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

---

## 🛠️ Main Commands

### Backend (Elixir/Phoenix)

| Command | Description |
|---------|---------|
| `mix phx.server` | Run dev server |
| `mix test` | Run tests |
| `mix phx.new` | Create new Phoenix project |
| `mix ecto.migrate` | Execute database migrations |

### Frontend (React)

| Command | Description |
|---------|---------|
| `npm start` | Run dev server (localhost:3000) |
| `npm test` | Run tests |
| `npm run build` | Production build |
| `npm run eject` | Eject from Create React App (⚠️ irreversible) |

---

## 🔗 Available Services

- **API Server**: [http://localhost:4000](http://localhost:4000)
- **React App**: [http://localhost:3000](http://localhost:3000)

---

## 📚 Useful Links

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
# See Phoenix documentation for more details
https://hexdocs.pm/phoenix/deployment.html
```

### React (Vercel, Netlify, AWS S3)
```bash
npm run build      # Create optimized build
# Publish the contents of the build folder
```

---

## 🤝 How to Contribute

1. **Fork** the repository
2. Create a **feature branch** (`git checkout -b feature/amazing-feature`)
3. Make a **commit** (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. Open a **Pull Request**

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💡 Tips and Recommendations

- ✅ Use **live reload** for faster development
- ✅ Write **tests** for both parts of the application
- ✅ Follow **best practices** for Elixir and React
- ✅ Use **environment variables** for configuration
- ✅ Regularly update dependencies

---

## ❓ FAQ

**Q: How do I connect a database?**
A: Edit `backend/config/dev.exs` and use `mix ecto.migrate`

**Q: How do I set up CORS?**
A: In Phoenix, use the Corsica plug in your endpoint.ex file

**Q: How do I deploy both applications?**
A: It's recommended to use Docker for containerizing both services

---

**Author**: [@mrbezarate](https://github.com/mrbezarate)  
**Last Updated**: 2026-05-18
