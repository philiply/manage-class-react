interface Student {
    firstName: string,
    lastName: string,
    presentTime?: Date
}

class StudentModel {
    public period: string;

    constructor(period: string) {
        this.period = period;

    }

    public store(period: string, classList: Student[]) {
        // TODO: implement
    }

    public findStudent(firstName: string, lastName: string) {
        // TODO: need to implement
    }
}

export {StudentModel};