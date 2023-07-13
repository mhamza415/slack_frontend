import SignIn from "./components/SignIn.vue";
import SignUp from "./components/SignUp.vue";
import OtpPad from "./components/OtpPad.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "SignUp",
    component: SignUp,
    path: "/signup",
  },

  {
    name: "SignIn",
    component: SignIn,
    path: "/signin",
  },
  {
    name: "OtpPad",
    component: OtpPad,
    path: "/otp",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
