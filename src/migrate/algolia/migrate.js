const algoliaSearch = require("algoliasearch");
const { MeiliSearch } = require("meilisearch");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const BATCH_SIZE = 1000;

(async () => {
  console.log(process.env.ALGOLIA_APPLICATION_ID);
  const algoliaClient = algoliaSearch(
    process.env.ALGOLIA_APPLICATION_ID,
    process.env.ALGOLIA_ADMIN_API_KEY
  );
  const algoliaIndex = algoliaClient.initIndex(process.env.ALGOLIA_INDEX_NAME);

  let records = [];
  await algoliaIndex.browseObjects({
    batch: (hits) => {
      records = records.concat(hits);
    },
  });

  const meiliClient = new MeiliSearch({
    host: process.env.MEILI_HOST,
    apiKey: process.env.MEILI_API_KEY,
  });
  const meiliIndex = meiliClient.index(process.env.MEILI_INDEX_NAME);

  await meiliIndex.addDocumentsInBatches(records, BATCH_SIZE);
})();
