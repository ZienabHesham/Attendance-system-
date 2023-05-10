addEventListener("load", function () {

    let firstName = document.getElementsByName("firstName")[0];
    let lastName = document.getElementsByName("lastName")[0];
    let address = document.getElementsByName("address")[0];
    let email = document.getElementsByName("email")[0];
    let age = document.getElementsByName("age")[0];
    let role = document.getElementsByName("role");

    let firstNameErrorMsg = document.getElementsByClassName("errorMsg")[0];
    let lastNameErrorMsg = document.getElementsByClassName("errorMsg")[1];
    let addressErrorMsg = document.getElementsByClassName("errorMsg")[2];
    let emailErrorMsg = document.getElementsByClassName("errorMsg")[3];
    let ageErrorMsg = document.getElementsByClassName("errorMsg")[4];
    let submitErrorMsg = document.getElementsByClassName("errorMsg")[5];

    /*****First Name Vaidation******/
    firstName.addEventListener('blur', function () {
        if (!NameValidtion(firstName)) {
            firstName.focus();
            firstName.select();
            firstName.style.border = "3px solid red";
            firstNameErrorMsg.style.display = "block";
        }
        else {
            firstName.style.border = "3px solid green";
            lastName.focus();
            firstNameErrorMsg.style.display = "none";
        }
    });


    /*****Last Name Vaidation******/
    lastName.addEventListener('blur', function () {
        if (!NameValidtion(lastName)) {
            lastName.focus();
            lastName.select();
            lastName.style.border = "3px solid red";
            lastNameErrorMsg.style.display = "block";
        }
        else {
            lastName.style.border = "3px solid green";
            address.focus();
            lastNameErrorMsg.style.display = "none";
        }
    });


    /*****Address Vaidation******/
    address.addEventListener('blur', function () {
        if (!AddressValidtion(address)) {
            address.focus();
            address.select();
            address.style.border = "3px solid red";
            addressErrorMsg.style.display = "block";
        }
        else {
            address.style.border = "3px solid green";
            addressErrorMsg.style.display = "none";
        }
    });


    /*****Email Vaidation******/
    email.addEventListener('blur', function (data) {
        if (!EmailValidtion(email.value)) {
            email.focus();
            email.select();
            email.style.border = "3px solid red";
            emailErrorMsg.style.display = "block";
        }
        else {
            email.style.border = "3px solid green";
            age.focus();
            emailErrorMsg.style.display = "none";

        }
    });


    /*****Age Vaidation******/
    age.addEventListener('blur', function () {
        if (!AgeValidtion(age)) {
            age.focus();
            age.select();
            age.style.border = "3px solid red";
            ageErrorMsg.style.display = "block";
        }
        else {
            age.style.border = "3px solid green";
            ageErrorMsg.style.display = "none";
        }
    });


    /*****Submit Vaidation******/
    this.document.getElementsByTagName("form")[0].addEventListener("submit", function (event) {
        if (!(AgeValidtion(age) && EmailValidtion(email.value) && AddressValidtion(address) && NameValidtion(firstName)&& NameValidtion(lastName))) {
            event.preventDefault();
            submitErrorMsg.style.display = "block";
            firstName.focus();
        }
        else {
            event.preventDefault();
            submitErrorMsg.style.display = "none";
            convertDataToJson();
            location.replace("./LogIn.html")
        }
    })

    /*****Reset Vaidation******/
    this.document.getElementsByTagName("form")[0].addEventListener('reset', function (data) {
        if (!confirm("Are You Sure ?")) {
            data.preventDefault();
        }
        else {
            firstName.style.border = "1px solid black";
            lastName.style.border = "1px solid black";
            address.style.border = "1px solid black";
            age.style.border = "1px solid black";
            email.style.border = "1px solid black";

            firstNameErrorMsg.style.display = "none";
            lastNameErrorMsg.style.display = "none";
            addressErrorMsg.style.display = "none";
            ageErrorMsg.style.display = "none";
            emailErrorMsg.style.display = "none";
            submitErrorMsg.style.display = "none";
        }

    });

    /*****Validatons Functions *******/
   
    function NameValidtion(name) {
        if ((name.value)!= "") {
            var NamePattern = /^[a-zA-Z]{4,8}$/;
            return name.value.match(NamePattern);
        }
    };

    function AddressValidtion(address) {
        if (((address.value)!= "")){
            return true;
        }
    };

    function EmailValidtion(Email) {
        if (Email !="") {
            var EmailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            return Email.match(EmailPattern);
        }
    };

    function AgeValidtion(age) {
        if (((age.value)!= "") && (!isNaN(age.value)) && (age.value>=18)&&(age.value<=65)){
            return true;
        }
    };


    /****Function to convert data into JSON object*******/
    function convertDataToJson() {
        let EmpData = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            email: email.value,
            age: age.value,
            role: getRole()

        };
        fetch("http://localhost:3000/pending",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(EmpData),
        })
        
    };


    function getRole(){      
        for (let i = 0; i < role.length; i++) {
            if (role[i].checked) {
                console.log(role[i].value)
                return role[i].value;
            }
        }          
    }
})