FROM mhart/alpine-node:10

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY . .

EXPOSE 3000

CMD yarn start
