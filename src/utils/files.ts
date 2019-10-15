import { Teacher } from '@/models/teachers';
import { Student } from '@/models/students';
import { Matter } from '@/models/matters';
import { Degree } from '@/models/degrees';
import { Class } from '@/models/classes';
import { Relationship } from '@/models/relationships';

import Vue from 'vue';

export enum Files {
    TEACHERS = 'teachers',
    STUDENTS = 'students',
    MATTERS = 'matters',
    CLASSES = 'classes',
    DEGREES = 'degrees',
    RELATIONSHIPS = 'relationships',
}

export function getTeachers(): Teacher[] {
    let ret = localStorage.getItem(Files.TEACHERS);
    const resultado: Teacher[] = [];

    if (!ret) {
        return resultado;
    }

    ret = JSON.parse(ret);

    if (Array.isArray(ret)) {
        ret.forEach((e) => {
            resultado.push(new Teacher(e.id, e.name));
        });
    }

    return resultado;
}

export function getStudents(): Student[] {
    let ret = localStorage.getItem(Files.STUDENTS);
    const resultado: Student[] = [];

    if (!ret) {
        return resultado;
    }

    ret = JSON.parse(ret);

    if (Array.isArray(ret)) {
        ret.forEach((e) => {
            resultado.push(new Student(e.id, e.name, e.ra, e.degreeId, e.classId));
        });
    }

    return resultado;
}

export function getMatters(): Matter[] {
    let ret = localStorage.getItem(Files.MATTERS);
    const resultado: Matter[] = [];

    if (!ret) {
        return resultado;
    }

    ret = JSON.parse(ret);

    if (Array.isArray(ret)) {
        ret.forEach((e) => {
            resultado.push(new Matter(e.id, e.name));
        });
    }

    return resultado;
}

export function getDegrees(): Degree[] {
    let ret = localStorage.getItem(Files.DEGREES);
    const resultado: Degree[] = [];

    if (!ret) {
        return resultado;
    }

    ret = JSON.parse(ret);

    if (Array.isArray(ret)) {
        ret.forEach((e) => {
            resultado.push(new Degree(e.id, e.name));
        });
    }

    return resultado;
}

export function getClasses(): Class[] {
    let ret: any = localStorage.getItem(Files.CLASSES);
    const resultado: Class[] = [];

    if (!ret) {
        return resultado;
    }

    ret = JSON.parse(ret);

    if (Array.isArray(ret.classes)) {
        ret.classes.forEach((e) => {
            resultado.push(new Class(e.id, e.name));
        });
    }

    return resultado;
}

export function getRelationships(): Relationship[] {
    let ret = localStorage.getItem(Files.RELATIONSHIPS);
    const resultado: Relationship[] = [];

    if (!ret) {
        return resultado;
    }

    ret = JSON.parse(ret);

    if (Array.isArray(ret)) {
        ret.forEach((e) => {
            resultado.push(new Relationship(e.id, e.TeacherId, e.matterId, e.degrees));
        });
    }

    return resultado;
}

export function setClasses(v: any) {
    localStorage.setItem(Files.CLASSES, JSON.stringify(v));
}

export function setDegrees(v: any) {
    localStorage.setItem(Files.DEGREES, JSON.stringify(v));
}

export function setMatters(v: any) {
    localStorage.setItem(Files.MATTERS, JSON.stringify(v));
}

export function setRelationships(v: any) {
    localStorage.setItem(Files.RELATIONSHIPS, JSON.stringify(v));
}

export function setStudents(v: any) {
    localStorage.setItem(Files.STUDENTS, JSON.stringify(v));
}

export function setTeachers(v: any) {
    localStorage.setItem(Files.TEACHERS, JSON.stringify(v));
}

export function saveFiles(files: File[], component: Vue) {
    files.forEach((file) => {
        const reader = new FileReader();

        reader.readAsText(file, 'UTF-8');
        reader.onload = (evt) => {
            if (evt && evt.target && typeof evt.target.result === 'string') {
                localStorage.setItem(file.name.split('.')[0], evt.target.result);
                component.$emit('loadData');
            }
        };
    });
}
