import React from 'react';

type ClassSelectorProps = {
    onSwitchClass: any
};

class ClassSelector extends React.Component<ClassSelectorProps> {

    render() {
        return (
            <select onChange={this.props.onSwitchClass}>
                <option value="hr">Homeroom</option>
                <option value="p1">Period 1</option>
                <option value="p2">Period 2</option>
                <option value="p3">Period 3</option>
                <option value="p4">Period 4</option>
                <option value="p5">Period 5</option>
            </select>
        );
    }
}

export default ClassSelector;