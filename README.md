# IS27 – Full Stack Developer Coding challenge

## By [Jillian Forsythe](https://github.com/j-forsythe)

## System Requirements

- Node.js 16.20.0 or newer
- MacOS, Windows (including WSL), and Linux are supported
- Yarn, see installation below:

  ```bash
  npm install --global yarn
  ```

### Technology

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Formik](https://formik.org/)

## Getting Started

First, install dependencies:

```bash
yarn install
```

Second, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Deployment

This project uses Github Actions for CI/CD and is hosted on [Vercel's cloud](https://vercel.com) infrastructure. See the [Actions Tab](https://github.com/j-forsythe/req97670/actions) to view and analyze the pipeline. Two different deployment options are available in this project: Pull Request Preview & Production.

### Pull Request Preview

Upon creation of a pull request, this integration will create a build of the requesting branch allowing testing of the code changes in a deployed environment. The preview build URL is [https://req97670-j-forsythe.vercel.app/](https://req97670-j-forsythe.vercel.app/).
The configuration file for this deployment can be found in [.github/workflows/preview.yaml](https://github.com/j-forsythe/req97670/blob/main/.github/workflows/preview.yaml)

### Production

Code merged to the `main` branch will trigger the production build of the project which is hosted here: [https://req97670.vercel.app/](https://req97670.vercel.app/).
The configuration file for this deployment can be found in [.github/workflows/production.yaml](https://github.com/j-forsythe/req97670/blob/main/.github/workflows/production.yaml).

### Cloning

If you are cloning this project and would like to deploy on Vercel, follow these steps to configure the project and Github secrets: [Using Github Actions and Vercel](https://vercel.com/guides/how-can-i-use-github-actions-with-vercel)

## Architecture

An architecture diagram that shows the structure of the application as well as a description of each component can be found here: [docs/req97670-Architecture-Diagram.drawio.png](https://github.com/j-forsythe/req97670/blob/main/docs/req97670-Architecture-Diagram.drawio.png)

## Backend

The health endpoint can be accessed on [/api/health](https://req97670.vercel.app/api/health).

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Positions

```js
/api/positions
```

`pages/api/positions/*.js` files represent the CRUD operations for positions. You can get all positions and create new ones in `pages/api/positions/index.js` with GET and POST respectively.

```js
/api/positions/[productId]
```

The remaining PUT and DELETE and singular GET methods can be found in `pages/api/positions/[positionId].js` where position id is dynamically interpreted from the fetching calls.

### Employees

```js
/api/employees
```

`pages/api/employees/*.js` files represent the CRUD operations for employees. You can get all employees and create new ones in `pages/api/employees/index.js` with GET and POST respectively.

```js
/api/employees/[employeeId]
```

The remaining PUT and DELETE and singular GET methods can be found in `pages/api/employees/[employeeId].js` where employee id is dynamically interpreted from the fetching calls.

## Frontend

The homepage is found in `src/pages/index.js` where the organizational chart is displayed. It is wrapped in a global Layout component which controls the `<header> & <main>` elements.

To use the org chart, simply click on the position that you'd like to modify. From there, the user can: remove a employee if its filled, edit the position including adding or changing an assigned employee, and add new position from this node.

A table of employees can be found at `/employees` in the `src/pages/employees/index.js` file where management of this data is accessed. Users are able to edit employees and create new ones from this page.
