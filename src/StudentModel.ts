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

    store(period: string, classList: Student[]) {

    }
}

export {StudentModel};