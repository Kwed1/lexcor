FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG REACT_APP_API_URL
ARG REACT_APP_BOT_URL

ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV REACT_APP_BOT_URL=${REACT_APP_BOT_URL}

RUN npm run build
RUN npm install -g http-server

EXPOSE 3000

CMD ["http-server", "build", "-p", "3000"]