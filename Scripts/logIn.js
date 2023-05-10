$(function () {
    let userNameEl = document.getElementsByName("username")[0];
      let passWordEl = document.getElementsByName("password")[0];
      let submitErrorMsg= document.getElementsByClassName("errorMsg")[2];
    $("form").submit(function (event) {
        event.preventDefault();

        if ((userNameEl.value.trim() != 0) && (passWordEl.value.trim() != 0) && (userNameEl.value != "") && (passWordEl.value != "")) {
            isAdmin();
            isEmployee();
            isSecurity();
            submitErrorMsg.style.display = "none";
        localStorage.setItem("username", userNameEl.value);   
        }
        else {
            submitErrorMsg.style.display = "block";
        }
        


    })

    function isAdmin() {
        fetch("http://localhost:3000/admin")
            .then(response =>  response.json() )
            .then(jsonObj => {
                jsonObj.forEach(element => {

                    if ((userNameEl.value == element.username) && (passWordEl.value == element.password)) {
                        console.log("admin");
                        adminRedirection();
                        return "true";

                    }
                    else {
                        console.log("notAdmin");
                        submitErrorMsg.style.display = "block";
                        return "false";
                    }
                });
            }    
        );
    }

    function isEmployee() {
        fetch("http://localhost:3000/employee")
        .then(response =>  response.json() )
        .then(jsonObj => {
            jsonObj.forEach(element => {
                if ((userNameEl.value == element.username) && (passWordEl.value == element.password)&&(element.role=="employee")) {
                    console.log("employee");
                    employeeRedirection();
                    return "true"

                }
                else {
                    console.log("not employee");
                    submitErrorMsg.style.display = "block";
                    return "false";
                }
            });
        }    
    );
    }

    function isSecurity() {
        fetch("http://localhost:3000/employee")
        .then(response =>  response.json() )
        .then(jsonObj => {
            jsonObj.forEach(element => {
                if ((userNameEl.value == element.username) && (passWordEl.value == element.password)&&(element.role=="security")) {
                    console.log("employee");
                    securityRedirection();
                    submitErrorMsg.style.display = "none";
                    return "true"

                }
                else {
                    console.log("not employee");
                    submitErrorMsg.style.display = "block";
                    return "false";
                }
            });
        }    
    );
    }
    function adminRedirection() {
       location.replace("./admin.html")
    }
    
    function employeeRedirection() {
        location.replace("./employee.html")
    }
    function securityRedirection() {
        location.replace("./attendance.html")
    }
})
    
