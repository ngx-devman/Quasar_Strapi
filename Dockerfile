FROM node:lts
RUN mkdir /app
ADD front/ /app/front/
ADD platform/ /app/platform/
WORKDIR /app/platform/
EXPOSE 1337 80 443
CMD NODE_ENV=development yarn start
