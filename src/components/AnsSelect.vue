<template>
  <div class="container">
    <h3>ကြိုက်နှစ်သက်ရာ နံပါတ် ကိုရွေးချယ်ပါ</h3>
    <button @click="goHome"> နောက်သို့ </button>
    <section id="number-list-con">
        <router-link class="link-num" v-for="number in numberList" :to="'/answer/' + questionNo + '/' + convertToEng(number)">
          <span class="number">{{ number }}</span>
        </router-link>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      questionNo: this.$route.params.id,
      numberList: []
    }
  },
  created() {
    axios.get('/questions')
      .then(response => {
        this.numberList = response.data.numberList
      })
      .catch(err => console.log(err))
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    convertToEng(input) {
  switch (input) {
    case "၁":
      return 1;
      break;
    case "၂":
      return 2;
      break;
    case "၃":
      return 3;
      break;
    case "၄":
      return 4;
      break;
    case "၅":
      return 5;
      break;
    case "၆":
      return 6;
      break;
    case "၇":
      return 7;
      break;
    case "၈":
      return 8;
      break;
    case "၉":
      return 9;
      break;
    case "၁၀":
      return 10;
      break;
    default:
      return input;
  }
}
  }
}
</script>

<style scoped>
.container {
  min-height: 481px;
}
h3 {
  color: white;
  text-align: center;
  margin-top: 30px;
}

#number-list-con {
  width: 380px;
  min-height: 280px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: auto;
  margin-top: 30px;
}
.number {
  min-width: 35px;
  min-height: 35px;
  color: #000;
  background: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
  font-size: 0.7rem;
  font-weight: bold;
  cursor: pointer;
}
.number:hover {
  background: #e0e0e0;
}

router-link.link-num {
  text-decoration: none;
}

button {
  margin-left: 450px;
  padding: 10px 20px;
  background: #fff;
  border: none;
  margin-top: 10px;
  border-radius: 10px;
  cursor: pointer;
}
button:hover {
  background: #bababa;
}
</style>
