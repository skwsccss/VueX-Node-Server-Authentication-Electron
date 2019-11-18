<template>
  <div>
    <md-toolbar class="md-accent">
      <h3 class="md-title" style="flex: 1"></h3>
      <p href="#!" style="padding-left:15px; color:white" class="size" @click="minimizeWindow">
        <i class="material-icons">minimize</i>
      </p>
      <p href="#!" style="padding-left:15px; color:white" class="size" @click="maximizeWindow">
        <i class="material-icons">maximize</i>
      </p>
      <p href="#!" style="padding-left:5px; color:white" @click="closeWindow">
        <span class="closeItem" style="padding:19px">
          <i class="material-icons">close</i>
        </span>
      </p>
    </md-toolbar>
  </div>
</template>

<style lang="scss" scoped>
.md-toolbar + .md-toolbar {
  margin-top: 10px;
}
</style>

<script>
import { remote, ipcRenderer } from "electron";
import { exec } from "child_process";
import os from "os";

export default {
  name: "Header",
  data() {
    return {};
  },
  created() {
    ipcRenderer.on("close", () => {
      window.close();
    });
  },

  methods: {
    maximizeWindow() {
      let window = remote.getCurrentWindow();
      window.isMaximized() ? window.unmaximize() : window.maximize();
    },
    minimizeWindow() {
      let window = remote.getCurrentWindow();
      window.minimize();
    },
    closeWindow() {
      let osType = os.type();

      if (osType == "Darwin") {
        exec("brew services stop syncthing", () => {
          // if (error) console.log(error);
          // console.log(res, ss)
          window.close();
        });
      } else if (osType == "Windows_NT") {
        ipcRenderer.send("closeWindow");
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-toolbar.md-theme-default.md-accent {
  position: fixed;
  top: 0;
}
.md-accent {
  background-color: black !important;
  height: 20px !important;
  z-index: 1000;
}
.md-accent p:hover {
  cursor: pointer;
}
.md-accent .size:hover {
  color: white !important;
  opacity: 0.7;
}
.md-accent .closeItem:hover {
  background-color: red;
}
</style>