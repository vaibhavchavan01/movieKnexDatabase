FROM node:14
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

<<<<<<< HEAD
# ARG PORT=3000
# ENV PORT $PORT
# EXPOSE $PORT

# ARG DATABASE_URL
# ENV DATABASE_URL $DATABASE_URL
=======
ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL
>>>>>>> 5a32bb5457a90c5045e4b2f558b3cdc66e3a2b41
RUN npm install -g nodemon
WORKDIR /movieKnexDatabase
COPY package*.json ./
RUN npm install 
COPY . .
<<<<<<< HEAD
CMD ["nodemon", "app.js"]

=======
CMD ["nodemon", "app.js";]
>>>>>>> 5a32bb5457a90c5045e4b2f558b3cdc66e3a2b41
