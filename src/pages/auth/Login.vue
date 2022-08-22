<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  data() {
    return {
      email: "",
      password: "",
      simpleSchema: {
        email: yup.string().required().email(),
        password: yup.string().required().min(2),
      },
    };
  },
  computed: mapGetters(["errMsg", "authUser"]),
  methods: {
    ...mapActions(["login"]),
    handleLogin() {
      this.login({ email: this.email, password: this.password });
      if (this.authUser) {
        this.$router.push("/");
      }
    },
    handleReset() {
      this.email = "";
      this.password = "";
      this.errMsg = "";
    },
  },
};
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <Form
      class="bg-white rounded shadow p-7 md:p-12 w-[470px]"
      @submit="handleLogin"
      :validation-schema="simpleSchema"
    >
      <div class="form-control mb-5">
        <h1 class="font-bold uppercase tracking-widest text-3xl mb-1">
          Welcome !
        </h1>
        <p class="text-gray-600">Please enter your Email and Password</p>
      </div>

      <div class="form-control">
        <label class="label" for="email">Email</label>
        <Field
          id="email"
          name="email"
          type="email"
          class="input invalid:border-red-400 invalid:border-[2.5px]"
          placeholder="Email"
          v-model="email"
        />
        <ErrorMessage name="email" class="error-message" />
      </div>
      <div class="form-control">
        <label class="label" for="name">Password</label>
        <Field
          id="password"
          name="password"
          type="password"
          class="input"
          placeholder="Password"
          v-model="password"
        />
        <ErrorMessage name="password" class="error-message" />
      </div>

      <div class="form-control flex flex-row items-center">
        <!-- radio button -->
        <input type="checkbox" class="rounded-full" name="accept" id="accept" />
        <label for="radio" class="label ml-5 text-md text-gray-600"
          >Remember me for 30 days</label
        >
      </div>

      <p class="text-red-500 text-sm mt-1" v-if="errMsg">
        {{ errMsg }}
      </p>
      <div class="flex mb-5 mt-5">
        <!-- secondary btn for form reset -->
        <button
          class="rounded-md py-3 font-bold flex-1 mr-2 text-red-500 border border-red-100"
          type="button"
          @click="handleReset()"
        >
          Reset
        </button>
        <!-- form submit btn -->
        <button
          type="submit"
          class="bg-gray-700 rounded-md text-white py-3 font-bold flex-1"
        >
          Submit
        </button>
      </div>

      <p class="text-sm text-gray-700 text-center mt-5">
        Don't have an account! Register
        <a href="#" class="text-blue-500">here</a>
      </p>
    </Form>
  </div>
</template>

<style lang="css" scoped></style>
