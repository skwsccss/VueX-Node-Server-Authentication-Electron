<template>
  <div>
    <form @submit.prevent="login" class="login">
      <div class="content">
        <div class="md-layout" style="justify-content:center">
          <div class="md-layout-item md-medium-size-50 md-size-50">
            <md-card>
              <md-card-header data-background-color="green">
                <h4 class="title">User Log in</h4>
              </md-card-header>
              <md-card-content>
                <div class="md-layout">
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-field>
                      <label>Email Address</label>
                      <md-input v-model="email" type="email" required></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-field>
                      <label>Password</label>
                      <md-input v-model="password" type="password" required></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-100 text-center">
                    <md-button class="md-raised md-success" type="submit">
                      log in
                      <i class="material-icons" style="padding-left:3px">exit_to_app</i>
                    </md-button>
                  </div>
                </div>
              </md-card-content>
            </md-card>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",

  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(res => {
          this.$router.push("/home");
          this.$notify({
            message: `Welcome to <b>"${res.data.user.name}"</b>`,
            icon: "add_alert",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "success"
          });
        })
        .catch(() => {
          this.$notify({
            message:
              "<strong>Unauthorized</strong>, Please check your email and password ",
            icon: "add_alert",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "danger"
          });
        });
    }
  }
};
</script>
<style>
.md-form .prefix {
  left: 0;
}

.login {
  padding-top: 120px;
}
</style>