<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Teste</span>
        <span class="font-weight-light"> Front-End</span>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      
      <v-btn v-if="$route.name == 'teachers'" @click="goToStudents">
        Estudantes
      </v-btn>

      <v-btn v-if="$route.name == 'students' " @click="goToTeachers">
        Professores
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Home extends Vue {

  public goToStudents() {
    this.$router.push('/students');
  }

  public goToTeachers() {
    this.$router.push('/teachers');
  }
}
</script>

<style lang="scss">
</style>

