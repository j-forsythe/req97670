This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment

This project uses Github Actions for CI/CD and is hosted on [Vercel's cloud](https://vercel.com)  infrastructure. See the [Actions Tab](https://github.com/j-forsythe/req97670/actions) to view and analyze the pipeline. Two different deployment options are available in this project: Pull Request Preview & Production.

### Pull Request Preview

Upon creation of a pull request, this integration will create a build of the requesting branch allowing testing of the code changes in a deployed environment. The preview build URL is [https://req97670-j-forsythe.vercel.app/](https://req97670-j-forsythe.vercel.app/).
The configuration file for this deployment can be found in [.github/workflows/preview.yaml](https://github.com/j-forsythe/req97670/blob/main/.github/workflows/preview.yaml)

### Production

Code merged to the `main` branch will trigger the production build of the project which is hosted here: [https://req97670.vercel.app/](https://req97670.vercel.app/).
The configuration file for this deployment can be found in [.github/workflows/production.yaml](https://github.com/j-forsythe/req97670/blob/main/.github/workflows/production.yaml).
