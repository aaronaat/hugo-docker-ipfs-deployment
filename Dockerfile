FROM node
USER root
WORKDIR /app
RUN npm install axios
COPY get-hubble-content.js /app
RUN node get-hubble-content.js

FROM gohugoio/hugo
USER root
WORKDIR /app
COPY hugo-site/* ./
COPY --from=0 /app/content ./
COPY --from=0 static ./
CMD ['hugo']


