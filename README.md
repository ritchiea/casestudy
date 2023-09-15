This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup

The project can be set up to demo with a few simple commands. Docker is required to run a postgres instance for data persistence.

Requires node 20.5.0

```console
$ docker-compose up -d
$ npm install
$ npx prisma migrate dev
$ npm run fetchdata
$ npm run dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

From there you can view time series data for a single patient accross several biomarkers or select multiple patients to compare time series data for a single biomarker. Because there is no guarantee of multiple patients having test results on the same actual dates, data points for comparison are abstracted to (t1, t2, etc...). For a single patient the X-axis will display actual dates.

The database schema can be found [here](https://github.com/ritchiea/casestudy/blob/main/prisma/schema.prisma).