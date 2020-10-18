# Advanced-React
https://mailtrap.io/


frontend
*   "dev": "next -p 7777",
    "build": "next build",
    "start": "next start",
    "test": "NODE_ENV=test jest --watch",
    "heroku-postbuild": "next build"

* http://localhost:7777/

backend:
*   "start": "nodemon -e js,graphql -x node src/index.js",
    "dev": "nodemon -e js,graphql -x node --inspect src/index.js",
    "test": "jest",
    "deploy": "prisma deploy --env-file variables.env",
    "deployf": "prisma deploy --env-file variables.env --force"  

* https://app.prisma.io/

*  GraphQL Playground
    http://localhost:4444/


