<template>
  <mdb-row style="justify-content: center">
    <mdb-col sm="6">
      <mdb-card wide style="margin-top:60px">
        <mdb-card-body>
          <form @submit.prevent="register">
            <p class="h4 text-center mb-4">Sign up</p>
            <div class="grey-text">
              <mdb-input v-model="userName" label="Your name" icon="user" type="text" required />
              <mdb-input v-model="email" label="Your email" icon="envelope" type="email" required />
              <mdb-input
                v-model="password"
                label="Your password"
                icon="lock"
                type="password"
                required
              />
              <mdb-input
                v-model="confirmPassword"
                label="Confirm your email"
                icon="exclamation-triangle"
                type="password"
                required
              />
            </div>
            <div class="text-center">
              <mdb-btn color="primary">Register</mdb-btn>
              <a href="/">Log in</a>
            </div>
          </form>
        </mdb-card-body>
      </mdb-card>
    </mdb-col>
  </mdb-row>
  <!-- Material form register -->

  <!-- Material form register -->
</template>

<script>
import { mdbInput, mdbBtn, mdbRow, mdbCol, mdbCard, mdbCardBody } from "mdbvue";
export default {
  name: "Register",
  components: {
    mdbInput,
    mdbBtn,
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody
  },
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
        .catch(err => console.log("err", err));
    }
  }
};
</script>