<template>
<div class="A Course">
    <div id="form">

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
  },
  mounted() {
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
</style>