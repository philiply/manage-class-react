import React from 'react';
import './App.css';
// import ClassSelector from './components/ClassSelector';
import {ClassSelector, ClassList, StudentInput} from './components';

type AppState = {
  classPeriod: string,
  studentList: Array<Student>
}

type Student = {
  firstName: string,
  lastName: string,
  present?: Date
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      classPeriod: 'hr',
      studentList: this.loadClassList('hr') || []
    }

    // try to load student list by default if hr is already stored in localStorage
    // this.state.studentList = this.loadClassList('hr');

    this.processStudents = this.processStudents.bind(this);
    this.handleSwitchClass = this.handleSwitchClass.bind(this);
    this.saveClass = this.saveClass.bind(this);
  }

  loadClassList(period: string) {
    if (window.localStorage) {
      let item = localStorage.getItem(period);
      if (item) {
        return JSON.parse(item);
      }
        
      return;
    }
  }

  processStudents(students: string) :void {
    console.log('processing students');
    console.log(students);
    let processed = students.split(/\n/).map((name) => {
      return {
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1]
      }
    });
    console.log(processed);
    // save to localStorage with classPeriod as key
    this.setState({
      studentList: processed
    });
  }

  handleSwitchClass(event: any): void {
    let sList = [];
    if (window.localStorage && localStorage.getItem(event.target.value)) {
      let value = localStorage.getItem(event.target.value);
      if (value) {
        sList = JSON.parse(value);
      }
      
    }

    console.log(sList);
    this.setState({
      classPeriod: event.target.value,
      studentList: sList
    });
  }

  // TODO: extract localstorage interaction into model class
  saveClass(event: any): void {
    if (window.localStorage) {
      localStorage.setItem(this.state.classPeriod, JSON.stringify(this.state.studentList));
    }
  }

  render() {
    return (
      <div className="App">
        <ClassSelector onSwitchClass={this.handleSwitchClass} />

        <StudentInput onSubmit={this.processStudents} />
        <button onClick={this.saveClass}>Save</button>

        <ClassList studentList={this.state.studentList}/>

      </div>
    );
  }
  
}

export default App;
