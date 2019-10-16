<template>
  <v-card>
                <v-card-title>
                <span class="headline">Professor</span>
                </v-card-title>
                <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Nome" required v-model="name"></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" md="8">
                <v-select
                    :items="degreesSelect"
                    v-model="degreesFilter"
                    item-text="label"
                    label="Série"
                    single-line
                    autofocus
                    required
                    ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-select
                    :items="classesSelect"
                    v-model="classFilter"
                    item-text="label"
                    label="Serie"
                    single-line
                    autofocus
                    required
                    ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
        </v-card-actions>
      </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import * as files from '@/utils/files';
import { Degree } from '../models/degrees';
import { Class } from '../models/classes';
import { Relationship } from '../models/relationships';
import { Teacher } from '../models/teachers';

interface ISelect {
    label: string;
    value: any;
}

@Component({props: {
    relationship: Object,
} })
export default class Home extends Vue {
    public classesSelect: ISelect[] = [{label: 'Selecione Classe', value: null}];
    public degreesSelect: ISelect[] = [{label: 'Selecione Série', value: null}];
    public classFilter: Class | null | undefined = null;
    public degreesFilter: Degree | null | undefined = null;
    private name: string = '';

    public created() {
        files.getClasses().forEach((e) => this.classesSelect.push({label: e.name, value: e}));
        files.getDegrees().forEach((e) => this.degreesSelect.push({label: e.name, value: e}));

        this.name = this.$props.relationship.teacher ? this.$props.relationship.teacher.name : '';
        this.classFilter = this.$props.relationship.class ?
          files.getClassById(this.$props.relationship.class.id) :
          null;
        this.degreesFilter = this.$props.relationship.degree ?
          files.getDegreeById(this.$props.relationship.degree.id) :
          null;
    }

    public save() {
      const relationship = {id: this.$props.relationship.id };

      if (!this.$props.relationship.teacher) {
        let init: number = Math.max(...files.getTeachers().map<number>((e) => e.id));

        files.setTeachers(files.getTeachers().push(new Teacher(++init, this.name)));

        let initRelationship: number = Math.max(...files.getRelationships().map<number>((e) => e.id));
        files.setRelationships(files.getRelationships().push(new Relationship(
          ++initRelationship,
          init,
          0,
          this.degreesFilter ? [{
            degreeId: this.degreesFilter.id,
            classes: this.classFilter ? [{classPosition: this.classFilter.id}] : [],
          }] : [],
        )));
      } else {
        const t = files.getTeacherById(this.$props.relationship.teacher.id);

        if (t) {
          t.name = this.name;
          files.setTeachers(t);
        }
      }

      this.$emit('save', relationship);
    }

    public cancel() {
      this.$emit('modalClose');
    }
}
</script>

<style>

</style>