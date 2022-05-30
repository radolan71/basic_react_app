# Rick & Morty UI

Basic React App consuming https://rickandmortyapi.com as backend.

## How to run

1. Install dependencies with `npm install`.
2. Run the app `npm start`. It should open automatically in http://localhost:8080.

## Project Checklist

 - [X] React withouth CRA
 - [X] Redux
 - [X] Typescript
 - [X] eslint
 - [X] Material UI
 - [X] hooks
 - [X] No harcoded API url
 - [X] Use Browser Cache API to improve performance.
 - [X] Use Error Boundary

## Folder Strucuture

The folder strucure used in here is for extendability in mind. For instance consuming other apis to enrich the data of the app.

- The main app code is located in the `src` folder.
- `src/apis` contains the code that call the API endpoints.
- `src/application` contains the "business logic" and redux slices.
- `src/components` contains all UI components orginized by domains ( for instance `characters`).
- `src/components/common` contains generic components that can be potentially extracted as its own npm package.
- `src/helpers` cross cutting concerns shared functionality.
- `src/hooks` to be able to pack and reuse some code.
- `public/config.js` can contain configurable data that can be change at deployment time to avoid harcoding any of this datas in the code.

## TODO

- [] Unit & Component tests
- [] E2E tests
- [] Implement rendering optimizations using Memo when possible.
- [] Implement Code Splitting to improve first time load.
- [] Render this on the server side to be able to get better SEO.
