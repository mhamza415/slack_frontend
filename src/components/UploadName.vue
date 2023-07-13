<template>
  <div class="upload">
    <div class="circle8"></div>
    <div class="circle9"></div>
    <div class="upload1">
      <div action="upload">
        <h1>What is the name ?</h1>
        <p>Add your Name</p>
        <input v-model="name" type="text" placeholder="Alax" autofocus />

        <h1>Your profile photo?</h1>
        <button @click="Upload">Upload the photo</button>
      </div>
      <div class="upload3">
        <button @click="Continue">Next</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UploadName",
};
</script>
<style>
.upload {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 700px;
  background-color: #0f0f0f;
}
.upload1 {
  display: flex;
  width: 500px;
  height: 450px;
  border-radius: 15px;
  background: transparent;
  border: 1px solid gray;
  margin-top: 100px;
  color: #fff;
  text-align: left;
  position: relative;
}
.upload div p {
  margin-left: 20px;
}
.upload div button {
  padding: 8px 60px;
}

.upload1 h1 {
  margin: 35px;
  margin-left: 20px;
}
.upload1 button {
  background-color: #0f0f0f;
  color: #fff;
  margin-left: 115px;
}
.upload1 input {
  width: 450px;
  height: 40px;
  margin: 20px;
  background: #0f0f0f;
  text-align: center;
  color: #fff;
}
/* .upload1 p{
    text-align: center;
    font-size : 12px;
  margin:25px;
  width: 300px; */

.upload3 button {
  width: 230px;
  height: 40px;
  color: #fff;
  background: linear-gradient(to right, #61004b, #220a30);
  margin-left: -380px;
  margin-top: 370px;
}
.circle8 {
  width: 12rem;
  height: 12rem;
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(to right, #61004b, #220a30);
  margin-left: 320px;
  margin-top: -380px;
}
.circle9 {
  width: 10rem;
  height: 10rem;
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(to right, #61004b, #220a30);
  margin-left: 750px;
  margin-top: 450px;
}
</style>
