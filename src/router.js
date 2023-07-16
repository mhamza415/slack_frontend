import SignIn from "./components/SignIn.vue";
import SignUp from "./components/SignUp.vue";
import OtpPad from "./components/OtpPad.vue";
import CreateWorkspace from "./components/CreateWorkspace.vue";
import UploadName from "./components/UploadName.vue";

import DashBoard from "./components/DashBoard.vue";
import GetWorkspace from "./components/GetWorkspace.vue";

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
    name: "CreateWorkspace",

    component: CreateWorkspace,
    path: "/space",
  },
  {
    name: "UploadName",
    component: UploadName,
    path: "/upload",
  },

  {
    name: "DashBoard",
    component: DashBoard,
    path: "/board",
  },

  {
    name: "GetWorkspace",
    component: GetWorkspace,
    path: "/getspace",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
