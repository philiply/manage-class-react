import React from 'react';
import styles from '../styles/StudentName.module.css';

interface StudentNameProps {
    firstName: string,
    lastName: string,
    updatePresentList?: any
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
        this.setState({
            present: !this.state.present
        });
    }

    render() {
        
        return (
            <li className={this.state.present ? styles.present : ''} onClick={this.handleClick}>
                {this.props.firstName} {this.props.lastName}
            </li>
        );
    }
}

export default StudentName;