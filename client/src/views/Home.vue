<template>
  <div>
    <Header />
    <div class="md-layout home">
      <div class="md-layout-item md-small-size-100 md-size-100">
        <nav-tabs-card>
          <template slot="content">
            <md-tabs class="md-info" md-alignment="left">
              <md-tab id="tab-home" md-label="Products" md-icon="bug_report">
                <p>products</p>
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

    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import NavTabsCard from "@/components/NavTabsCard.vue";
export default {
  name: "home",
  components: {
    Header,
    Footer,
    NavTabsCard
  },
  data() {
    return {
      tabActive: 0
    };
  }
};
</script>
<style  scoped>
.home {
  padding-top: 80px;
  max-width: 100% !important;
  margin-bottom: 40px;
}

</style>