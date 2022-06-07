import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const search = instantsearch({
  indexName: "movies",
  searchClient: instantMeiliSearch(
    process.env.MEILI_HOST,
    process.env.MEILI_FRONEND_DEFAULT_SEARCH_KEY
  ),
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: "#searchbox",
  }),
  instantsearch.widgets.clearRefinements({
    container: "#clear-refinements",
  }),
  instantsearch.widgets.refinementList({
    container: "#genres-list",
    attribute: "genres",
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 6,
    snippetEllipsisText: "...",
    attributesToSnippet: ["description:50"],
  }),
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      item: `
        <div>
          <div class="hit-name">
            {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
          </div>
          <img src="{{poster}}" align="left" />
          <div class="hit-description">
            {{#helpers.snippet}}{ "attribute": "overview" }{{/helpers.snippet}}
          </div>
          <div class="hit-info">Genre: {{genres}}</div>
        </div>
      `,
    },
  }),
  instantsearch.widgets.pagination({
    container: "#pagination",
  }),
]);

search.start();
