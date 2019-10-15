<template>
    <div id="main" class="d-flex justify-center align-center">
        
            <v-file-input 
                outlined 
                dense 
                small-chips 
                multiple 
                :loading="processing" 
                label="informe os arquivos JSON com os dados para o teste" 
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

    public created() {
        this.$on('loadData', () => {
            if (
                files.getRelationships().length &&
                files.getTeachers().length &&
                files.getStudents().length &&
                files.getMatters().length &&
                files.getDegrees().length &&
                files.getClasses().length
            ) {
                this.$router.push('/students');
            }
        });
    }

    public loadFile() {
        localStorage.clear();

        files.saveFiles(this.files, this);
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
