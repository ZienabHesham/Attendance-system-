addEventListener("load", function () {


    let userName = localStorage.getItem("username");
   // $("#display").empty();
   // $("#monthley").empty();
    //$("#daily").empty();
    //$("#dailyInput").empty()

    $("#profile").on("click", function () {
        getEmployeeDate().then(data => {
            $("#dailyInput").empty();
            $("#tablee").empty();
            $("#monthley").empty();
            $("table").empty();
            $("#tablee").append("<th>User Name</th><th>First Name</th><th>Last Name</th><th>Address</th><th>Age</th><th>Email</th>");
            let employee = data.find(emp => emp.username === userName)
            if (employee) {
                    console.log("true");
                    console.log(employee);

                    $("#tablee").append("<tr></tr>");
                    $("tr:last").append("<td>" + employee.username + "</td>" +
                        "<td>" + employee.firstName + "</td>" +
                        "<td>" + employee.lastName + "</td>" + "<td>" + employee.address + "</td>"
                        + "<td>" + employee.age + "</td>" + "<td>" + employee.email);
                }
            
        })
    })
    $("#dailyReports").on("click", function () {

        $("#tablee").empty();
        $("#dailyInput").empty();
        $("#monthley").empty();
        $("table").empty();
        $("#display").prepend(`<section id="dailyInput">
        <span class="selection">Select day:</span>
        <input type="date" name="date" id="daily"/>
    </section>`)

        $("#daily").on("change", function () {
            let date = $("#daily").val();
            getEmployeeDate().then(data => {
                data.forEach(object => {
                    if (object.username == userName) {
                        console.log(object.arrivalDay);
                        console.log(date)
                        if (object.arrivalDay == date) {
                            console.log("yes");
                            $("#tablee").append("<tr><td>Arrival:</td>" + "<td>" + object.arrivalTime + "</td>" + "</tr>")
                            $("#tablee").append("<tr><td>Late:</td>" + "<td>" + object.late + "</td>" + "</tr>")
                        }
                        else {
                            console.log("no");
                        }
                    }
                })
            })

        })
    })

    $("#monthelyReports").on("click", function () {
        $("#tablee").empty();
        $("#dailyInput").empty();
        $("#monthley").empty();
        $("table").empty();
        $("#display").prepend(`<section id="monthley">
                <span class="selection">Select month:</span>

                <label name="startDate">From:</label>
                <input type="date" name="startDate" id="startDate"/>

                <label name="endDate">To:</label>
                <input type="date" name="endDate" id="endDate"/>
            </section>`)

        $("#monthley input[type='date']").on("change", function () {
            let startDate = $("#startDate").val();
            let endDate = $("#endDate").val();
            getEmployeeDate().then(data => {
                data.forEach(object => {
                    if (object.username == userName) {
                        console.log(object.arrivalDay);
                        if ((object.arrivalDay >=startDate)&&(object.arrivalDay <=endDate)) {
                            console.log("yes");
                             $("#display").append("<table></table>");
                            $("table:last").append("<tr><td>Day:</td>" + "<td>" + object.arrivalDay + "</td>" + "</tr>")
                            $("table:last").append("<tr><td>Arrival:</td>" + "<td>" + object.arrivalTime + "</td>" + "</tr>")
                            $("table:last").append("<tr><td>Late:</td>" + "<td>" + object.late + "</td>" + "</tr>")
                        }
                        else {
                            console.log("no");
                        }
                    }
                })
            })
        })

    })

    async function getEmployeeDate() {
        let allEmp = await fetch("http://localhost:3000/attendance");
        let allEmpAsJson = await allEmp.json();
        console.log(allEmpAsJson);
        return allEmpAsJson
    }
});

// data.forEach(element => {

            //     if (element.username == userName) {
            //         console.log("true");
            //         console.log(element);

            //         $("#tablee").append("<tr></tr>");
            //         $("tr:last").append("<td>" + element.username + "</td>" +
            //             "<td>" + element.firstName + "</td>" +
            //             "<td>" + element.lastName + "</td>" + "<td>" + element.address + "</td>"
            //             + "<td>" + element.age + "</td>" + "<td>" + element.email);
            //     }
            // });