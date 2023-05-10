$(function () {

    //****Pending REquests *********//
    $("#requests").on("click", function (e) {
        $.get("http://localhost:3000/pending", function (data) {
            console.log("clicked")
            
            console.log(data)
            $("#tablee").empty();
            $("#monthley").empty();
            $("#searchBar").empty();

            $("#tablee").append("<tr><th>First Name</th><th>Last Name</th><th>Address</th><th>Age</th><th>Email</th><th>Role</th><th>Approve</th><th>Reject</th></tr>");
            data.forEach(object => {
                $("#tablee").append("<tr></tr>");
                $("tr:last").append("<td>" + object.firstName + "</td>" +
                    "<td>" + object.lastName + "</td>" + "<td>" + object.address + "</td>"
                    + "<td>" + object.age + "</td>" + "<td>" + object.email + "</td>" +
                    "<td>" + object.role );
                $("tr:last").append("<td></td>");
                let approveRadio= $("td:last").append("<input type='radio' name='role' value='approve' />");
                $("tr:last").append("<td></td>");
                let rejectRadio = $("td:last").append("<input type='radio' name='role' value='reject' />");

                $(approveRadio).children(0).click(function (event) {

                    console.log(event.target.value);//***/
                    
                    let firstname = event.target.parentElement.parentElement.children[0].innerText;
                    let lastname = event.target.parentElement.parentElement.children[1].innerText;
                    let address = event.target.parentElement.parentElement.children[2].innerText;
                    let age = event.target.parentElement.parentElement.children[3].innerText;
                    let email = event.target.parentElement.parentElement.children[4].innerText;
                    let role = event.target.parentElement.parentElement.children[5].innerText;
                    let userName = generateRndUserName(firstname, lastname);

                    console.log(userName);
                    sendEmail(email, userName);

                    let newobj = {
                        username: userName,
                        password: "emp@1234",
                        firstName: firstname,
                        lastName: lastname,
                        address: address,
                        age: age,
                        email: email,
                        role: role
                    };
                    console.log(newobj);////
                    // console.log("sent");

                    $.post("http://localhost:3000/employee", newobj, function (data) {
                        console.log(data);

                    })//end of post function
                        .then(data => {
                            // console.log(object.id)
                            fetch("http://localhost:3000/pending/" + object.id, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data)
                            })
                            .then(response => {
                                if (response.ok) {
                                  // handle successful response
                                    console.log(event.target.parentElement.parentElement)////
                                    event.target.parentElement.parentElement.remove()
                                } else {
                                  throw new Error('Delete request failed.');
                                }
                              })

                        })
                        .catch(function (res) {
                            console.log(res);
                         });
                           
                })//end of approve function

                $(rejectRadio).children(0).click(function (event) {
                    //console.log(event.target.value)
                    fetch("http://localhost:3000/pending/" + object.id, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then(response => {
                        if (response.ok) {
                          // handle successful response
                            console.log(event.target.parentElement.parentElement)///
                            event.target.parentElement.parentElement.remove()
                        } else {
                          throw new Error('Delete request failed.');
                        }
                      })
                });//end of Reject function
            })//end of looping
        })//end of get function
    })//end of click function

    
   
    //********Daily Report********//
    $("#dailyReports").on("click", function () {
        $("#searchBar").empty();
        DisplayAtt();

    });


    //********Monthly Report********//
    $("#monthelyReports").on("click", function () {
        $("#tablee").empty();
        $("#monthley").empty();
        $("#searchBar").empty();

        $("#display").prepend('<section id="monthley">'
            + '<p class="selection">Select month:</p>'
            + '<label name="startDate">From:</label>'
            + '<input type="date" name="startDate" id="startDate"/>'
            + ' <label name="endDate">To:</label>'
            + '<input type="date" name="endDate" id="endDate"/>'
            +'</section>'
        )

            
        $("#monthley input[type='date']").on("change", function () {
            $("#tablee").empty();
            let startDate = $("#startDate").val();
            let endDate = $("#endDate").val();
            getallAttendance().then(data => {
                 $("#tablee").append("<tr><th>User Name</th><th>First Name</th><th>Last Name</th><th>Date</th><th>Arrival</th><th>Late</th><th>Leave</th></tr>");
                data.forEach(object => {
                    if ((object.arrivalDay >= startDate) && (object.arrivalDay <= endDate)) {
                             console.log(object.arrivalTime)
                            $("#tablee").append("<tr></tr>")
                            $("tr:last").append("<td>" + object.username + "</td>" +
                                "<td>" + object.firstName + "</td>" + "<td>" + object.lastName +
                                "<td>" + object.arrivalDay + "</td>" 
                                + "<td>" + object.arrivalTime + "</td>" + "<td>" + object.late + "</td>"+ "<td>" + object.leaveTime + "</td>");
                        }
                        else {
                            console.log("no");///
                        }
                    }
                )
            })
        })
    })    

    //********Search Employee ********//
    $("#search").on("click", function () { 
         $("#monthley").empty();
        $("#searchBar").empty();

        $("#display").prepend("<div id='searchBar'><input type='text' name='search' placeholder='Enter employee name'/><span><i class='fa-solid fa-magnifying-glass'></i></span></div>");
        DisplayAtt();
        
    $("input[name='search']").keyup(function(){
        let searchValue = $(this).val();
        $("tr:gt(0)").each(function (i, v) {
            let userName = $(v).children()[0].innerText;
            if (userName.toLocaleLowerCase().indexOf(searchValue) != -1) {
                $(this).show(500);
                $(this).css("color","green");
            }
            else if(userName.toLocaleLowerCase().indexOf(searchValue) == -1){
                $(this).hide(500);
                $(this).css("color","red");
            } 
                if (searchValue == "") {
                    $(this).show(500);
                    $(this).css("color","black");
                }
            })
        })
        
    });

    


    //********Display Employee Data********//
    $("#EmpData").on("click", function () {
        $("#tablee").empty();
        $("#monthley").empty();
        DisplayEmp();

    });

    function DisplayEmp() {
        getEmpData().then((data) => {
            console.log(data);
            $("table").append("<th>First Name</th><th>Last Name</th><th>Address</th><th>Age</th><th>Email</th><th>Role</th>");
            data.forEach(object => {
                
                $("table").append("<tr></tr>");
                $("tr:last").append("<td>" + object.firstName + "</td>" +
                    "<td>" + object.lastName + "</td>" + "<td>" + object.address + "</td>"
                    + "<td>" + object.age + "</td>" + "<td>" + object.email + "</td>" +
                    "<td>" + object.role);
            });
        });
    }

    function DisplayAtt() {
        return fetch("http://localhost:3000/attendance", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res);
                $("#tablee").html("");
                return res.json()
            })
            .then(data => {
                console.log(data)
                $("#tablee").empty();
                $("#monthley").empty();
                $("#tablee").append("<tr><th>User Name</th><th>First Name</th><th>Last Name</th><th>Arrival</th><th>Late</th><th>Leave</th></tr>");
                data.forEach(object => {
                    console.log(object);
                    
                    $("#tablee").append("<tr><td>" + object.username + "</td>" +
                    "<td>" + object.firstName + "</td>" + "<td>" + object.lastName
                        + "<td>" + object.arrivalTime + "</td>" + "<td>" + object.late +"</td> <td>"+object.leaveTime+ "</td></tr > ")
                    
                   
                })
                return data;
            })
            .catch(err => {
                console.log("ERROR" + err)
            });
    }

    function generateRndUserName(firstName, lastName) {
        let randomNum = Math.floor(Math.random() * 1000) + 100;
        let specialChar = ["_", "$", "^", "@", "&"];
        let randomChar = specialChar[Math.floor(Math.random() * specialChar.length)];
        return `${firstName}${randomChar}${lastName}${randomNum}`;
    }
    function sendEmail(Email1,username) {
        Email.send({
            SecureToken : "730cc426-ad7b-47b7-a992-6909e89122dd",
            To : Email1,
            From : "zienab.hesham1999@gmail.com",
            Subject : "Attendance system User Name and Password",
            Body: `userName: ${username}
            ,passWord: emp@1234`,
        })
    }

    async function getallAttendance() {
        let allAtt = await fetch("http://localhost:3000/attendance");
        let allAttAsJson = await allAtt.json();
        console.log(allAttAsJson);
        return allAttAsJson
    }

    async function getEmpData() { 
        let allEmp = await fetch("http://localhost:3000/employee");
        let allEmpAsJson = await allEmp.json();
        console.log(allEmpAsJson);
        return allEmpAsJson
    }
})//end of loading