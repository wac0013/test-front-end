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
            <template v-slot:item.name="props">
                <v-edit-dialog
                :return-value.sync="props.item.name"
                @save="save"
                @cancel="cancel"
                @open="open"
                > {{ props.item.name }}
                <template v-slot:input>
                    <v-text-field
                    v-model="props.item.name"
                    :rules="[max25chars]"
                    label="Editar"
                    single-line
                    counter
                    ></v-text-field>
                </template>
                </v-edit-dialog>
            </template>
            <template v-slot:item.class.name="props">
                <v-edit-dialog
                :return-value.sync="props.item.classId"
                large
                persistent
                @save="save"
                @cancel="cancel"
                @open="open"
                >
                <div>{{ props.item.class.name }}</div>
                <template v-slot:input>
                    <v-select
                    :items="classes"
                    v-model="props.item.classId"
                    item-text="name"
                    item-value="id"
                    label="Classe"
                    single-line
                    autofocus
                    ></v-select>
                </template>
                </v-edit-dialog>
            </template>
            </v-data-table>
        </v-card>

        <div class="text-center pt-2">
            <div id="chartdiv"></div>
        </div>

        <div class="text-center pt-2">
            <v-btn color="primary" class="mr-2" @click="generateData">Gerar Dados</v-btn>
            <v-btn color="amber" @click="reset">Resetar aplicação</v-btn>
        </div>

        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
        {{ snackText }}
        <v-btn text @click="snack = false">Fechar</v-btn>
        </v-snackbar>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import * as files from '@/utils/files';
import { Degree } from '../models/degrees';
import { Class } from '../models/classes';
import { Student } from '../models/students';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

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
            text: 'Cod. aluno',
            align: 'rigth',
            sortable: false,
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
    public students: Student[] = [];
    public classesSelect: ISelect[] = [{label: 'Selecione Classe', value: null}];
    public degreesSelect: ISelect[] = [{label: 'Selecione Série', value: null}];
    public classFilter: Class | null = null;
    public degreesFilter: Degree | null = null;
    public snack: boolean = false;
    public snackColor = '';
    public snackText = '';
    public pagination = {};
    public chart?: am4charts.PieChart3D;

    private degrees: Degree[] = [];
    private classes: Class[] = [];

    public created() {
        this.students = files.getStudents();
        this.classes = files.getClasses();
        this.degrees = files.getDegrees();

        this.classes.forEach((e) => this.classesSelect.push({label: e.name, value: e}));
        this.degrees.forEach((e) => this.degreesSelect.push({label: e.name, value: e}));
    }

    public mounted() {
        this.chart = am4core.create('chartdiv', am4charts.PieChart3D);
        this.chart.hiddenState.properties.opacity = 0;
        this.chart.data = [];

        this.chart.innerRadius = am4core.percent(40);
        this.chart.depth = 120;
        this.degrees.forEach((e) => {
            if (this.chart) {
                this.chart.data.push({label: e.name, value: this.students.filter((s) => s.degreeId === e.id).length});
            }
        });

        this.chart.legend = new am4charts.Legend();

        const series: am4charts.PieSeries3D = this.chart.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = 'value';
        series.dataFields.depthValue = 'value';
        series.dataFields.category = 'label';
        series.slices.template.cornerRadius = 5;
        series.colors.step = 3;
    }

    public max25chars(v: string): boolean | string {
        return v.length <= 25 || 'Valor muito grande!';
    }

    public save() {
        this.snack = true;
        this.snackColor = 'success';
        this.snackText = 'Data salvo';
        files.setStudents(this.students);

        this.students = files.getStudents();
        this.classes = files.getClasses();
        this.degrees = files.getDegrees();

        if (this.chart) {
            const data: any[] = [];
            this.degrees.forEach((e) => {
                if (this.chart) {
                    data.push({
                        label: e.name,
                        value: this.students.filter((s) => s.degreeId === e.id).length,
                    });
                }
            });

            this.chart.data = data;
        }
    }

    public cancel() {
        this.snack = true;
        this.snackColor = 'error';
        this.snackText = 'Operação cancelada';
    }

    public open() {
        this.snack = true;
        this.snackColor = 'info';
        this.snackText = 'Em edição';
    }

    public get studentsFilter(): Student[] {
        let students: Student[] = this.students;

        students = students.filter((e) => e.classId === (this.classFilter ? this.classFilter.id : e.classId));
        students = students.filter((e) => e.degreeId === (this.degreesFilter ? this.degreesFilter.id : e.degreeId));
        return students;
    }

    public generateData() {
        let init: number = Math.max(...this.students.map<number>((e) => e.id));

        for (let i = 0; i < 300; i++) {
            const students = new Student(
                ++init,
                `Estudante ${init}`,
                Math.floor(Math.random() * 100000),
                this.getRandomDegree().id,
                this.getRandomClass().id,
            );

            this.students.push(students);
        }

        this.save();
    }

    public reset() {
        localStorage.clear();
        this.$router.push('/');
    }

    public beforeDestroy() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    private getRandomDegree(): Degree {
        return this.degrees[Math.floor(Math.random() * this.degrees.length)];
    }

    private getRandomClass(): Class {
        return this.classes[Math.floor(Math.random() * this.classes.length)];
    }
}
</script>

<style >
#chartdiv {
  width: 100%;
  height: 500px;
}
</style>
