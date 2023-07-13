<template>
  <div class="main">
    <div class="signup">
      <div class="form">
        <h1>Enter your Email Address</h1>
        <h2>Login</h2>
        <h5>Glad to see you!</h5>
        <input
          type="email"
          autofocus
          placeholder="abcd@xyz.com"
          v-model="email"
        /><br /><br />
        <button @click="signIn">Log In</button><br />
        <p class="pp"><span>New to Slack?</span> <a href=""> Register </a></p>
        <div class="diff">
          <hr style="width: 120px; margin-left: 40px; margin-top: 45px" />
          <span
            style="
              position: absolute;
              top: 74%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: #fff;
              font-size: 14px;
            "
            >OR</span
          >
          <hr style="width: 110px; margin-right: 40px; float: right" />
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
  name: "SignIn",
  data() {
    return {
      email: "",
    };
  },

  methods: {
    async signIn() {
      try {
        let result = await axios.post("api/user/login", {
          email: this.email,
        });
        console.log(result);
        if (result.status == 201) {
          localStorage.setItem("user:info", JSON.stringify(result.data));
          localStorage.setItem("email", JSON.stringify(result.data.email));
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
.form {
  color: #fff;
  width: 390px;
  height: 500px;
  background-color: #030303;
  margin-top: 70px;
  margin-bottom: 70px;
  border: 0.1px solid grey;
  border-radius: 20px;
  margin-left: 50%;
  margin-right: 50%;
}
.form:hover {
  border: 2px solid #1877f2;
}
.form h1 {
  margin-top: 40px;
  margin-left: 30px;
  text-align: left;
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
  background: #530061;
  border-radius: 10px;
  border-color: #fff;
  cursor: pointer;
  margin-bottom: 20px;
}

.form button:hover {
  background-color: black;
}

.form .pp a {
  color: #530061;
  padding: 5px;
  font-size: 17px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 50px;
}

.form .pp span {
  padding: 20px;
}

.form p a:hover {
  color: aqua;
}

.form img {
  margin-top: 30px;
  margin-left: 170px;
}
</style>
