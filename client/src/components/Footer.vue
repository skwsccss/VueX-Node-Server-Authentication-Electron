<template>
  <div class="footer">
    <div class="md-layout">
      <div class="md-layout-item md-small-size-10 md-size-10">
        <h4>Status :</h4>
      </div>
      <div class="md-layout-item md-small-size-90 md-size-90">
        <marquee>
          <h4>The Status will be displayed here!</h4>
        </marquee>
      </div>
    </div>
  </div>
</template>




<script>
export default {
  name: "Footer"
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
