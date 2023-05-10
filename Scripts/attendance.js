addEventListener("load", function () {
    let employeeUN = document.getElementsByName("username")[1];
    let btn = document.getElementById("confirmation");   

    let date=moment("1999-07-15 8:30 AM","YYYY-MM-DD hh:mm A")
    console.log(date);

    console.log(date.hours() + ":" + date.minute())
    

    btn.addEventListener("click", function () {
        // console.log(employeeUN.value)
         getEmpData().then(async data =>{ 
            // console.log(data)
            let employee =  data.find( emp => emp.username === employeeUN.value )
            console.log(employee)
            // checkAttendance2(employee);
            // console.log(checkAttendance2(employee));
            await getallAttendance().then(data => {
                console.log("insideCheck")
               // console.log(data)
                let attendee = data.find(emp => emp.username === employee.username)
                console.log(attendee)
                return attendee
            }).then(obj => {
                console.log(obj)
             if ((employeeUN.value != "") && (employeeUN.value.trim().length != 0) && (employee.username == employeeUN.value)&&(!obj)) {
                
                 console.log("Inside emp if ")
                 //console.log(attendee)
                let arrivalD = moment();
                let arrivalTime = arrivalD.format("hh:mm");
                let arrivalDay = arrivalD.format("YYYY-MM-DD");

                let late = calcLatency(arrivalD, date);
                
                    $("table:last").append("<tr></tr>");
                    $("tr:last").append("<td>" + employee.username + "</td>" +
                        "<td>" + employee.firstName + "</td>" + "<td>" + employee.lastName
                        +"<td>"+arrivalTime+"</td>"+"<td>"+late+"</td>"
                );
                let attObj = {
                                username: employee.username,
                                firstName: employee.firstName,
                                lastName: employee.lastName,
                                age: employee.age,
                                email: employee.email,
                                address:employee.address,
                                arrival: arrivalD.toString(),
                                arrivalTime: arrivalTime,
                                arrivalDay:arrivalDay,
                                late: late,
                            }
                console.log(attObj)
                postAttendance(attObj);
            }
            else {
                 console.log("Inside emp else ")
                 console.log(" attendee")
                let leave = moment();
                 let leaveTime = leave.format("hh:mm")
                 $("table:last").append("<tr></tr>");
                    $("tr:last").append("<td>" + obj.username + "</td>" +
                        "<td>" + obj.firstName + "</td>" + "<td>" + obj.lastName
                        +"<td>"+obj.arrivalTime+"</td>"+"<td>"+obj.late+"</td>"+"<td>"+obj.leaveTime+"</td>")
                console.log(leaveTime) 
                let updatedObj = {
                    username : obj.username,
                    firstName : obj.firstName,
                    lastName: obj.lastName,
                    age: obj.age,
                    email: obj.email,
                    address: obj.address,
                    arrival: obj.arrival,
                    arrivalTime: obj.arrivalTime,
                    arrivalDay: obj.arrivalDay,
                    late: obj.late,
                    leaveTime : leaveTime
                }
                 console.log(updatedObj)
                 fetch("http://localhost:3000/attendance/"+obj.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                
                    body: JSON.stringify(updatedObj)
                }
                ).then(response => response.json())
                .then(data => {
                    // Do something with the updated data
                    console.log(data);
                   
                    })
                    .catch(error => {
                    console.error("in"+error);
                    });
            }
        })
            .catch(err => {
                console.log("error")
                    
            })
        })
        
    })

    

    
    function calcLatency(firstData,lastDate) {
        let lateM = firstData.minute() - lastDate.minute()
        let lateH = firstData.hours() - lastDate.hours();
        if ((firstData.minute() >= date.minute())&&((firstData.hours() >= lastDate.hours()))) {
            console.log("0"+lateH+":"+lateM)
        }
        else if((firstData.minute() < lastDate.minute())&&(firstData.hours() < lastDate.hours())){
            lateM = 00;
            lateH = 00;
        }
         else if ((firstData.minute() < lastDate.minute())&&((firstData.hours() >= lastDate.hours()))) {
            lateM = Math.abs(firstData.minute() - lastDate.minute());
        }
        else {
            lateH = 00;
        }
        return `0${lateH}:${lateM}`
    }

    async function postAttendance(obj) {
        let allAtt =await  fetch("http://localhost:3000/attendance", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        let allAttJSON = await allAtt.json();
        return allAttJSON;
       
    }
    
    async function getEmpData() { 
        let allEmp = await fetch("http://localhost:3000/employee");
        let allEmpAsJson = await allEmp.json();
        // console.log(allEmpAsJson);
        return allEmpAsJson
    }
    // async function getEmpData2(obj) { 
    //     let allEmp = await fetch(`http://localhost:3000/employee/${obj}`);
    //     let allEmpAsJson = await allEmp.json();
    //     // console.log(allEmpAsJson);
    //     return allEmpAsJson
    // }



    async function getallAttendance() {
        let allAtt = await fetch("http://localhost:3000/attendance");
        let allAttAsJson = await allAtt.json();
        // console.log(allAttAsJson);
        return allAttAsJson
    }

//    function checkAttendance() {
//         getallAttendance().then(data => {
//             data.forEach(object => {

//                 console.log("before") 
//                                 // console.log(object);
//                                 if (object.username == employeeUN.value) {
//                                     console.log("exist") 

//                                     let leave = moment();
//                                     let leaveTime = leave.format("hh:mm")
//                                     console.log(leaveTime) 
//                                     let updatedObj = {
//                                         username : object.username,
//                                         firstName : object.firstName,
//                                         lastName: object.lastName,
//                                         age: object.age,
//                                         email: object.email,
//                                         address: object.address,
//                                         arrival: object.arrival,
//                                         arrivalTime: object.arrivalTime,
//                                         arrivalDay: object.arrivalDay,
//                                         late: object.late,
//                                         leaveTime : leaveTime
//                                     }
//                                     // console.log(object)
//                                     fetch("http://localhost:3000/attendance/"+object.id, {
//                                         method: 'PUT',
//                                         headers: {
//                                             'Content-Type': 'application/json'
//                                         },
                                  
//                                         body: JSON.stringify(updatedObj)
//                                     }
//                                     ).then(response => response.json())
//                                     .then(data => {
//                                         // Do something with the updated data
//                                         console.log(data);
//                                       })
//                                       .catch(error => {
//                                         console.error(error);
//                                       });
                                    
//                                     return 1 
//                                 }
//                                 else {
//                                     console.log("DOesNT exist")
//                                     return 0
//                                 }
//                             })
//                         })
//     }

//      function checkAttendance2(attend) {
//         getallAttendance().then(data => {
//             console.log("insideCheck")
//             console.log(data)
//             let attendee = data.find(emp => emp.username === attend.username)

//             console.log(attendee)
//             return attendee
//         })
        
 
//     }
    
})