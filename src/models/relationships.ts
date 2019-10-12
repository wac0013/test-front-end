export interface IClass {
    classPosition: number;
}

export interface IDegree {
    degreeId: number;
    classes: IClass[];
}

export class Relationship {
    public id: number;
    public teacherId: number;
    public matterId: number;
    public degrees: IDegree[];

    constructor(id: number, teacherId: number, matterId: number, degrees: IDegree[]) {
        this.id = id;
        this.teacherId = teacherId;
        this.matterId = matterId;
        this.degrees = degrees;
    }
}
