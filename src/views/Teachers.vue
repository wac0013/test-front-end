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
            :items="studentsFilter"
            >
            </v-data-table>
        </v-card>        

        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                    <div class="text-center pt-2">
                        <v-btn color="primary" class="mr-2" @click="addRelationship" v-on="on"> <v-icon>add</v-icon> Cadastrar</v-btn>
                    </div>
                </template>
            
            </v-dialog>
        </v-row>

    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import * as files from '@/utils/files';
import { Degree } from '../models/degrees';
import { Class } from '../models/classes';
import { Relationship } from '../models/relationships';

interface ISelect {
    label: string;
    value: any;
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
})
export default class Home extends Vue {
    public headers = [
        {
            text: 'Cod. Professor',
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
    ];
    public relationships: Relationship[] = [];
    public classesSelect: ISelect[] = [{label: 'Selecione Classe', value: null}];
    public degreesSelect: ISelect[] = [{label: 'Selecione Série', value: null}];
    public classFilter: Class | null = null;
    public degreesFilter: Degree | null = null;
    public dialog: boolean = false;

    public created() {
        this.relationships = files.getRelationships();
        this.classes = files.getClasses();
        this.degrees = files.getDegrees();

        this.classes.forEach((e) => this.classesSelect.push({label: e.name, value: e}));
        this.degrees.forEach((e) => this.degreesSelect.push({label: e.name, value: e}));
    }

    public addRelationship() {
        //
    }

}
</script>

<style >

</style>
