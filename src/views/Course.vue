<template>
    <div class="course-card">
    <div class="field">
      <label>Course name</label>
      <p>{{ course.coursename }}</p>
    </div>
    <div class="field">
      <label>Code:</label>
      <p>
        <a :href="`/ACourse/${course.id}`">{{ course.coursecode }}</a>
      </p>
    </div>
    <div class="field">
      <label>Max number of students:</label>
      <p>{{ course.max }} hours</p>
    </div>
    <div class="field">
        <label>Refistered students</label>
        <p>{{course.registered }}</p>
    </div>
    <div class="field">
        <label>Available palces</label>
        <p>{{course.available }}</p>
    </div>
    <div class="field">
        <label>No of groups</label>
        <p>{{course.groupsnumbers }}</p>
    </div>
  </div>
</template>
  
<script>
  export default {
    name: "Course",
    props: {
      course: {
        type: Object,
        required: true,
      },
    },
  };
</script>
  
<style scoped>
  .course-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  padding: 15px;
  margin: 10px;
  border-radius: 15px;
  background-color: gray;
  
}

.field {
  display: flex;
  flex-direction: column;
  margin-right: 20px; 
}

.field label {
  font-weight: bold;
  margin-bottom: 5px;
}

.field p {
  margin: 0;
}
</style>
  