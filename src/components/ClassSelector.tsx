import React from 'react';

type ClassSelectorProps = {
    onSwitchClass: any
};

class ClassSelector extends React.Component<ClassSelectorProps> {

    render() {
        return (
            <span>
                <label>Class:</label>
                <select style={{margin: '5px', height: '22px'}} onChange={this.props.onSwitchClass}>
                    <option value="hr">Homeroom</option>
                    <option value="p1">Period 1</option>
                    <option value="p2">Period 2</option>
                    <option value="p3">Period 3</option>
                    <option value="p4">Period 4</option>
                    <option value="p5">Period 5</option>
                </select>
            </span>
            
        );
    }
}

export default ClassSelector;