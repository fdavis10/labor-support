# Запуск проекта в Docker

## Требования

- Docker и Docker Compose
- Файл `.env` в корне проекта (скопируйте из `.env.example` и задайте `POSTGRES_PASSWORD`)

## Быстрый старт

```bash
# В корне проекта
cp .env.example .env
# Отредактируйте .env и задайте POSTGRES_PASSWORD

docker compose up -d --build
```

Сайт будет доступен по адресу **http://localhost** (или порт из `HTTP_PORT` в `.env`).

- Фронтенд и статика отдаются через **Nginx**
- Запросы к `/api/` проксируются на Django
- Админка: **http://localhost/admin/** (создайте суперпользователя см. ниже)

## Сервисы

| Сервис   | Описание                    |
|----------|-----------------------------|
| `web`    | Nginx: статика фронта, proxy API, статика Django |
| `backend`| Django (Gunicorn), API и админка |
| `db`     | PostgreSQL 16               |

## Полезные команды

```bash
# Создать суперпользователя Django
docker compose exec backend python manage.py createsuperuser

# Логи
docker compose logs -f

# Остановить
docker compose down

# Остановить и удалить тома (БД будет очищена)
docker compose down -v
```

## Переменные окружения

- **В корне** (для `docker-compose`): см. `.env.example` — `POSTGRES_*`, `HTTP_PORT`.
- **backend/.env**: настройки Django (секрет, CORS, почта и т.д.). В Docker дополнительно задаются `DB_ENGINE=postgres`, `POSTGRES_HOST=db` и при необходимости `ALLOWED_HOSTS`, `CORS_ORIGINS`.

## Локальная разработка без Docker

- Backend: `cd backend && python -m venv .venv && .venv\Scripts\activate && pip install -r requirements.txt && python manage.py runserver` (используется SQLite по умолчанию).
- Frontend: `cd frontend && npm install && npm run dev`.
- Для Docker используйте отдельный `.env` с `POSTGRES_PASSWORD` и при необходимости другими переменными.
