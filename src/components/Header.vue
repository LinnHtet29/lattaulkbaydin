<template>
    <header>
      <img class="logo" src="../assets/baydin-logo.png" alt="Icon">
      <div>
        <h1 class="title">မင်းသိင်္ခ</h1>
        <h5 class="sub title">လက်ထောက်ဗေဒင်</h5>
      </div>
    </header>
</template>

<script>

export default {
  data() {
    return {
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

header {
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin: 0 auto;
  padding-top: 30px;
}

.title {
  color: #fff;
  text-align: center;
}

.title.sub {
  color: #b7b7b7;
  text-align: center;
  margin-bottom: 0.5rem;
}
.logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
