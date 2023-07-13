import SignIn from "./components/SignIn.vue";
import SignUp from "./components/SignUp.vue";
import OtpPad from "./components/OtpPad.vue";
import CreateWorkspace from "./components/CreateWorkspace.vue";
import UploadName from "./components/UploadName.vue";
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
  {
    name: "workspace",
    component: CreateWorkspace,
    path: "/space",
  },
  {
    name: "uploadpic",
    component: UploadName,
    path: "/upload",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
