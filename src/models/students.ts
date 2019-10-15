import { Degree } from './degrees';
import { getDegrees, getClasses } from '@/utils/files';
import { Class } from './classes';

export class Student {
    public id: number;
    public name: string;
    public ra: number;
    public degreeId: number;
    public classId: number;

    constructor(id: number, name: string, ra: number, degree: number, classe: number) {
        this.id = id;
        this.name = name;
        this.ra = ra;
        this.degreeId = degree;
        this.classId = classe;
    }

    get degree(): Degree | undefined {
        return getDegrees().find((v) => v.id === this.degreeId);
    }

    get class(): Class | undefined {
        return getClasses().find((v) => v.id === this.classId);
    }
}
