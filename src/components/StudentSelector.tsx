import React from 'react';

interface StudentSelectorProps {
    studentData: any,
    onMarkAsResponded?: any,
    onMarkAsNotResponded?: any
}

interface StudentSelectorState {
    selectedName: string,
    selectedStudentId: number,
    disableResponse: boolean,
    responseText: string
}

class StudentSelector extends React.Component<StudentSelectorProps, StudentSelectorState> {

    constructor(props: StudentSelectorProps) {
        super(props);

        this.state = {
            selectedName: 'Choose a student...',
            selectedStudentId: -1,
            disableResponse: false,
            responseText: ''
        }

        this.pickName = this.pickName.bind(this);
        this.markAsResponded = this.markAsResponded.bind(this);
        this.markAsNotResponded = this.markAsNotResponded.bind(this);
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
            selectedStudentId: chosen.studentId,
            disableResponse: false,
            responseText: ''
        });
    }

    markAsResponded() {
        if (this.state.selectedStudentId >= 0 && this.props.onMarkAsResponded) {
            this.props.onMarkAsResponded(this.state.selectedStudentId);

            this.setState({
                disableResponse: true,
                responseText: 'responded!'
            });
        }
    }

    markAsNotResponded() {
        if (this.state.selectedStudentId >= 0 && this.props.onMarkAsNotResponded) {
            this.props.onMarkAsNotResponded(this.state.selectedStudentId);

            this.setState({
                disableResponse: true,
                responseText: 'did not respond...'
            });
        }
    }

    render() {
        return (
            <div style={{textAlign: 'center', flexGrow: 1}}>
                <h2>{this.state.selectedName}</h2>
                <div>{this.state.responseText}</div>

                <div>
                    <button onClick={this.pickName}>Pick Name</button>
                </div>
                <div>
                    <button disabled={this.state.disableResponse} onClick={this.markAsResponded}>Responded</button>
                    <button disabled={this.state.disableResponse} onClick={this.markAsNotResponded}>No Response</button>
                </div>
            </div>
        );
    }
}

export default StudentSelector;