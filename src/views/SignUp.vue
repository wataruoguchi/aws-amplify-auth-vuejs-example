<template>
  <div class="sign-up">
    <h1>Sign Up</h1>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field v-model="username" :rules="emailRules" label="Email Address" required/>
      <v-text-field
        v-model="password"
        :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
        :rules="[passwordRules.required, passwordRules.min]"
        :type="passwordVisible ? 'text' : 'password'"
        name="password"
        label="Password"
        hint="At least 8 characters"
        counter
        @click:append="passwordVisible = !passwordVisible"
        required/>
      <v-btn :disabled="!valid" @click="submit">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      passwordVisible: false,
    }
  },
  computed: {
    emailRules() {
      return [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    },
    passwordRules() {
      return {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match'),
      }
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        console.log(`SIGN UP username: ${this.username}, password: ${this.password}, email: ${this.username}`);
      }
    },
  },
}
</script>