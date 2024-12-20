<template>
<div class="A Course">
    <div id="form">
      <div class="field">
        <label>Course Name:</label>
        <input v-model="course.coursename" type="text" />
      </div>
      <div class="field">
        <label>Course Code:</label>
        <input v-model="course.coursecode" type="text" />
      </div>
      <div class="field">
        <label>Max Number of Students:</label>
        <input v-model="course.max" type="number" />
      </div>
      <div class="field">
        <label>Registered Students:</label>
        <input v-model="course.registered" type="number" />
      </div>
      <div class="field">
        <label>Available Places:</label>
        <input v-model="course.available" type="number" readonly/>
      </div>
      <div class="field">
        <label>Number of Groups:</label>
        <input v-model="course.groupsnumbers" type="number" :class="{'invalid-group': isInvalidGroupCount}"/>
      </div>
      
    </div>
    <button @click="updateCourse" class="update-btn" :disabled="isUpdateDisabled">Update</button>
    
     
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
        available: 0, 
        groupsnumbers: "",  
        description: ""
      },
    };
  },
  computed: {
    availablePlaces() {
      const max = parseInt(this.course.max, 10) || 0;
      const registered = parseInt(this.course.registered, 10) || 0;
      return max - registered; 
    },
    isInvalidGroupCount() {
      const registered = parseInt(this.course.registered, 10) || 0;
      const requiredGroups = Math.ceil(registered/30);
      const availableGroups = parseInt(this.course.groupsnumbers, 10) || 0;
      return requiredGroups > availableGroups;
    },
    isUpdateDisabled() {
      return this.isInvalidGroupCount;
    }
  },
  methods: {
    fetchACourse(id) {
      fetch(`http://localhost:4000/api/courses/${id}`)
      .then(response => response.json())
      .then((data) => (this.course = data))
      .catch((err) => console.log(err.message));
    },
    updateCourse() {
      this.course.available = this.availablePlaces;
      fetch(`http://localhost:4000/api/courses/${this.$route.params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.course)
      })
      .then(response => {
        this.$router.push("/courses");
      })
      .catch((e) => {
        console.log(e);
      });
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
.update-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.invalid-group {
  background-color: red;
}
.update-btn {
  
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
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