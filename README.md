# Zoo reservation system

## Todo

- [ ] fix openapi nested dto
- [ ] setup input validation

## Backend

To run the backend first install its dependencies:

```sh
cd backend
npm install
```

Then run the development server using:

```sh
npm run start:dev
```

You can find interactive openapi documentation [here](http://localhost:3000/api)

## Frontend

To run the frontend first install its dependencies:

```sh
cd frontend
npm install
```

Then run the development server using:

```sh
npm run dev
```

You can now open the frontend in your browser [here](http://localhost:5173/)

## Sql query

To execute the time series graph query on the dev db you can use the following command

```sh
sqlite3 backend/prisma/dev.db < time_series_graph_query.sql
```
