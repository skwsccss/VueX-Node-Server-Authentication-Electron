<template>
  <div class="footer">
    <div class="md-layout">
      <div class="md-layout-item md-small-size-10 md-size-10">
        <h4>Status :</h4>
      </div>
      <div class="md-layout-item md-small-size-90 md-size-90">
          <h4>{{msg}}</h4>
      </div>
    </div>
  </div>
</template>




<script>
export default {
  name: "Footer",
  props: {
    msg: String
  }
};
</script>

<style scoped>
.footer {
  background-color: green !important;
  height: 40px !important;
  width: 100%;
  color: white;
  position: fixed;
  bottom: 0;
  z-index: 10;
}
</style>
