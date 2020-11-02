import React from 'react';

interface StudentInputProps {
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
            <div>
                <textarea onChange={this.handleChange} />
                <button onClick={this.handleSubmit}>Add students</button>
            </div>
        );
    }
}

export default StudentInput;