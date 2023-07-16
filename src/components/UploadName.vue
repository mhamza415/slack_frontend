<template>
  <div class="video">
    <video ref="videoElement" autoplay>Click a pic</video>
  </div>
  <div class="upload">
    <div class="circle8"></div>
    <div class="circle9"></div>
    <form enctype="multipart/form-data">
      <div class="upload1">
        <div action="upload">
          <h1>What is the name?</h1>
          <p>Add your Name</p>
          <input v-model="name" type="text" placeholder="Alax" autofocus />

          <h1>Your profile photo?</h1>
          <button id="startCamera" @click.prevent="startCamera">
            Start Camera
          </button>

          <button id="captureButton" @click.prevent="captureImage">
            Capture
          </button>
          <img
            ref="capturedImage"
            :src="capturedImageUrl"
            v-if="capturedImageUrl"
            alt="Captured Image"
          />
        </div>
        <div class="upload3">
          <button
            id="continueToNextStep"
            @click.prevent="continueToNextStep"
            type="submit"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UploadName",
  data() {
    return {
      name: "",
      isCameraStarted: false,
      videoStream: null,
      capturedImageUrl: null,
    };
  },
  methods: {
    startCamera() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            const videoElement = this.$refs.videoElement;
            videoElement.srcObject = stream;
            videoElement.play();
            this.isCameraStarted = true;
            this.videoStream = stream;
            var captureButton = document.getElementById("captureButton");
            captureButton.style.display = "block";
            var nextButton = document.getElementById("continueToNextStep");
            nextButton.style.display = "none";
          })
          .catch((error) => {
            console.log("Error accessing the web camera: ", error);
          });
      } else {
        console.log("getUserMedia is not supported in this browser.");
      }
    },
    captureImage() {
      const videoElement = this.$refs.videoElement;
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Set canvas dimensions to match the video stream
      canvas.width = videoElement.clientWidth;
      canvas.height = videoElement.clientHeight;

      // Draw the current frame of the video onto the canvas
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      // Convert the canvas image to a Blob
      canvas.toBlob((blob) => {
        const file = new File([blob], "profileImage.png");

        // Set the captured image data URL to display the image
        this.capturedImageUrl = URL.createObjectURL(blob);

        // Store the captured image file for form submission
        this.profileImage = file;
      });

      var captureButton = document.getElementById("captureButton");
      captureButton.style.display = "none";
      var nextButton = document.getElementById("continueToNextStep");
      nextButton.style.display = "block";
      var cameraButton = document.getElementById("startCamera");
      cameraButton.style.display = "none";

      // Stop the video stream
      if (this.videoStream) {
        const tracks = this.videoStream.getVideoTracks();
        tracks.forEach((track) => track.stop());
        this.videoStream = null;
      }
    },
    async continueToNextStep() {
      // // Proceed to the next step or perform any desired action
      // console.log("Next step");

      try {
        const id = localStorage.getItem("id");
        // Create a FormData object for form submission
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("id", id);
        formData.append("profileImage", this.profileImage);
        const response = await axios.post("/api/user/pic", formData);
        console.log(response);

        if (response.status === 201) {
          localStorage.setItem("user:info", JSON.stringify(response.data));
          localStorage.setItem("email", response.data.email);
          this.$router.push({ name: "GetWorkspace" });
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
  background-color: #0f0f0f;
  padding: 0;
}
#startCamera {
  display: block;
}
#captureButton {
  display: none;
  margin-top: 20px;
}
#continueToNextStep {
  display: block;
}
.upload {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 650px;
}
.upload1 {
  display: flex;
  width: 500px;
  height: 450px;
  border-radius: 15px;
  border: 1px solid gray;
  margin-top: 10px;
  color: #fff;
  text-align: left;
  position: relative;
  background-color: transparent;
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
  margin-top: 10px;
}
.upload1 button {
  background-color: #0f0f0f;
  color: #fff;
  margin-left: 115px;
  margin-bottom: 10px;
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
  margin-top: 320px;
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
.video video {
  display: block;
  width: 100px;
  max-width: 100px;
}

.upload img {
  display: block;
  float: left;
  width: 100px;
  max-width: 100px;
}
</style>
