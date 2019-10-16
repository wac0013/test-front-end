<template>
  <v-data-table
    :headers="headers"
    :items="students"
    class="elevation-1"
  ></v-data-table>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import * as files from '@/utils/files';
import { Degree } from '../models/degrees';
import { Class } from '../models/classes';
import { Relationship } from '../models/relationships';
import { Student } from '../models/students';

interface ISelect {
    label: string;
    value: any;
}

@Component({props: {
    classId: {
        type: Number,
        required: true,
    },
    degreeId: {
        type: Number,
        required: true,
    },
} })
export default class Home extends Vue {
    public students: Student[] = [];
    public headers: any[] = [
        {
            text: 'Cod. Aluno',
            align: 'rigth',
            sortable: true,
            value: 'id',
        },
        {
            text: 'Nome',
            align: 'left',
            sortable: true,
            value: 'name',
        },
    ];

    public mounted() {
        this.students = files.getStudents().filter((s) => {
            return s.degreeId === this.$props.degreeId && s.classId === this.$props.classId;
        });
    }
}
</script>

<style>

</style>