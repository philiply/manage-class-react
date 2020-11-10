import React from 'react';
import './App.css';
// import ClassSelector from './components/ClassSelector';
import {ClassSelector, ClassList, StudentInput} from './components';
// TODO: change types to interfaces
// TODO: import StudentModel file
// import {StudentModel} from './StudentModel';

type AppState = {
  classPeriod: string,
  studentList: Array<any>,
  showStudentInput: boolean
}

// type Student = {
//   studentId: number,
//   firstName: string,
//   lastName: string,
//   present?: Date
// }

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      classPeriod: 'hr',
      studentList: this.loadClassList('hr') || [],
      showStudentInput: false
    }

    // try to load student list by default if hr is already stored in localStorage
    // this.state.studentList = this.loadClassList('hr');

    this.processStudents = this.processStudents.bind(this);
    this.handleSwitchClass = this.handleSwitchClass.bind(this);
    this.saveClass = this.saveClass.bind(this);
    this.toggleStudentInput = this.toggleStudentInput.bind(this);
    this.updatePresentStatus = this.updatePresentStatus.bind(this);
    this.exportToCSV = this.exportToCSV.bind(this);
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
    let processed = students.split(/\n/).map((name, idx) => {
      return {
        studentId: idx,
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1]
      }
    });
    console.log(processed);
    // save to localStorage with classPeriod as key
    
    this.setState({
      studentList: processed,
      showStudentInput: false
    }, this.saveClass);
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
  saveClass(event?: any): void {
    if (window.localStorage) {
      localStorage.setItem(this.state.classPeriod, JSON.stringify(this.state.studentList));
      console.log('Class saved: ', this.state.classPeriod);
    }
  }

  toggleStudentInput(event: any): void {
    this.setState({
      showStudentInput: !this.state.showStudentInput
    });
  }

  updatePresentStatus(studentId: number) {
    let students = this.state.studentList;
    let updated = students.map((student) => {
      if (student.studentId === studentId) {
        if (student.present) {
          student.present = null;
        } else {
          student.present = new Date();
        }
      }
      return student;
    });
    this.setState({
      studentList: updated
    })
  }

  exportToCSV() {
    const headers = ['firstname', 'lastname', 'present'];
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += headers.join(',');
    csvContent += '\n';
    const studentList = this.state.studentList;
    csvContent += studentList.map((student) => {
      const studentRow = [student.firstName, student.lastName, student.present];
      return studentRow.join(',');
    }).join('\n');

    const encodedContent = encodeURI(csvContent);
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    let link = document.createElement("a");
    link.setAttribute("href", encodedContent);
    link.setAttribute("download", `${this.state.classPeriod}_${month}_${day}_${year}_activity.csv`);
    link.click();
  }

  getWeekDay(dayOfTheWeek: number) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return weekdays[dayOfTheWeek];
  }

  render() {
    const showStudentInput = this.state.showStudentInput;
    let studentInput;
    let toggleStudentInputBtnLabel = '+';
    if (showStudentInput) {
      studentInput = <StudentInput onSubmit={this.processStudents} />
      toggleStudentInputBtnLabel = '-';
    }

    const today = new Date();
    const time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const dayOfTheWeek = this.getWeekDay(today.getDay());

    return (
      <div className="App">
        <header>
          <div>
            <ClassSelector onSwitchClass={this.handleSwitchClass} />
            <button onClick={this.toggleStudentInput}>{toggleStudentInputBtnLabel}</button>
          </div>
          <h4>Time is {time} {dayOfTheWeek}</h4>
        </header>
        
        {studentInput}

        <section>
          <ClassList studentList={this.state.studentList} onStudentClick={this.updatePresentStatus} />
          {/* <div>Pick Name</div> */}
        </section>
        

        <div>
          <button onClick={this.exportToCSV}>Export To CSV</button>
        </div>

      </div>
    );
  }
  
}

export default App;
