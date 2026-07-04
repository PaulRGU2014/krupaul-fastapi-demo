# Day 3 CRUD Project

This project contains:

1. FastAPI backend with authentication and CRUD endpoints
2. React frontend for login, registration, and item management
3. Docker Compose setup for full local stack
4. Kubernetes manifests for deployment practice

## Project Structure

1. Backend: ../backend
2. Frontend: .
3. Docker Compose: ../../docker-compose.yml
4. Kubernetes manifests:
	- fastapi-deployment.yaml
	- fastapi-service.yaml
	- fastapi-secret.yaml
	- postgres-deployment.yaml
	- postgres-service.yaml
	- postgres-secret.yaml
	- postgres-pvc.yaml

## Run Locally Without Docker

### Backend

From repository root:

1. source .venv/bin/activate
2. cd day-3-CRUD
3. python -m uvicorn backend.main:app --reload --port 8000

Backend URLs:

1. API base: http://127.0.0.1:8000
2. Swagger docs: http://127.0.0.1:8000/docs

### Frontend

In a separate terminal:

1. cd day-3-CRUD/day3-frontend
2. npm install
3. npm start

Frontend URL:

1. http://127.0.0.1:3000

## Run With Docker Compose

From repository root:

1. docker compose up --build -d
2. docker compose ps

Open:

1. Frontend: http://127.0.0.1:3000
2. Backend docs: http://127.0.0.1:8000/docs

Stop stack:

1. docker compose down

## How Backend Works

Main backend modules:

1. main.py
	- Defines API routes
	- Creates tables on startup
	- Configures CORS middleware
2. database.py
	- Builds SQLAlchemy engine and session factory
	- Uses DATABASE_URL from environment, with sqlite fallback
3. models.py
	- SQLAlchemy models for User and Item
4. schemas.py
	- Pydantic request and response models
5. security.py
	- Password hashing and verification using passlib
6. auth.py
	- JWT token creation and expiration handling

Authentication flow:

1. Register with POST /register using JSON body with username and password
2. Login with POST /login using form-data fields username and password
3. Backend returns access_token and token_type

Current item endpoints:

1. POST /items
2. GET /items
3. GET /items/{item_id}
4. PUT /items/{item_id}
5. DELETE /items/{item_id}

Note: Authentication is implemented and token generation works, but item routes are currently not protected by token validation dependency.

## Environment Variables

Backend variables:

1. DATABASE_URL
2. SECRET_KEY

Frontend variable:

1. REACT_APP_API_URL

## Kubernetes Deployment Notes

This folder includes Kubernetes manifests for FastAPI and Postgres.

Typical apply order:

1. kubectl apply -f postgres-secret.yaml
2. kubectl apply -f postgres-pvc.yaml
3. kubectl apply -f postgres-deployment.yaml
4. kubectl apply -f postgres-service.yaml
5. kubectl apply -f fastapi-secret.yaml
6. kubectl apply -f fastapi-deployment.yaml
7. kubectl apply -f fastapi-service.yaml

Before applying in a real cluster:

1. Update container image in fastapi-deployment.yaml
2. Replace secret values in fastapi-secret.yaml

## Useful Commands

1. Frontend build: npm run build
2. Docker logs backend: docker compose logs backend --tail=100
3. Docker logs frontend: docker compose logs frontend --tail=100
4. Docker status: docker compose ps
