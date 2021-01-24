import React from 'react';
import '../styles/StudentInput.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface StudentInputProps {
    showStudentInput: boolean,
    onClose: any,
    onSubmit: any
}

interface StudentInputState {
    value: string
}

class StudentInput extends React.Component<StudentInputProps, StudentInputState> {
    static defaultProps = {
        onSubmit: () => {console.log('submit')}
    }

    constructor(props: any) {
        super(props);
        this.state = {
            value: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any): void {
        this.setState({
            value: event.target.value
        })
    }

    handleSubmit(event: any): void {
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state.value);
        }
    }

    render() {
        return (
            <Dialog open={this.props.showStudentInput} onClose={this.props.onClose}>
                <DialogTitle>Add Students</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add a student's first and last name per line, separated by a space.
                </DialogContentText>
                    <TextField
                        multiline
                        onChange={this.handleChange}
                        rows={4}
                        autoFocus
                        id="name"
                        label="Student Names"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default StudentInput;