FROM node:lts-alpine
WORKDIR /
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
WORKDIR /
COPY . . 
RUN node ace migration:run ../
EXPOSE 3001
USER node
CMD ["node", "server.js"]
