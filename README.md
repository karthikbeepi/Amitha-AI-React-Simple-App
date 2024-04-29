# React Simple Chatbot UI Demo by @pragmaticgeek

## To run the project

Install the dependencies

```
npx bun i
```

Run in dev mode

```
npx bun run dev
```

## Publish the APP to vercel.

To publish the app to internet follow the instructions below:

1. Import the project from Github.

2. Setup the env variable to use the backend URL.

```
VITE_API_URL="https://0f96-45-44-28-25.ngrok-free.app/ask"
```

## To change the existing app in vercel

To update the app to internet follow the instructions below:

1. Go to the app deployed in Vercel.

2. Go to "Settings" tab, "Environment Variables".

3. Set the env variable to the update backend URL in "VITE_API_URL".

```
VITE_API_URL=https://0f96-45-44-28-25.ngrok-free.app/ask
```

4. Go to "Deployments" tab, check for the latest deployment and redeploy the app.
