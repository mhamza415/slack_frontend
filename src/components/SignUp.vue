<template>
  <div class="main">
    <div class="circle"></div>
    <div class="circle1"></div>
    <div class="signup">
      <div class="form">
        <h1><span>Register</span> your Email address</h1>

        <!-- <h2>SignUP</h2>
        <h5>Glad to see you!</h5> -->
        <input
          v-model="email"
          type="text"
          autofocus
          placeholder="abcd@xyz.com"
        /><br /><br />
        <button @click="signUp">Sign Up</button><br />
        <p>Already Registered? <a href=""> Login </a></p>
        <div class="diff">
          <hr style="width: 100px; margin-left: 40px; margin-top: 45px" />
          <span
            style="
              position: absolute;
              top: 67%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: #fff;
              font-size: 14px;
            "
            >OR</span
          >
          <hr style="width: 100px; margin-right: 40px; float: right" />
        </div>
        <a href="default.asp"
          ><img
            src="https://www.transparentpng.com/thumb/google-logo/google-logo-png-icon-free-download-SUF63j.png"
            alt="google"
            style="width: 50px; height: 50px"
        /></a>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "SignUp",
  data() {
    return {
      email: "",
    };
  },

  methods: {
    async signUp() {
      try {
        let result = await axios.post("api/user/register", {
          email: this.email,
        });
        console.log(result);
        if (result.status == 201 || result.status == 200) {
          localStorage.setItem("user:info", JSON.stringify(result.data));
          localStorage.setItem("email", this.email);
          this.$router.push({ name: "OtpPad" });
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

.main {
  width: 100%;
  height: 800px;
  background-color: #030303;
  display: flex;
  justify-content: center;
}
.circle {
  width: 14rem;
  height: 14rem;
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(to right, #0a1b30, #190061);
  margin-left: 420px;
  margin-top: -15px;
}
.circle1 {
  width: 10rem;
  height: 10rem;
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(to right, #0a1b30, #190061);
  margin-left: 1050px;
  margin-top: 450px;
}
.form {
  color: #fff;
  width: 350px;
  height: 500px;
  margin-top: 70px;
  margin-bottom: 70px;
  border: 0.1px solid grey;
  border-radius: 20px;
  margin-left: 1%;
  margin-right: 50%;
  position: relative;
}
.form:hover {
  border: 2px solid #1877f2;
}
.form h1 {
  margin-top: 40px;
  margin-left: 30px;
  text-align: left;
}
.form h1 span {
  color: #530061;
  font-weight: bold;
}
.form h2 {
  margin-top: 10px;
  text-align: left;
  margin-left: 30px;
}
.form h5 {
  margin-top: 5px;
  margin-left: 30px;
  text-align: left;
}
.form input {
  width: 300px;
  height: 40px;
  font-size: 17px;
  background: transparent;
  float: left;
  margin-left: 30px;
  margin-top: 15px;
  border-radius: 10px;
  border-color: #ffff;
  color: #fff;
}

.form button {
  width: 310px;
  height: 45px;
  float: left;
  font-size: 20px;
  margin-left: 30px;
  margin-top: 30px;
  color: #ffffff;
  font-weight: bold;
  /* background: #530061; */
  background-image: linear-gradient(to right, #530061, #0d0a30);
  border-radius: 10px;
  border-color: #fff;
  cursor: pointer;
  margin-bottom: 20px;
}

.form button:hover {
  background-color: black;
}

.form p a {
  color: #530061;
  padding: 5px;
  font-size: 17px;
  text-decoration: none;
  font-weight: bold;
}

.form p a:hover {
  color: aqua;
}

.form img {
  margin-top: 30px;
  margin-left: 130px;
}
</style>
