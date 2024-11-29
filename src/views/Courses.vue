<template>
<h3>Courses</h3>




</template>

<script>

export default {
  name: "Courses",
  data() {
    return {
      courses: [],
    };
  },
  methods: {
    fetchRecords() {
      fetch(`http://localhost:3000/api/courses`)
        .then((response) => response.json())
        .then((data) => (this.courses = data))
        .catch((err) => console.log(err.message));
  },
  },
  mounted() {
    this.fetchRecords();
    console.log("mounted");
  } 
};
</script>

<style scoped>

h3 {
  text-align: center;
  color: rgb(8, 110, 110);
}
</style>
