import React from 'react';

interface ClassTimeState {
    time: number
}

class ClassTime extends React.Component<{}, ClassTimeState> {
    interval: any;

    constructor(props: any) {
        super(props);
        this.state = {
            time: Date.now()
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({time: Date.now()})
        }, 1000 * 60)
    }

    getWeekDay(dayOfTheWeek: number) {
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        return weekdays[dayOfTheWeek];
    }

    render() {
        
        const currentTime = new Date(this.state.time);
        const currentTimeString = currentTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        const dayOfTheWeek = this.getWeekDay(currentTime.getDay());

        return (
            <div>
                <h4>{currentTimeString}</h4>
                <div>{dayOfTheWeek} {currentTime.toLocaleString('default', {month: 'long', day: 'numeric', year: 'numeric'})}</div>
            </div>
        );
    }
}

export default ClassTime;