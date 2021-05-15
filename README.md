### Surl | Full Stack & Highly Scalable URL Shortening Service

```
git clone https://github.com/gpldirk/EE599-Cloud-Computing.git
```

```
cd EE599-Cloud-Computing/
```
```
cd app/
```
```
npm install
```

#### Add your own environment variables
under client/.env
```
REACT_APP_GOOGLE_CLIENT=

REACT_APP_FACEBOOK_CLIENT=

REACT_APP_STRIPE_PUBLIC_KEY=
```

under app/config/config.env
```
MONGO_URI = 

GMAIL_USER = 
GMAIL_PASS =
EMAIL_FROM=

GOOGLE_CLIENT=

PRODUCT_BASIC_MO=
PRODUCT_PRO_MO=
PRODUCT_BASIC_YEAR=
PRODUCT_PRO_YEAR=
TRIAL_DAYS=3

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```



#### Running 3 instances with docker and docker-compose
under EE599-Cloud-Computing/
```
docker-compose up --build
```

open browser on http://localhost:8000


#### Project description

client folder contains all the files for react app, run following command to build/bundle it
```
npm install && npm run build
```
after build the react app, just copy the build folder from client to app

app foler contains all the files for nodejs backend app and client build folder, run following command to start
```
npm install && nodemon server.js
```

nginx folder contains the config file and docker file for nginx

docker-compose.yml contains the container orchestration process


Youtube Demo: https://www.youtube.com/watch?v=aAGtCN4xnwY

AWS Demo Link: https://uurl.ml


Reference: 

https://getbootstrap.com/docs/4.6/getting-started/introduction/

https://socket.io/docs/v4

https://redis.io/topics/pubsub

https://www.sitepoint.com/configuring-nginx-ssl-node-js/

https://www.npmjs.com/package/react-chartjs-2

https://codenebula.io/demos/

https://github.com/d3/d3-scale-chromatic

https://dev.to/taimoorkhan/how-to-add-dynamic-colors-in-chartjs-3mlk

https://github.com/stripe/stripe-payments-demo.git

https://github.com/Mohammed-Abdelhady/FULL-MERN-AUTH-Boilerplate.git

https://github.com/bsanket16/url-shortener.git

https://dev.to/rinkiyakedad/dockerizing-the-mern-stack-without-docker-compose-17m6









