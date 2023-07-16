<template>
  <div class="dash_main">
    <div class="dash_main_sidebar">
      <div
        class="sidbar_workspace dropdown"
        @mouseover="showDropdown"
        @mouseleave="hideDropdown"
      >
        <h1>WorkSpace</h1>
        <div class="dropdown-content" v-show="isDropdownVisible">
          <ul>
            <li>
              <a href="#">
                <button class="btn_wrkspace">Edit WorkSpace</button>
              </a>
            </li>
            <li>
              <a href="#" class="channel-link">
                <button>Channel</button>
              </a>
              <ol>
                <li>
                  <a href="#">
                    <button>Create Channel</button>
                  </a>
                </li>
                <!-- <li>
                  <a href="#"><button>Remove Channel</button></a>
                </li> -->
                <li>
                  <a href="#">
                    <button>View All Channel</button>
                  </a>
                </li>
              </ol>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div class="sidebar_createusers">
        <h1>Direct Message</h1>
        <br />
        <br />
        <!-- <button class="adduser">Add User</button> <br /> -->
        <div class="members">
          <input
            type="email"
            v-model="newMember"
            placeholder="Enter Email Address"
          />
          <button @click="handleButtonClick">Add Member</button>
          <ul>
            <li
              v-for="member in members"
              :key="member.id"
              @click="selectMember(member.id)"
              :class="{ active: member.id === selectedMemberId }"
            >
              {{ member.name }}
            </li>
          </ul>
        </div>
        <!-- <button class="removeuser">Remove User</button> -->
      </div>
    </div>

    <div class="dash_main_content">
      <div v-if="selectedMemberId" class="chat-container">
        <h3>{{ getSelectedMemberName() }}</h3>
        <hr />
        <div
          v-for="message in getSelectedMemberMessages()"
          :key="message.id"
          :class="['message', { 'from-user': message.fromUser }]"
        >
          <strong>{{ message.sender }}:</strong> {{ message.text }}
        </div>
      </div>
      <hr />
      <div v-if="selectedMemberId" class="input-container">
        <input
          type="text"
          v-model="inputText"
          placeholder="Type your message..."
        />
        <button @click="handleSendButton">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import axios from "axios";
export default {
  name: "DashBoard",
  data() {
    return {
      isDropdownVisible: false,
      members: [],
      messages: {},
      newMember: "",
      inputText: "",
      selectedMemberId: null,
    };
  },

  mounted() {
    this.socket = io("http://172.16.4.110:6090/");
    this.socket.on("connect", () => {
      console.log("connected");
    });
  },

  methods: {
    showDropdown() {
      this.isDropdownVisible = true;
    },
    hideDropdown() {
      this.isDropdownVisible = false;
    },

    handleButtonClick() {
      this.addMember();
      this.getUsers();
    },

    handleSendButton() {
      this.getSelectedMemberMessages();
      this.sendMessage();
    },

    async getUsers() {
      try {
        const token = localStorage.getItem("token");
        const w_id = localStorage.getItem("w_id");
        let result = await axios.get(`api/workspace/getUsers/${w_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.members = result.data;
        console.log(result);
        // if (result.status == 201 || result.status == 200) {
        //   localStorage.setItem("user:info", JSON.stringify(result.data));
        //   localStorage.setItem("email", this.email);
        //   localStorage.setItem("token", result.data.token);
        //   localStorage.setItem("id", result.data.id);
        //   this.$router.push({ name: "OtpPad" });
        // }
      } catch (error) {
        console.error(error);
      }
    },

    async addMember() {
      try {
        // getusers
        const token = localStorage.getItem("token");
        const w_id = localStorage.getItem("w_id");
        let result = await axios.post(
          "api/workspace/addmember",
          {
            u_email: this.newMember,
            w_id: w_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(result);

        // if (result.status == 201 || result.status == 200) {
        //   localStorage.setItem("user:info", JSON.stringify(result.data));
        //   localStorage.setItem("email", this.email);
        //   localStorage.setItem("token", result.data.token);
        //   localStorage.setItem("id", result.data.id);
        //   this.$router.push({ name: "OtpPad" });
        // }

        if (this.newMember) {
          const memberId = Date.now();
          this.members.push({
            id: memberId,
            name: this.newMember,
          });
          this.messages[memberId] = [];
          this.newMember = "";
          this.socket.emit("add-user", "dbd6d078-4d45-42eb-91bd-8b466f7dfc76");
          console.log("added user");

          // this.socket.emit("connectToMember", memberId);
        }
      } catch (error) {
        console.error(error);
      }
    },

    selectMember(memberId) {
      this.selectedMemberId = memberId;
    },
    getSelectedMemberName() {
      const member = this.members.find(
        (member) => member.id === this.selectedMemberId
      );
      return member ? member.name : "";
    },
    getSelectedMemberMessages() {
      return this.messages[this.selectedMemberId] || [];
    },

    sendMessage() {
      if (this.inputText && this.selectedMemberId) {
        // const data = {
        //   sender: this.selectedMemberId,
        //   message: this.inputText,
        this.socket.emit("send-msg", {
          to: "dbd6d078-4d45-42eb-91bd-8b466f7dfc76",
          msg: this.inputText,
        });
        console.log(this.inputText);
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
.dash_main {
  width: 1350px;
  height: 600px;
}

.dash_main_sidebar {
  width: 250px;
  height: 600px;
  float: left;
  background: linear-gradient(to bottom, #61004b, #220a30);
}

.dash_main_content {
  width: 1100px;
  height: 600px;
  float: left;
  background: whitesmoke;
}

.sidbar_workspace {
  width: 100%;
  height: 300px;
  background: transparent;
}
.sidbar_workspace h1 {
  color: #ffffff;
  background: transparent;
  font-size: 22px;
  float: left;
  margin-left: 20px;
  margin-top: 10px;
}

.sidebar_createusers {
  width: 100%;
  height: 300px;
  background: transparent;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  background-color: transparent;
  color: #ffffff;
  margin: 10px;
  margin-top: 30px;
  min-width: 160px;
  /* box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2); */
}

.dropdown-content .btn_wrkspace {
  margin-top: 20px;
}

.dropdown-content a button {
  background: transparent;
  color: #ffffff;
  float: left;
  margin-left: 20px;
  text-decoration: none;
  padding: 10px;
}

.dropdown-content ul {
  list-style: none; /* Remove default list styles */
}
.dropdown-content ol {
  list-style: none; /* Remove default list styles */
}

.sidebar_createusers h1 {
  color: #ffffff;
  background: transparent;
  font-size: 22px;
  float: left;
  margin-left: 20px;
  margin-top: 10px;
}
.dropdown-content ol {
  display: none; /* Hide the nested ul by default */
  position: absolute;
  left: 80px;
  margin-top: 100px;
  background: transparent;
}

.dropdown:hover .dropdown-content {
  display: block;
  color: yellow;
}

.dropdown-content li:hover ol {
  display: block;
  color: aqua;
}

/* .sidebar_createusers .adduser {
  margin-top: 20px;
  margin-bottom: 10px;
  color: #ffffff;
  background: transparent;
  border: none;
  cursor: pointer;
  float: left;
  margin-left: 20px;
  font-size: 15px;
}

.sidebar_createusers .removeuser {
  margin-top: 10px;
  color: #ffffff;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 15px;
  float: right;
  margin-right: 140px;
} */

.sidebar_createusers .members {
  background: transparent;
  color: #ffffff;
  margin-top: 20px;
}

.members input {
  background: transparent;
  color: #ffffff;
  font-size: 17px;
  width: 200px;
  height: 30px;
  border: 0.5px solid gray;
  border-radius: 10px;
}

.members input::placeholder {
  color: whitesmoke;
  font-size: 15px;
  text-align: center;
}

.members button {
  background: transparent;
  width: 120px;
  height: 30px;
  margin-top: 10px;
  color: #ffffff;
  cursor: pointer;
  margin-bottom: 20px;
}

.members ul li {
  background: transparent;
  background-color: #61004b;
  font-size: 17px;
  padding: 5px;
}
.chat-container {
  width: 1100px;
  height: 550px;
  background-color: whitesmoke;
}

.message {
  background-color: #f1f1f1;
  margin-bottom: 5px;
}
.message strong {
  color: red;
  float: left;
  margin-left: 20px;
  background-color: whitesmoke;
}
.message.from-user {
  background-color: whitesmoke;
  color: black;
  float: right;
  margin-right: 20px;
}

.message.from-bot {
  background-color: #b3d0ff;
  float: left;
}

.input-container {
  position: fixed;
  height: 50px;
  width: 1100px;
  background-color: whitesmoke;
}

.input-container input {
  height: 100%;
  color: black;
  border-radius: 5px;
  background-color: whitesmoke;
  width: 1020px;
  float: left;
}

.input-container button {
  width: 70px;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  background-color: green;
  color: black;
}

.chat-container h3 {
  color: black;
  background: whitesmoke;
  text-align: center;
}
</style>
