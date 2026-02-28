# Локальный запуск проекта

Два варианта: через Docker (как на продакшене) или без Docker (для разработки).

---

## Вариант 1: Docker

Всё поднимается в контейнерах — PostgreSQL, Django, Nginx. Сайт отдаётся как единое целое.

### Требования

- Docker и Docker Compose

### Шаги

1. **Создайте `.env` в корне проекта:**

```bash
cp .env.production .env
```

Или создайте вручную с содержимым:

```
POSTGRES_DB=labor_support
POSTGRES_USER=postgres
POSTGRES_PASSWORD=любой_надёжный_пароль
HTTP_PORT=80
```

2. **Создайте `backend/.env` для Django:**

```bash
cp backend/.env.production backend/.env
```

Для локального Docker измените в `backend/.env`:
- `ALLOWED_HOSTS=localhost,127.0.0.1,backend`
- `CORS_ORIGINS=http://localhost,http://127.0.0.1`
- `CSRF_TRUSTED_ORIGINS=http://localhost,http://127.0.0.1`
- Настройки почты можно оставить — отправка работать не будет, но сайт запустится

3. **Запуск:**

```bash
docker compose up -d --build
```

4. **Создайте суперпользователя (для админки):**

```bash
docker compose exec backend python manage.py createsuperuser
```

Сайт: **http://localhost**  
Админка: **http://localhost/admin/**

---

## Вариант 2: Без Docker (для разработки)

Backend и frontend запускаются отдельно. Backend по умолчанию использует SQLite (PostgreSQL не нужен).

### Требования

- Python 3.10+
- Node.js 18+

### Backend

```bash
cd backend

# Виртуальное окружение
python -m venv .venv

# Windows:
.venv\Scripts\activate

# Linux/macOS:
# source .venv/bin/activate

# Зависимости
pip install -r requirements.txt

# Миграции
python manage.py migrate

# Запуск
python manage.py runserver
```

Backend будет доступен на **http://127.0.0.1:8000**

Файл `backend/.env` для разработки не обязателен — используются значения по умолчанию (SQLite, DEBUG=1, CORS для localhost:5173). Создайте его только если нужны свои настройки (например, отправка писем).

### Frontend

В **новом** терминале:

```bash
cd frontend

npm install
npm run dev
```

Frontend будет доступен на **http://localhost:5173**. Запросы к `/api/` автоматически проксируются на backend (порт 8000).

### Админка Django

После запуска backend создайте суперпользователя:

```bash
cd backend
.venv\Scripts\activate   # или source .venv/bin/activate
python manage.py createsuperuser
```

Админка: **http://127.0.0.1:8000/admin/**  
(При работе через frontend форма заявки шлёт данные на API, админка нужна для просмотра заявок.)

---

## Краткая сводка

| Вариант  | Сайт              | Админка                  |
|----------|-------------------|---------------------------|
| Docker   | http://localhost  | http://localhost/admin/   |
| Без Docker | http://localhost:5173 | http://127.0.0.1:8000/admin/ |
