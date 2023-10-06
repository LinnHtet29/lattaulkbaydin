<template>
  <main>
    <section id="questions-sec">
      <input type="text" id="search-input" v-model="search" placeholder="ရှာဖွေရန်...">
      <ul>
        <li v-for="(question,index) in filterQuestion" :key="index">
          <router-link :to="'/' + question.questionNo" class="normal-text">
            {{ question.questionName }}
          </router-link>
        </li>
      </ul>
    </section>
    <section id="pagination-sec">
          <div id="pagi-num-con">
              <span :class="num === pageNo + 1 ? 'disabled' : ''" @click="pageNo !== 0 ? changePage((pageNo+1) - 1) : null">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
                <defs>
                </defs>
                <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                	<path d="M 65.75 90 c 0.896 0 1.792 -0.342 2.475 -1.025 c 1.367 -1.366 1.367 -3.583 0 -4.949 L 29.2 45 L 68.225 5.975 c 1.367 -1.367 1.367 -3.583 0 -4.95 c -1.367 -1.366 -3.583 -1.366 -4.95 0 l -41.5 41.5 c -1.367 1.366 -1.367 3.583 0 4.949 l 41.5 41.5 C 63.958 89.658 64.854 90 65.75 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                </g>
                </svg>
              </span>
              <template v-if="pageCount <= 9">
                <template v-for="num in pageCount">
                  <span v-if="num === pageNo+1" class="active" @click="changePage(num+1)">{{ num }}</span>
                  <span v-else @click="changePage(num)">{{ num }}</span>
                </template>
              </template>
              <template v-else>
                <template v-if="pageNo+1 <= 3 || pageNo+1 >= pageCount-2">
                    <template v-for="num in 4">
                        <span v-if="num === pageNo+1" class="active" @click="changePage(num)">{{ num }}</span>
                        <span v-else @click="changePage(num)">{{ num }}</span>
                    </template>
                      <span class="disabled"> ... </span>
                    <template v-for="num in getReverseArray">
                        <span v-if="num === pageNo+1" class="active" @click="changePage(num)">{{ num }}</span>
                        <span v-else @click="changePage(num)">{{ num }}</span>
                    </template>
                </template>
                <template v-else>
                    <span @click="changePage(1)">1</span>
                    <span class="disabled"> ... </span>
                    <template v-for="num in getNearbyArray">
                        <span v-if="num === pageNo+1" class="active" @click="changePage(num)">{{ num }}</span>
                        <span v-else @click="changePage(num)">{{ num }}</span>
                    </template>
                    <span class="disabled"> ... </span>
                    <span @click="changePage(pageCount)">{{ pageCount }} </span>
                </template>
                <span :class="pageNo === pageCount - 1 ? 'disabled' : ''" @click="pageNo === pageCount-1 ? null : changePage((pageNo + 1) + 1)">
                  <svg fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                  	 viewBox="0 0 330 330" xml:space="preserve">
                  <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
	                c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
	                C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
	                C255,161.018,253.42,157.202,250.606,154.389z"/>
                  </svg>
                </span>
            </template>
          </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      search: '',
      questions: [],
      pageCount: 0,
      pageNo: 0,
      perItems: 5,
    }
  },
  created() {
    axios.get('/questions')
      .then(response => {
        this.setUpData(response);
      })
      .catch(err => console.log(err));
  },
  computed: {
    filterQuestion() {
      return this.questions.filter(q => {
        console.log("Filter", q.questionName);
        return q.questionName.match(this.search);
      })
    },
    getReverseArray() {
      let startIndex = this.pageCount - 2;
      let endIndex = this.pageCount;
      let result = [];
      for (let i = startIndex; i <= endIndex; i++) {
        result.push(i);
      }
      return result;
    },
    getNearbyArray() {
      let startIndex = this.pageNo - 1;
      let endIndex = this.pageNo+3;
      let result = [];
      for (let i = startIndex; i <= endIndex; i++) {
        result.push(i);
      }
      return result;
    }
  },
  methods: {
    changePage(value) {
      this.pageNo = value - 1;
      console.log(value);
      axios.get('/questions')
        .then(response => {
          this.setUpData(response);
        })
        .catch(err => console.log(err));
    },
    setUpData(response) {
      let allData = response.data.questions;
      this.questions = allData.slice((this.pageNo) * this.perItems, ((this.pageNo) * this.perItems) + this.perItems);
      this.pageCount = Math.ceil(allData.length / this.perItems);
    }
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
main {
  padding: 30px;
}
#questions-sec {
  position: relative;
  max-height: 350px;
  width: 80%;
  background: #dadada;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 20px 20px 0 0;
  overflow-y: auto;
}
ul {
  padding: 50px;
  padding-top: 60px;
}

ul li {
  display: block;
  margin: 10px 0;
  padding: 5px;
  transition: all ease-in-out 0.3s;
  cursor: pointer;
}

ul li:hover {
  transform: translateY(-3px);
  box-shadow: 1px 2px 3px #b7b7b7;
}

ul li a {
  text-decoration: none;
  color: #000;
}

#search-input {
  position: fixed;
  z-index: 999;
  width: 940px;
  height: 50px;
  padding: 10px;
  margin-top: 5px;
  margin-left: 10px;
  border-radius: 20px;
  border: none;
}
#pagination-sec {
  width: 600px;
  margin: 0 auto;
}
#pagi-num-con {
  width: auto;
  display: flex;
  justify-content:space-around;
}
#pagi-num-con span{
  margin-top: 46px;
  width: 35px;
  height: 35px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  cursor: pointer;
}
.active {
  background: crimson !important;
  color: #fff;
}
.disabled {
  cursor: none;
  background: #777;
}
</style>
