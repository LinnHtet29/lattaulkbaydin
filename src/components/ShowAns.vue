<template>
  <div class="container">
    <button @click="goHome"> နောက်သို့ </button>
    <div class="ans-con">
      <h3>{{answer}}</h3>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      answer: '',
      no: this.$route.params.no,
      number: this.$route.params.number
    }
  },
  created() {
    axios.get('/questions')
      .then(response => {
        console.log(this.no);
        let ansObj = response.data.answers.find((element) => {
          return element.questionNo == this.no && element.answerNo == this.number
        });
        this.answer = ansObj.answerResult;
        console.log(this.answer);
      })
      .catch(err => console.log(err))
  },
  methods: {
    goHome() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
h3 {
  text-align: center;
  color: #000;
}
.container {
  min-height: 511px;
  padding: 60px 325px;
}
.ans-con {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 300px;
  background: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
}
button {
  padding: 10px 20px;
  background: #fff;
  border: none;
  margin-bottom: 10px;
  border-radius: 10px;
  cursor: pointer;
}
button:hover {
  background: #bababa;
}
</style>
