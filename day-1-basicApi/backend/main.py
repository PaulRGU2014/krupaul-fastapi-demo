from fastapi import FastAPI

app = FastAPI(title="Day 1 Basic API")


@app.get("/")
def read_root() -> dict[str, str]:
	return {"message": "Hello, FastAPI"}
