import React from 'react';
import styles from '../styles/StudentName.module.css';

interface StudentNameProps {
    studentData: any,
    onClick?: any
}

interface StudentNameState {
    present: boolean
}

class StudentName extends React.Component<StudentNameProps, StudentNameState> {

    constructor(props: StudentNameProps) {
        super(props);

        this.state = {
            present: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event: any) {
        // TODO: update student data with current time stamp
        if (this.props.onClick) {
            this.props.onClick(this.props.studentData.studentId);
        }
        this.setState({
            present: !this.state.present
        });
    }

    render() {
        
        return (
            <li className={this.state.present ? styles.present : ''} onClick={this.handleClick}
                title={this.props.studentData.present}>
                {this.props.studentData.firstName} {this.props.studentData.lastName}
            </li>
        );
    }
}

export default StudentName;