<template>
  <div class="flex flex-col md:flex-row">
    <div
      class="flex-1 bg-gray-200 flex py-5 md:px-2 lg:px-5 xl:px-10 flex-col h-full 2xl:h-screen"
    >
      <top-bar></top-bar>

      <!-- form with name, email, age, imageurl -->
      <Form
        :validation-schema="simpleSchema"
        @submit="addUser(user)"
        class="bg-white rounded shadow p-12 justify-center xl:mx-16 2xl:mx-28 lg:my-10"
      >
        <div class="form-control mb-5">
          <h1 class="font-bold uppercase tracking-widest text-3xl mb-1">
            Welcome !
          </h1>
          <p class="text-gray-600">Please enter your details bellow</p>
        </div>
        <div class="form-control">
          <label class="label" for="name">Name</label>
          <Field
            id="name"
            name="name"
            type="text"
            class="input"
            placeholder="Name"
            v-model="user.name"
          />
          <ErrorMessage name="name" class="error-message" />
        </div>
        <div class="form-control">
          <label class="label" for="email">Email</label>
          <Field
            id="email"
            name="email"
            type="email"
            class="input"
            placeholder="Email"
            v-model="user.email"
          />
          <ErrorMessage name="email" class="error-message" />
        </div>
        <div class="form-control">
          <label class="label" for="age">Age</label>
          <Field
            id="age"
            name="age"
            type="number"
            class="input"
            placeholder="Age"
            v-model="user.age"
            min="10"
          />
          <ErrorMessage name="age" class="error-message" />
        </div>
        <div class="form-control">
          <label class="label" for="address">Address</label>
          <Field
            id="address"
            name="address"
            type="text"
            class="input"
            placeholder="Address ie: kabul, afg, USA"
            v-model="user.address"
          />
          <ErrorMessage name="address" class="error-message" />
        </div>
        <div class="form-control">
          <label class="label" for="image">Image</label>
          <Field
            id="image"
            name="image"
            type="url"
            class="input"
            placeholder="Image URL"
            v-model="user.image"
          />
          <ErrorMessage name="image" class="error-message" />
        </div>
        <div class="form-control">
          <label class="label" for="image">Password</label>
          <Field
            id="password"
            name="password"
            type="password"
            class="input"
            placeholder="Password ie: abc123!@#"
            v-model="user.password"
          />
          <ErrorMessage name="password" class="error-message" />
        </div>
        <div class="form-control flex flex-row justify-center items-center">
          <!-- radio button -->
          <Field
            type="checkbox"
            class="rounded-full"
            name="accept"
            id="accept"
          />
          <label for="radio" class="label ml-5 text-md text-gray-600"
            >By sumbmiting you agree to our terms of services and
            conditions.</label
          >
        </div>
        <div class="flex mb-5 mt-5">
          <!-- secondary btn for form reset -->
          <button
            class="rounded-md py-3 font-bold flex-1 mr-2 text-red-500 border border-red-100"
            type="button"
            @click.prevent="handleReset"
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
          Already have an account Login in
          <a href="#" class="text-blue-500">here</a>
        </p>
      </Form>
    </div>

    <div class="flex-1 h-full 2xl:h-screen">
      <!-- a loop for the usersList -->
      <div class="flex flex-wrap">
        <div
          v-if="this.$route.query.search"
          class="py-2 px-4 bg-slate-600 text-gray-100 rounded-full w-fit mx-2 my-2"
        >
          <span class="text-sm"> {{ this.$route.query.search }}</span>
          <span
            class="text-xs ml-2 hover:text-base cursor-pointer"
            @click="handleBadgeRemove('search')"
            >X</span
          >
        </div>
        <div
          v-if="this.$route.query.age"
          class="py-2 px-4 bg-slate-600 text-gray-100 rounded-full w-fit mx-2 my-2"
        >
          <span class="text-sm"> {{ this.$route.query.age }}</span>
          <span
            class="text-xs ml-2 hover:text-base cursor-pointer"
            @click="handleBadgeRemove('age')"
            >X</span
          >
        </div>
      </div>
      <user-card
        v-for="(user, index) in allUsers"
        v-if="allUsers.length > 0"
        :key="user.email"
        :user="{ ...user, index: index + 1 }"
        @edit="handleEditUser"
      ></user-card>

      <div v-else class="flex flex-1 flex-col justify-center items-center m-10">
        <vue-feather
          type="alert-triangle"
          class="p-5 bg-orange-100 rounded-full"
        ></vue-feather>
        <!-- <h2 class="font-bold text-yellow-700">No Users found!!!</h2> -->
      </div>
    </div>
  </div>
</template>
<script>
import UserCard from "../components/UserCard.vue";
import TopBar from "../components/TopBar.vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { UserCard, Field, Form, ErrorMessage, TopBar },
  mounted() {
    this.user = this.$route.params;
  },
  computed: mapGetters(["allUsers"]),
  data() {
    return {
      user: {},
      simpleSchema: {
        name: yup.string().required().label("Name"),
        email: yup.string().required().email().label("Email address"),
        age: yup.number().required().min(10).label("Age"),
        address: yup.string().required().label("Address"),
        image: yup.string().required().label("Image URL"),
        password: yup.string().required().min(2).label("Password"),
      },
    };
  },
  methods: {
    ...mapActions(["addUser"]),

    handleEditUser(user) {
      this.user = user;
    },

    handleReset() {
      this.user = {};
    },

    handleBadgeRemove(key) {
      console.log(key);
      let query = Object.assign({}, this.$route.query);
      delete query[key];
      console.log(query);
      this.$router.replace({ query });
      // this.usersList = this.handleInitialData();
      // this.$route.query.key = "";
    },
  },
};
</script>
