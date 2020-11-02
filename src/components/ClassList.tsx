import React from 'react';
import StudentName from './StudentName';

type ClassListProps = {
    studentList: Array<any>
}

type ClassListState = {
    presentList: Array<any>
}

class ClassList extends React.Component<ClassListProps, ClassListState> {
    constructor(props: ClassListProps) {
        super(props);

        this.state = {
            presentList: []
        };

        this.updatePresentList = this.updatePresentList.bind(this);
    }

    updatePresentList(student: string) {
        
    }

    render() {
        return (
            <ul>
                {
                    this.props.studentList.map((student, idx) => {
                        // return <li key={`student${idx}`}>{student.firstName} {student.lastName}</li>
                        return <StudentName firstName={student.firstName} lastName={student.lastName} 
                            updatePresentList={this.updatePresentList} />
                    })
                }
            </ul>
        );
    }
}

export default ClassList;