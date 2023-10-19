FROM node:18.16-alpine3.17  as builder

# ------------------------------------------
# change the working directory
# ------------------------------------------
WORKDIR /home/node/app

# ------------------------------------------
# install dependences
# ------------------------------------------
RUN yarn global add @nestjs/cli@10.1.17
COPY package.json yarn.lock ./

RUN yarn install --immutable

# ------------------------------------------
# copy content
# ------------------------------------------
COPY . .

RUN yarn build

# ------------------------------------------
# Optomize image size
# ------------------------------------------
FROM node:18.16-alpine3.17

WORKDIR /home/node/app

COPY --from=builder  /home/node/app /home/node/app

# ------------------------------------------
# start server
# ------------------------------------------
USER node

CMD [ "node", "dist/src/main.js" ]