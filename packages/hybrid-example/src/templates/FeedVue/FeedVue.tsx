import Vue from "vue";
import { registerTemplate } from "../registry";
import { Templates, DataSources } from "../../main";

const Feed = Vue.extend({
  props: ["resultForDataSource"],
  data() {
    return {
      count: 0,
      feedListResult: this.resultForDataSource(DataSources.Feed.list)
    };
  },
  template:
    `<div>
    <button v-on:click="count++">You clicked me {{ count }} times.</button>
    <ul v-if="feedListResult.loaded && feedListResult.data">
      <li v-for="(item, index) in feedListResult.data" :key="index">
        {{item.description}}
      </li>
    </ul>
    </div>`
});

registerTemplate({
  ...Templates.FeedVue,
  component: Feed
});
