import React from 'react';
import StudentName from './StudentName';
import '../styles/ClassList.module.css';

type ClassListProps = {
    studentList: Array<any>,
    onStudentClick: any
}

class ClassList extends React.Component<ClassListProps> {

    render() {
        return (
            <div>
                <h2>Class List:</h2>
                {
                    this.props.studentList.length > 0 ?
                <ol>
                    
                        
                        {this.props.studentList.map((student, idx) => {
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