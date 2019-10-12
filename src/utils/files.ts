import { Teacher } from '@/models/teachers';
import { Student } from '@/models/students';
import { Matter } from '@/models/matters';
import { Degree } from '@/models/degrees';
import { Class } from '@/models/classes';
import { Relationship } from '@/models/relationships';

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

    ret = JSON.parse(ret ? ret : '');

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

    ret = JSON.parse(ret ? ret : '');

    if (Array.isArray(ret)) {
        ret.forEach((e) => {
            resultado.push(new Student(e.id, e.name, e.ra, e.degree, e.classe));
        });
    }

    return resultado;
}

export function getMatters(): Matter[] {
    let ret = localStorage.getItem(Files.MATTERS);
    const resultado: Matter[] = [];

    ret = JSON.parse(ret ? ret : '');

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

    ret = JSON.parse(ret ? ret : '');

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

    ret = JSON.parse(ret ? ret : '');

    if (Array.isArray(ret.classes)) {
        ret.forEach((e) => {
            resultado.push(new Class(e.id, e.name));
        });
    }

    return resultado;
}

export function getRelationships(): Relationship[] {
    let ret = localStorage.getItem(Files.RELATIONSHIPS);
    const resultado: Relationship[] = [];

    ret = JSON.parse(ret ? ret : '');

    if (Array.isArray(ret)) {
        ret.forEach((e) => {
            resultado.push(new Relationship(e.id, e.TeacherId, e.matterId, e.degrees));
        });
    }

    return resultado;
}


export function saveFiles(files: File[]) {
    files.forEach((file) => {
        const reader = new FileReader();

        reader.readAsText(file, 'UTF-8');
        reader.onload = (evt) => {
            if (evt && evt.target && typeof evt.target.result === 'string') {
                localStorage.setItem(file.name.split('.')[0], evt.target.result);
            }
        };
    });
}
