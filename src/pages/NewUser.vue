<template>
  <div class="flex flex-col md:flex-row">
    <div
      class="flex-1 bg-gray-200 flex py-5 md:px-2 lg:px-5 xl:px-10 flex-col h-full 2xl:h-screen"
    >
      <div class="flex justify-between mx-5 items-center mb-10">
        <div class="flex items-center">
          <img
            :src="authUser.image"
            :alt="authUser.name"
            class="inline-block h-8 w-8 rounded-full ring-2 ring-white mr-5"
          />
          <h1 class="font-bold uppercase tracking-widest text-xl md:text-2xl">
            {{ authUser.name }}
          </h1>
        </div>
        <div class="flex items-center">
          <button
            class="border-gray-600 px-2 rounded-md text-green-800 font-semibold hover:font-bold text-sm md:text-base"
            @click="this.$router.push('/new-post')"
          >
            Create Post
          </button>
          <vue-feather
            type="log-out"
            class="border-[1.5px] border-gray-400 w-fit h-fit text-gray-500 p-2 rounded-full cursor-pointer hover:bg-gray-500 hover:text-white ml-2"
            @click="handleLogout"
            size="20"
          ></vue-feather>
        </div>
      </div>

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
        @delete="handleRemove"
        @edit="handleEdit"
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
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { UserCard, Field, Form, ErrorMessage },
  mounted() {},
  computed: mapGetters(["allUsers", "authUser"]),
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
    handleLogout() {
      localStorage.removeItem("authUser");
      this.$router.push("/login");
    },
    handleInitialData() {
      const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
      let filterResult;
      let { search, age } = this.$route.query;
      console.log(search, age);
      if (search && age) {
        console.log("1");
        let ageLimits = age.split("-");
        filterResult = usersList.filter(
          (user) =>
            user.name.toUpperCase() === search.toUpperCase() ||
            user.email.toUpperCase() === search.toUpperCase() ||
            (user.address.toUpperCase() === search.toUpperCase() &&
              user.age >= ageLimits[0] &&
              user.age <= ageLimits[1])
        );
      } else if (search && !age) {
        console.log("2");
        filterResult = usersList.filter(
          (user) =>
            user.name.toUpperCase() === search.toUpperCase() ||
            user.email.toUpperCase() === search.toUpperCase() ||
            user.address.toUpperCase() === search.toUpperCase()
        );
      } else if (age && !search) {
        console.log("3");
        let ageLimits = age.split("-");
        filterResult = usersList.filter(
          (user) => user.age >= ageLimits[0] && user.age <= ageLimits[1]
        );
      } else {
        console.log("4");
        filterResult = usersList;
      }
      console.log(filterResult);
      return filterResult;
    },
    handleSubmit() {
      // console.log(this.user);
      if (this.user.name && this.user.email && this.user.age) {
        const flag = this.usersList.filter((user, index) => {
          if (user.email === this.user.email) {
            return (this.usersList[index] = this.user);
          }
        });
        // console.log(flag);
        if (flag.length == 0) {
          // this.usersList.push(this.user);
          this.usersList = [...this.usersList, this.user];
        }
      }
      localStorage.setItem("usersList", JSON.stringify(this.usersList));
      this.handleReset();
    },
    handleReset() {
      this.user = {};
    },
    handleRemove(userEmail) {
      console.log("remove", userEmail);
      this.usersList = this.usersList.filter((user) => user.email != userEmail);
      localStorage.setItem("usersList", JSON.stringify(this.usersList));
    },
    handleEdit(user) {
      // console.log("edit", user);
      this.user = user;
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
