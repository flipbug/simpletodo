# Simple Todo App

The goal of this project is to play around with different technologies for learning purposes. The tech stack currently includes django, postgres, nextjs and docker.

Please note: This repo contains several secrets, since this project is only meant to run locally. I will clean this up at a later date. 

## Dev

Run the project (use `-d` to detach from terminal)
```
docker compose up
```

Rebuild the project
```
docker compose up --build
```

Run migrations directly in the container
``` 
docker compose exec backend python manage.py migrate
```

## Troubleshooting 

Make sure docker is installed correctly and the damon is up and running
```
sudo systemctl status docker.service
```


## ToDo

- Frontend
- GraphQL
- Proper Secret management