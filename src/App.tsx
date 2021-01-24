import React from 'react';
import './App.css';
// import ClassSelector from './components/ClassSelector';
import {ClassSelector, ClassList, StudentInput, StudentSelector, ClassTime} from './components';

// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

// TODO: change types to interfaces
// TODO: import StudentModel file
// import {StudentModel} from './StudentModel';

// import {set as idbSet, get as idbGet} from 'idb-keyval';
import { openDB } from 'idb';

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
  db: any;
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
    this.handleStudentRespond = this.handleStudentRespond.bind(this);
    this.handleStudentNoRespond = this.handleStudentNoRespond.bind(this);

    this.setupLog();
  }

  async setupLog() {
    const db = await openDB('manage-class-logs', 2, {
      upgrade(db) {
        db.createObjectStore('logs', {
          keyPath: 'id',
          autoIncrement: true
        });
      }
    });

    this.db = db;
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

  toggleStudentInput(show?: any): void {
    let newState = show;
    if (show === undefined) {
      newState = !this.state.showStudentInput
    }
    this.setState({
      showStudentInput: newState
    });
  }

  logEvent(studentId: number, action: string) {
    if (this.db) {
      this.db.add('logs', {
        classroom: this.state.classPeriod,
        action: action,
        date: new Date(),
        studentName: this.getStudentName(studentId)
      })
    }
  }

  handleStudentRespond(studentId: number) {
    this.logEvent(studentId, 'responded');
  }

  handleStudentNoRespond(studentId: number) {
    this.logEvent(studentId, 'noResponse')
  }

  getLogs() {
    if (this.db) {
      // TODO: Need to implement
    }
  }

  generateReport() {
    // TODO: Need to implement
  }

  getStudentName(studentId: number) {
    for (let i = 0; i < this.state.studentList.length; i++) {
      if (this.state.studentList[i].studentId === studentId) {
        const student = this.state.studentList[i];
        return `${student.firstName} ${student.lastName}`;
      }
    }

    return '';
  }

  updatePresentStatus(studentId: number) {
    let students = this.state.studentList;
    let updated = students.map((student) => {
      if (student.studentId === studentId) {
        if (student.present) {
          student.present = null;
        } else {
          student.present = new Date();
          this.logEvent(studentId, 'present');
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

  render() {
    const showStudentInput = this.state.showStudentInput;
    // let studentInput;
    let toggleStudentInputBtnLabel = '+';
    if (showStudentInput) {
      // studentInput = <StudentInput onSubmit={this.processStudents} />
      toggleStudentInputBtnLabel = '-';
    }

    return (
      <div className="App">
        <header>
          <div>
            <ClassSelector onSwitchClass={this.handleSwitchClass} />
            <button onClick={() => {this.toggleStudentInput()}}>{toggleStudentInputBtnLabel}</button>

            <StudentInput showStudentInput={this.state.showStudentInput}
              onClose={() => {this.toggleStudentInput(false)}}
              onSubmit={this.processStudents} />
          </div>
          <ClassTime />
        </header>
        
        <section>
          <ClassList studentList={this.state.studentList} onStudentClick={this.updatePresentStatus} />
          <StudentSelector studentData={this.state.studentList}
            onMarkAsResponded={this.handleStudentRespond}
            onMarkAsNotResponded={this.handleStudentNoRespond} />
        </section>
        

        <div>
          <button onClick={this.exportToCSV}>Export Report</button>
        </div>

      </div>
    );
  }
  
}

export default App;
