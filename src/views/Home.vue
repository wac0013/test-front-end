<template>
    <div id="main" class="d-flex justify-center align-center">
        <v-file-input 
            outlined 
            dense 
            small-chips 
            multiple 
            :loading="processing" 
            label="Arquivos de configuração" 
            accept=".json" 
            v-model="files"
            @change="loadFile()">
        </v-file-input>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as files from '@/utils/files';

@Component({})
export default class Home extends Vue {
    public processing: boolean = false;
    public files: File[] = [];

    public loadFile() {
        localStorage.clear();

        files.saveFiles(this.files);

        setInterval(() => {
            if (
                files.getRelationships() &&
                files.getTeachers() &&
                files.getStudents() &&
                files.getMatters() &&
                files.getDegrees() &&
                files.getClasses()
            ) {
                this.$router.push('/students');
            }
        }, 2000);
    }
}
</script>

<style>
#main {
    width: 100;
    height: 100%;
    padding: 10%;
}
</style>
