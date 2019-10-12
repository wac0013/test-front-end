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
}
