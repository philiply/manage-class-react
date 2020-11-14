import React from 'react';
import StudentName from './StudentName';
import '../styles/ClassList.module.css';

type ClassListProps = {
    studentList: Array<any>,
    onStudentClick: any
}

type ClassListState = {
    sortOrder: number, // 0 original order, 1 firstName, 2 lastName
    sortReverse: boolean
}

class ClassList extends React.Component<ClassListProps, ClassListState> {
    constructor(props: ClassListProps) {
        super(props);

        this.state = {
            sortOrder: 0,
            sortReverse: true
        }

        this.changeSortOrder = this.changeSortOrder.bind(this);
    }

    changeSortOrder(order: number) {
        this.setState({
            sortOrder: order,
            sortReverse: !this.state.sortReverse
        });
    }

    render() {
        let studentsPresent = 0;
        this.props.studentList.forEach((student) => {
            if (student.present) {
                studentsPresent++;
            }
        });
        let sortedStudentList = [...this.props.studentList];
        if (this.state.sortOrder > 0) {
            sortedStudentList.sort((a, b) => {
                let result = 0;
                switch (this.state.sortOrder) {
                    case 1: // Sort by firstName
                        result = a.firstName[0] < b.firstName[0] ? -1 : 1;
                        break;
                    case 2: // Sort by lastName
                        result = a.lastName[0] < b.lastName[0] ? -1 : 1;
                        break;
                    default:
                }

                return this.state.sortReverse ? -result : result;
            });
        }
        return (
            <div>
                <h2>Class List:</h2>
                <div>
                    <div>Present: {studentsPresent}</div>
                    <div>
                        <span>Sort by:</span>
                        <button onClick={() => {this.changeSortOrder(1)}}>First Name</button>
                        <button onClick={() => { this.changeSortOrder(2)}}>Last Name</button>
                    </div>
                </div>
                {
                    this.props.studentList.length > 0 ?
                <ol>
                    
                        
                        {sortedStudentList.map((student, idx) => {
                            return <StudentName key={`student-${student.studentId}`} 
                                studentData={student}
                                onClick={this.props.onStudentClick} />
                        }) 
                        }
                        </ol> : <div>No students in this class</div>
                
                }
            </div>
            
        );
    }
}

export default ClassList;