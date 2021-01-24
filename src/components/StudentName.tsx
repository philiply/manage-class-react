import React from 'react';
import styles from '../styles/StudentName.module.css';

interface StudentNameProps {
    studentData: any,
    onClick?: any
}

class StudentName extends React.Component<StudentNameProps> {

    constructor(props: StudentNameProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event: any) {
        if (this.props.onClick) {
            this.props.onClick(this.props.studentData.studentId);
        }
    }

    render() {
        const present = this.props.studentData.present;

        return (
            <li className={present ? styles.present : ''} onClick={this.handleClick}
                title={this.props.studentData.present}>
                {this.props.studentData.firstName} {this.props.studentData.lastName}
            </li>
        );
    }
}

export default StudentName;