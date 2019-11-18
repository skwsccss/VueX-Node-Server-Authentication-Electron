<template>
  <div>
    <Header />
    <div v-if="status==='loading'">
      <img src="@/assets/source.gif" alt="loading" />
    </div>
    <div v-else class="md-layout home">
      <div class="md-layout-item md-small-size-100 md-size-100">
        <nav-tabs-card id="sssss">
          <template slot="content">
            <md-tabs class="md-info" md-alignment="left">
              <md-tab id="tab-home" md-label="Products" md-icon="bug_report">
                <div style="text-align: left; overflow: auto; min-height:460px; max-height:460px">
                  <md-card v-for="product in myProducts" :key="product.product.id">
                    <md-card-header data-background-color="green">
                      <h5>{{product.product.name}}</h5>
                    </md-card-header>
                    <md-card-content>
                      <div class="md-layout">
                        <div class="md-layout-item md-small-size-100 md-size-100">
                          <div v-html="product.product.product_item_info"></div>
                        </div>
                      </div>
                    </md-card-content>
                  </md-card>
                </div>
              </md-tab>
              <md-tab id="tab-pages" md-label="Settings" md-icon="settings">
                <p>Here is the setting page</p>
                <h4>Comming Soon</h4>
              </md-tab>
            </md-tabs>
          </template>
        </nav-tabs-card>
      </div>
    </div>
    <Footer :msg="currentStatus" />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import NavTabsCard from "@/components/NavTabsCard.vue";
import { exec } from "child_process";
import fixPath from "fix-path";
import os from "os";
import { ipcRenderer } from "electron";
import { mapState } from "vuex";
import env from "@/env.js";
export default {
  name: "home",
  components: {
    Header,
    Footer,
    NavTabsCard
  },
  computed: mapState(["status"]),
  data() {
    return {
      currentStatus: "Getting Device ID ...",
      myProducts: [],
      sync_status: ""
    };
  },
  mounted: function() {
    // this.init(__dirname.split("node_modules")[0]);
    this.init();
  },
  created: function() {
    ipcRenderer.on("deviceId", (event, arg) => {
      this.currentStatus = `Getting Device ID DONE Successfully, Your Device ID is <${arg}>`;
      this.$store
        .dispatch("registerDevice", { arg })
        .then(result => {
          this.currentStatus = `${result.data.registered} Successfully Registered`;
          this.$store
            .dispatch("getProduct")
            .then(result => {
              this.currentStatus = `Getting product done successfully !`;
              this.myProducts = result.data.my_products;
              setTimeout(() => {
                this.currentStatus = "";
              }, 2000);
            })
            .catch(() => {
              this.currentStatus = "Failed Get Product";
            });
        })
        .catch(() => {
          this.currentStatus = "Failed Registering Device...";
        });
    });
  },
  methods: {
    isInstalled() {
      return new Promise(resolve => {
        exec("brew list", (error, list, warning) => {
          if (error) this.sync_status = error;
          if (list) resolve(list);
          if (warning) this.sync_status = warning;
        });
      });
    },
    findSyncthing(isInstalledList) {
      return new Promise(resolve => {
        if (isInstalledList.includes("syncthing")) {
          resolve("true");
        } else {
          resolve("false");
        }
      });
    },
    async init() {
      fixPath();
      let OSType = os.type();
      if (OSType == "Darwin") {
        let isInstalledList = await this.isInstalled();
        let isSyncthing = await this.findSyncthing(isInstalledList);
        if (isSyncthing == "true") {
          exec("brew services start syncthing", (error, res, ss) => {
            if (error) this.sync_status = error;
            if (res) {
              if (res.includes("restart")) {
                exec("brew services start syncthing", (err, res, warning) => {
                  if (err) this.sync_status = err
                  if (res) this.sync_status = res
                  if (warning) this.sync_status = warning
                });
              }
            }
            if (ss) this.sync_status = ss;
          });
        } else if (isSyncthing == "false") {
          exec("brew install syncthing", (error, result, warning) => {
            if (error) this.sync_status = error
              if (result) {
                exec("brew services start syncthing", (err, res, ss) => {
                  if (err) this.sync_status = err
                  if (res) {
                    this.sync_status = res
                  }
                  if (ss) this.sync_status = ss
                });
              }
            if (warning) {
              exec("brew services start syncthing", (err, res, ss) => {
                if (err) this.sync_status = err
                if (res) {
                  this.sync_status = res
                }
                if (ss) this.sync_status = ss
              });
            }
          });
        }
      } else if (OSType == "Windows_NT") {
        let cli = `start "syncthing" ./sync/syncthing.exe -no-console -no-browser`;
        // let cli = `start "syncthing" ${path}src\\assets\\sync\\syncthing.exe -no-console -no-browser`;
        exec(cli, (err, data) => {
          if (err) this.sync_status = err;
          if(data) this.sync_status = data
        });
        setTimeout(() => {
          exec(cli, (err, data) => {
            if (err) this.sync_status = err
            if (data) this.sync_status = data
            ipcRenderer.send("getDeviceId", env.SYNC_URL);
          });
        }, 3000);
      }
    }
  }
};
</script>
<style  scoped>
.home {
  padding-top: 70px;
  max-width: 100% !important;
  /* padding-bottom: 40px; */
}
#sssss {
  min-height: 490px;
}
#inner-card {
  min-height: 400px;
}
/* .md-card .md-card-content {
  min-height: 550px;
  max-height: 550px;
} */
</style>