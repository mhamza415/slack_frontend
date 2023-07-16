<!-- <template>
  <h1>Verify OTP</h1>
  <input v-model="otp" type="text" placeholder="Enter OTP" />
  <button @click="submitOTP">Submit</button>
</template> -->

<template>
  <div class="main">
    <div class="circle4"></div>
    <div class="circle5"></div>
    <div class="signup">
      <div class="form">
        <h1>Please Enter</h1>
        <h2>Not Recieved ?</h2>
        <h5>Resend OTp</h5>
        <input
          type="text"
          autofocus
          placeholder="Enter 6 digits "
          v-model="otp"
        /><br /><br />
        <button @click="submitOTP">Continue</button><br />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OtpPad",
  data() {
    return {
      otp: "",
    };
  },

  methods: {
    async submitOTP() {
      try {
        const email = localStorage.getItem("email");
        const response = await axios.post("api/user/verifyotp", {
          email: email,
          otp: this.otp,
        });
        console.log(response);

        if (response.status === 200) {
          localStorage.setItem("user:info", JSON.stringify(response.data));
          localStorage.setItem("email", response.data.email);
          this.$router.push({ name: "UploadName" });
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
.circle4 {
  width: 14rem;
  height: 14rem;
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(to right, #61003a, #2d0a30);
  margin-left: 420px;
  margin-top: -15px;
}
.circle5 {
  width: 10rem;
  height: 10rem;
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(to right, #61003a, #0a1030);
  margin-left: 1050px;
  margin-top: 450px;
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

.form .pp a {
  color: #530061;
  padding: 5px;
  font-size: 17px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 50px;
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
  background: linear-gradient(to right, #61003a, #0a1030);
  border-radius: 10px;
  border-color: #fff;
  cursor: pointer;
  margin-bottom: 20px;
}

.form button:hover {
  background-color: black;
}
</style>
