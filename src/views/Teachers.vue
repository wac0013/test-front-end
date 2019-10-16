<template>
    <div class="pa-2">
        <v-card>
            <v-card-title>
                <v-select
                    :items="classesSelect"
                    v-model="classFilter"
                    item-text="label"
                    label="Classe"
                    single-line
                    autofocus
                    ></v-select>
                <v-spacer></v-spacer>                
                <v-select
                    :items="degreesSelect"
                    v-model="degreesFilter"
                    item-text="label"
                    label="Série"
                    single-line
                    autofocus
                    ></v-select>
            </v-card-title>
            <v-data-table
            :headers="headers"
            :items="teacherFilter"
            >
                <template v-slot:item.action="{ item }">
                    <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                    >
                        edit
                    </v-icon>
                    <v-icon
                        small
                        @click="showStudents(item)"
                    >
                        remove_red_eye
                    </v-icon>
                </template>
            </v-data-table>

            <v-fab-transition>
                <v-btn
                    color="primary"
                    fab
                    large
                    dark
                    bottom
                    absolute
                    left
                    class="v-btn--example"
                    @click="addRelationship"
                >
                    <v-icon>add</v-icon>
                </v-btn>
            </v-fab-transition>  
        </v-card>

        <v-dialog v-model="dialogStudent" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Lista de Alunos</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <list-students v-if="dialogStudent" :classId="classSelected" :degreeId="degreeSelected"></list-students>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogStudent = false">OK</v-btn>
                        </v-card-actions>
                    </v-card>
        </v-dialog>

        <v-dialog v-model="dialogEdit" max-width="500px">
            <edit-teacher v-if="dialogEdit" :relationship="rowSelected" @modalClose="dialogEdit = false"></edit-teacher>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import * as files from '@/utils/files';
import { Degree } from '../models/degrees';
import { Class } from '../models/classes';
import { Teacher } from '../models/teachers';
import { Relationship } from '../models/relationships';

import listStudents from '@/components/list-students';
import editTeacher from '@/components/edit-teacher';

interface ISelect {
    label: string;
    value: any;
}

interface IRelationship {
    id: number;
    teacher: Teacher;
    degree?: Degree;
    class?: Class;
}

@Component({
    beforeRouteEnter(to, from, next) {
        if (
            !files.getRelationships().length ||
            !files.getTeachers().length ||
            !files.getStudents().length ||
            !files.getMatters().length ||
            !files.getDegrees().length ||
            !files.getClasses().length
        ) {
            next('/');
        }

        next();
    },
    components: {
        listStudents,
        editTeacher,
    },
})
export default class Home extends Vue {
    public headers = [
        {
            text: 'Cod. Professor',
            align: 'rigth',
            sortable: true,
            value: 'teacher.id',
        },
        {
            text: 'Nome',
            align: 'left',
            sortable: true,
            value: 'teacher.name',
        },
        {
            text: 'Série',
            align: 'center',
            sortable: false,
            filterable: true,
            value: 'degree.name',
        },
        {
            text: 'Classe',
            align: 'center',
            sortable: false,
            filterable: true,
            value: 'class.name',
        },
        {
            text: 'Ação',
            align: 'center',
            sortable: false,
            filterable: true,
            value: 'action',
        },
    ];
    public rows: IRelationship[] = [];
    public relationships: IRelationship[] = [];
    public classesSelect: ISelect[] = [{label: 'Selecione Classe', value: null}];
    public degreesSelect: ISelect[] = [{label: 'Selecione Série', value: null}];
    public classFilter: Class | null = null;
    public degreesFilter: Degree | null = null;
    public dialogEdit: boolean = false;
    public dialogStudent: boolean = false;
    public classSelected: number;
    public degreeSelected: number;
    public rowSelected: IRelationship;

    public created() {
        let count: number = 0;
        this.relationships = files.getRelationships();
        this.classes = files.getClasses();
        this.degrees = files.getDegrees();

        this.classes.forEach((e) => this.classesSelect.push({label: e.name, value: e}));
        this.degrees.forEach((e) => this.degreesSelect.push({label: e.name, value: e}));
        this.relationships.forEach((e: any) => {
            e.degrees.forEach((d: any) => {
                d.classes.forEach((c: any) => {
                    this.rows.push({
                        id: ++count,
                        teacher: files.getTeacherById(e.teacherId),
                        degree: files.getDegreeById(d.degreeId),
                        class: files.getClassById(c.classPosition || c.classId),
                    });
                });
            });
        });
    }

    public get teacherFilter(): IRelationship[] {
        let relations: IRelationship[] = this.rows;

        relations = relations.filter((e) => e.class.id === (this.classFilter ? this.classFilter.id : e.class.id));
        relations = relations.filter((e) => e.degree.id === (this.degreesFilter ? this.degreesFilter.id : e.degree.id));
        return relations;
    }

    public addRelationship() {
        this.editItem();
    }

    public editItem(item) {
        this.rowSelected = item;
        this.dialogEdit = true;
    }

    public showStudents(item) {
        this.classSelected = item.class.id;
        this.degreeSelected = item.degree.id;
        this.dialogStudent = true;
    }

}
</script>

<style >

</style>
