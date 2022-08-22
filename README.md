- Navigation and routing
- Protected Route
- CRUD
- Component Creation
- Dynamic meta tags manupulation

- Vuex Store
- Dynamic Routes
- create route children

- pagination
- error handling
- progress bar
- flash messages

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
