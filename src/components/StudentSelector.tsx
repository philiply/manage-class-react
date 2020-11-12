import React from 'react';

interface StudentSelectorProps {
    studentData: any,
}

interface StudentSelectorState {
    selectedName: string,
    selectedStudentId: number,
}

class StudentSelector extends React.Component<StudentSelectorProps, StudentSelectorState> {

    constructor(props: StudentSelectorProps) {
        super(props);

        this.state = {
            selectedName: 'Choose a student...',
            selectedStudentId: -1
        }

        this.pickName = this.pickName.bind(this);
    }

    pickName() {
        if (!this.props.studentData || this.props.studentData < 1) {
            return;
        }

        let studentsPresent = this.props.studentData.filter((student: any) => {
            return student.present;
        });

        // if no students present, don't pickName
        if (studentsPresent.length < 1) {
            this.setState({
                selectedName: 'No students present'
            })
            return;
        }

        const chosen = studentsPresent[Math.floor(Math.random() * studentsPresent.length)];

        this.setState({
            selectedName: `${chosen.firstName} ${chosen.lastName ? chosen.lastName : ''}`,
            selectedStudentId: chosen.studentId
        });
    }

    markAsResponded() {

    }

    markAsNotResponded() {

    }

    render() {
        return (
            <div style={{textAlign: 'center', flexGrow: 1}}>
                {this.state.selectedName}
                <div>
                    <button onClick={this.pickName}>Pick Name</button>
                </div>
                <div>
                    <button>Responded</button>
                    <button>No Response</button>
                </div>
            </div>
        );
    }
}

export default StudentSelector;