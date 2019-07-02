<template>
  <div class="confirm">
    <h1>Confirm</h1>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field v-model="username" :rules="emailRules" label="Email Address" required/>
      <v-text-field v-model="code" :rules="codeRules" label="Code" required/>
      <v-btn :disabled="!valid" @click="submit">Submit</v-btn>
    </v-form>
    <v-btn @click="resend">Resend Code</v-btn>
  </div>
</template>

<script>
import {confirmSignUp, resendSignUp} from '@/utils/auth.js'
export default {
  name: "SignUpConfirm",
  data() {
    return {
      valid: false,
      username: '',
      code: '',
    }
  },
  computed: {
    emailRules() {
      return [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    },
    codeRules() {
      return [
        v => !!v || 'Code is required',
        v => (v && v.length === 6) || 'Code must be 6 digits'
      ]
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        console.log(`CONFIRM username: ${this.username}, code: ${this.code}`);
        confirmSignUp(this.username, this.code);
      }
    },
    resend() {
      console.log(`RESEND username: ${this.username}`);
      resendSignUp(this.username);
    }
  },
}
</script>
