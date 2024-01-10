FROM mongo:latest

COPY users.json /users.json
COPY articles.json /articles.json

CMD mongoimport --host mongodb --db test --collection users --type json --file /users.json --jsonArray && \
    mongoimport --host mongodb --db test --collection articles --type json --file /articles.json --jsonArray