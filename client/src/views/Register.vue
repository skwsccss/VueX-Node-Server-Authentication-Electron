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
                      <label>User name</label>
                      <md-input v-model="email" type="userName" required></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-field>
                      <label>Email Address</label>
                      <md-input v-model="email" type="email" required></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-field>
                      <label>Password</label>
                      <md-input v-model="ConfirmPassword" type="password" required></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-field>
                      <label>Comfirm Password</label>
                      <md-input v-model="password" type="password" required></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-100 text-center">
                    <md-button class="md-raised md-success" type="submit">
                      register
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
  name: "Register",
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    register: function() {
      let data = {
        userName: this.userName,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      };
      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/"))
        // .catch(err => console.log("err", err));
    }
  }
};
</script>