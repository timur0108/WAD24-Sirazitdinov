<template>
<div class="A Course">
    <div id="form">
      <div class="field">
        <label>Course Name:</label>
        <p class="value">{{ course.coursename }}</p>
      </div>
      <div class="field">
        <label>Course Code:</label>
        <p class="value">{{ course.coursecode }}</p>
      </div>
      <div class="field">
        <label>Max Number of Students:</label>
        <p class="value">{{ course.max }}</p>
      </div>
      <div class="field">
        <label>Registered Students:</label>
        <p class="value">{{ course.registered }}</p>
      </div>
      <div class="field">
        <label>Available Places:</label>
        <p class="value">{{ course.available }}</p>
      </div>
      <div class="field">
        <label>Number of Groups:</label>
        <p class="value">{{ course.groupsnumbers }}</p>
      </div>
    </div>
  </div>

</template>


<script>
export default {
  name: "ACourse",
  data() { 
    return {    
      course: {
        coursename: "",
        coursecode: "",
        max: "",
        registered: "",     
        available: "", 
        groupsnumbers: "",  
        description: ""
      },
    };
  },
  methods: {
    fetchACourse(id) {
      fetch(`http://localhost:4000/api/courses/${id}`)
      .then(response => response.json())
      .then((data) => (this.course = data))
      .catch((err) => console.log(err.message));
    }
  },
  mounted() {
    this.fetchACourse(this.$route.params.id);
     console.log(this.$route.params.id);
    console.log("mounted");
  } 
};
</script>

<style scoped>
#form {
  max-width: 500px;
  margin: 30px auto;
  background: rgb(167, 154, 154);
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.field label {
  font-weight: bold;
  margin-bottom: 10px;
  
}

.field .value {
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  font-weight: normal;
}
</style>