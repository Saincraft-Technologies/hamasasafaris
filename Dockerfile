FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
RUN ls
COPY . . 
RUN node ace migration:run ../
EXPOSE 3001
USER node
CMD ["node", "server.js"]
