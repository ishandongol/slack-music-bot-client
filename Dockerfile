FROM node:14.17.5-stretch as build
WORKDIR /music-bot-client
ADD . .
RUN yarn && yarn build

FROM nginx:stable-alpine
COPY --from=build /music-bot-client/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
