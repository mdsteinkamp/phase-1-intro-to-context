const emp1 = ['Matt', 'Steinkamp', 'CEO', 100];
const emp2 = ['Eric', 'Bernstein', 'CFO', 90];
const emp3 = ['Jaime', 'Lerman', 'COO', 90];
const emp4 = ['Ryan', 'Laffly', 'CTO', 80];
const emp5 = ["Julius", "Caesar", "General", 27];

const empArr = [emp1, emp2, emp3, emp4, emp5];


function createEmployeeRecord(employeeArr) {
    let employeeObj = {
        firstName: employeeArr[0],
        familyName: employeeArr[1],
        title: employeeArr[2],
        payPerHour: employeeArr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeObj;
};

function createEmployeeRecords(employeeArr) {
    return employeeArr.map(createEmployeeRecord)
};

function createTimeInEvent (employeeObj, dateStamp) {
    // let empObj = createEmployeeRecord(employeeObj)
    // console.log(empObj)
    let timeInEvent = employeeObj.timeInEvents;
    let timeInObj = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(11, 15),10),
        date: dateStamp.slice(0,10),
    }
    timeInEvent.push(timeInObj);
    return employeeObj;
};

function createTimeOutEvent(employeeObj, dateStamp) {
    // let empObj = createEmployeeRecord(employeeObj)
    let timeOutEvent = employeeObj.timeOutEvents;
    let timeOutObj = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(11, 15),10),
        date: dateStamp.slice(0,10),
    }
    timeOutEvent.push(timeOutObj);
    return employeeObj;
};

function hoursWorkedOnDate(employeeObj, date) {
    const workDateStart = employeeObj.timeInEvents.filter(entry => entry.date === date)
    const workDateEnd = employeeObj.timeOutEvents.filter(entry => entry.date === date)
    return (workDateEnd[0].hour - workDateStart[0].hour) / 100;

};

function wagesEarnedOnDate(employeeObj, date) {
    return hoursWorkedOnDate(employeeObj, date) * employeeObj.payPerHour;
};

function allWagesFor(employeeObj) {
    const allDates = employeeObj.timeInEvents.map(emp => emp.date)
    // console.log(allDates)
    return allDates.map(date => wagesEarnedOnDate(employeeObj, date)).reduce((total, item) => total + item);
};

function calculatePayroll(employeeArr) {
    let grandTotalOwed = employeeArr.reduce((m, emp) => m + allWagesFor(emp), 0)
    return grandTotalOwed;
};

