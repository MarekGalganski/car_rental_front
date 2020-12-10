<template>
  <v-container>
    <div class="dashboard">
      <h1>Dashboard</h1>
      <h1 v-if="$can($constants.permissions.viewDeveloperDashboard)">asdf</h1>
    </div>
  </v-container>
</template>

<script>
export default {
  
}
</script>