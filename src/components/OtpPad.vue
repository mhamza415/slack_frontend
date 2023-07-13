<template>
  <h1>Verify OTP</h1>
  <input v-model="otp" type="text" placeholder="Enter OTP" />
  <button @click="submitOTP">Submit</button>
</template>

<script>
import axios from "axios";

export default {
  name: "OtpPad",
  data() {
    return {
      otp: " ",
    };
  },
  //   methods: {
  //    async submitOTP()
  //    try {
  //       const email = localStorage.getItem("email");

  //       axios.post("api/user/verifyotp", {
  //           email,
  //           otp: this.otp,
  //         })
  //         .then((response) => {
  //           console.log(response.data);
  //         })
  //         catch (error)
  //          {
  //           console.error(error);
  //         });
  //     },
  //   },
  // };

  methods: {
    async submitOTP() {
      try {
        const email = localStorage.getItem("email");
        const otp = this.otp;

        const response = await axios.post("api/user/verifyotp", {
          email: email,
          otp: otp,
        });

        console.log(response);

        if (response.status === 201) {
          console.log("------------stssdfghjkl;");
          localStorage.setItem("user:info", JSON.stringify(response.data));
          localStorage.setItem("email", response.data.email);
          this.$router.push({ name: "SignIn" });
        } else console.log("stssdfghjkl;");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
