# MeiliSearch

## Docker run

Running service (without Master Key)

```bash
docker run -it --rm \
    -p 7700:7700 \
    -v $(pwd)/meili_data:/meili_data \
    getmeili/meilisearch:latest
```

Running service with Master Key

```bash
docker run -it --rm \
    -p 7700:7700 \
    -v $(pwd)/meili_data:/meili_data \
    --env MEILI_MASTER_KEY=your_master_key \
    getmeili/meilisearch:latest
```

See more detail <https://docs.meilisearch.com/learn/security/master_api_keys.html#communicating-with-a-protected-instance>

## Postman Collections

See more detail
<https://docs.meilisearch.com/learn/cookbooks/postman_collection.html>

## API Key Management

### Create API Key

```bash
curl \
  -X POST 'http://localhost:7700/keys' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer your_master_key' \
  --data-binary '{
    "description": "All permission",
    "actions": [
      "*"
    ],
    "indexes": ["*"],
    "expiresAt": "2023-01-01T00:00:00Z"
  }'

```

Example response:

```bash
{"description":"All permission","key":"OJFTBDkP1fe4316e8dbf94101648ff28dbbf7d267c04254b2189a91b0ce7736a315001a8","actions":["*"],"indexes":["*"],"expiresAt":"2023-01-01T00:00:00Z","createdAt":"2022-06-01T17:16:14.926234594Z","updatedAt":"2022-06-01T17:16:14.926234594Z"}%
```

```bash
curl \
  -X POST 'http://localhost:7700/keys' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer masterKey' \
  --data-binary '{
    "description": "Search patient records key",
    "actions": [
      "*"
    ],
    "indexes": ["*"],
    "expiresAt": "2023-01-01T00:00:00Z"
  }'
```

## Set Filterable

```bash
  curl \
    -X POST 'http://localhost:7700/indexes/movies/settings' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer masterKey'  \
    --data-binary '{ "filterableAttributes": [ "genres", "release_date" ], "sortableAttributes": [ "release_date" ] }'
```

example-2:

```bash
curl \
    -X POST 'http://localhost:7700/indexes/spvi-product/settings' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer masterKey'  \
    --data-binary '{ "filterableAttributes": [ "CATEGORIES" ], "sortableAttributes": [ "IMPORTDATED" ] }'
```
