<template>
  <div>
    <template id='my-template'>
      <div class='container'>
        <div class='timeline'>
          <div v-for='(dateWithArticles, date) in timeline_data' :key="date">
            <p v-if='dateWithArticles.length > 0' class='date'>{{ date }}</p>
            <div v-for='(article,index) in dateWithArticles' class='article' :key="index">
              <span class='dot'></span>
              <p class='article-date'>{{ article.title }}</p>
              <p>{{ article.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
import ArticleService from "@/services/managementServices/article.service";

export default {
  name: "DoctorTimeline",
  data() {
    return {
      timeline_data: [],
      edit: false,
      datesArticles: {
        ' 2016': [
          {
            title: 'Five',
            slug: 'five',
            teaser: 'fiveeeee',
            published_at: '30.09.2016.'
          },
          {
            title: 'Four',
            slug: 'four',
            teaser: 'four',
            published_at: '15.09.2016.'
          },
          {
            title: 'Three',
            slug: 'three',
            teaser: 'three',
            published_at: '14.04.2016.'
          },
          {
            title: 'Two and a half',
            slug: 'two-and-a-half',
            teaser: 'two and a half',
            published_at: '02.04.2016.'
          }
        ],
        ' 2015': [
          {
            title: 'Two',
            slug: 'two',
            teaser: 'two',
            published_at: '25.12.2015.'
          },
          {
            title: 'One',
            slug: 'one',
            teaser: 'one',
            published_at: '01.12.2015.'
          }
        ]
      },
      searchQuery: ''
    }

  },
  computed: {},
  props: {
    articles: {
      type: Array
    }
  },
  methods: {
    async getArticles() {
      let response = await new ArticleService().getArticleTimeline()
      this.timeline_data = response.data
    },
  },
  async created() {
    await this.getArticles()
  },
}
</script>

<style lang="css">
* {
  outline: none;
  box-sizing: border-box;
}

.container {
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
}

.container .search-box {
  padding: 10px;
  margin: 20px 0;
  border: 1px solid black;
  border-radius: 5px;
}

.container .timeline {
  position: relative;
  border-left: 1px solid black;
}

.container .timeline .date {
  display: inline-block;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  position: relative;
  left: 15px;
  margin: 15px 0;
}

.container .timeline .date:before {
  content: "";
  position: absolute;
  top: 50%;
  left: -16px;
  border: 1px solid black;
  width: 14px;
}

.container .timeline .article {
  position: relative;
  left: 20px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}

.container .timeline .article:hover {
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.4);
}

.container .timeline .article a {
  color: green;
  text-decoration: none;
}

.container .timeline .article .article-date {
  font-weight: 300;
  font-size: 14px;
}

.container .timeline .article .dot {
  display: block;
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: green;
  left: -25.5px;
  top: calc(50% - 5px);
}

</style>