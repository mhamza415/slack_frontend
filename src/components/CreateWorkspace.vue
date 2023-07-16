<template>
  <div class="main">
    <div class="circle6"></div>
    <div class="circle7"></div>
    <div class="signup">
      <div class="p_form">
        <h6>Step 1 of 3</h6>
        <br />

        <h3>What is the name of your company or team ?</h3>
        <br />
        <h5>This will be the name of your Slack workspace. Choose wisely!</h5>
        <input
          v-model="workspace"
          type="text"
          autofocus
          placeholder="Type here"
        /><br /><br />
        <button @click="createSpace" class="btn">Next</button><br />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "CreateWorkspace",
  data() {
    return {
      workspace: "",
    };
  },

  methods: {
    async createSpace() {
      try {
        const token = localStorage.getItem("token");
        let result = await axios.post(
          "api/workspace/create",
          {
            w_name: this.workspace,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(result);
        if (result.status == 200) {
          localStorage.setItem("user:info", JSON.stringify(result.data));
          // localStorage.setItem("email", JSON.stringify(result.data.email));
          localStorage.setItem("email", result.data.email);
          localStorage.setItem("w_id", result.data.w_id);
          this.$router.push({ name: "DashBoard" });
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style>
.main {
  width: 100%;
  height: 800px;
  background-color: #030303;
  display: flex;
  justify-content: center;
}
.p_form h6 {
  margin-top: 50px;
  float: left;
  margin-left: 30px;
}

.p_form h3 {
  float: left;
  margin-top: 30px;
  font-size: 30px;
  margin-left: 20px;
}
.p_form h5 {
  float: left;
  margin-left: 100px;
  margin-right: 30px;
  margin-top: 40px;
}

.circle6 {
  width: 14rem;
  height: 14rem;
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(to right, #392907, #be7f00);
  margin-left: 650px;
  float: right;
  margin-top: 20px;
}
.circle7 {
  width: 10rem;
  height: 10rem;
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(to right, #be7f00, #392907);
  margin-left: 1050px;
  margin-top: 450px;
}
.p_form {
  color: #fff;
  width: 600px;
  height: 450px;
  background-color: #030303;
  margin-top: 70px;
  margin-bottom: 70px;
  border: 0.1px solid grey;
  border-radius: 20px;
  margin-right: 50%;
  position: relative;
  background: transparent;
}
.p_form:hover {
  border: 2px solid #1877f2;
}
.p_form input {
  width: 400px;
  height: 50px;
  font-size: 17px;
  margin-left: 100px;
  float: left;
  margin-top: 10px;
  border-radius: 10px;
  border-color: #ffff;
  color: #fff;
}

.p_form button {
  width: 210px;
  height: 45px;
  float: left;
  font-size: 20px;
  margin-left: 200px;
  margin-top: 30px;
  color: #ffffff;
  font-weight: bold;
  background: linear-gradient(to right, #392907, #be7f00);
  border-radius: 10px;
  border-color: #fff;
  cursor: pointer;
  margin-bottom: 20px;
}

.p_form button:hover {
  background: black;
}
</style>
