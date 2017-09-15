app.controller('loginController', function ($http, $scope, $window) {
    var me = this;
    if (localStorage.getItem("isCompanyLoggedIn") === "true") {
        $window.location.href = "#my-dashboard";
    }
    $scope.Login = function () {
        $scope.message = undefined;
        var email = $scope.email;
        var password = $scope.password;

        if (email !== undefined) {
            var data = {
                email: email,
                password: password
            };

            $http.post(GetApiUrl("login"), data)
            .success(function (response, status) {
                if (response !== undefined && response.length !== 0) {
                    var user = response.client[0];

                    localStorage.setItem("companyName", user.name);
                    localStorage.setItem("companyId", user.id);
                    email: localStorage.setItem("email", user.email)
                    localStorage.setItem("isCompanyLoggedIn", true);
                    $window.location.href = "#my-dashboard";
                    me.message = undefined;
                }
                else {
                    $scope.message = "Your login credentials were not correct, please try again.";
                }
            });
        } else {
            $scope.message = "Please enter valid email address.";
        }

    };
});
app.controller('adminLoginController', function ($http, $scope, $window) {
    var me = this;
    if (localStorage.getItem("isAdminLoggedIn") === "true") {
        $window.location.href = "#admin-dashboard";
    }
    $scope.Login = function () {
        $scope.message = undefined;
        var email = $scope.email;
        var password = $scope.password;


        var data = {
            email: email,
            password: password
        };

        $http.post(GetApiUrl("Admin_login"), data)
        .success(function (response, status) {
            if (response !== undefined && response.length !== 0) {
                var user = response.client[0];

                localStorage.setItem("adminName", user.name);
                localStorage.setItem("adminId", user.id);
                email: localStorage.setItem("adminEmail", user.email);
                email: localStorage.setItem("adminRole", user.email);
                localStorage.setItem("isAdminLoggedIn", true);
                $window.location.href = "#admin-dashboard";
                me.message = undefined;
            }
            else {
                $scope.message = "Your login credentials were not correct, please try again.";
            }
        });
    };
});
app.controller('candidateLoginController', function ($http, $scope, $window) {
    var me = this;
    if (localStorage.getItem("isCandidateLoggedIn") === "true") {
        $window.location.href = "#Candidate-Dashboard";
    }
    $scope.loginUser = function () {
        $scope.message = undefined;
        var email = $scope.email;
        var password = $scope.password;

        var data = {
            email: email,
            password: password
        };

        $http.post(GetApiUrl("Candidate_Login"), data)
        .success(function (response, status) {
            if (response !== undefined && response.length !== 0) {
                var user = response.candidate[0];
                localStorage.setItem("candidate_name", user.name);                            
                localStorage.setItem("candidate_id", user.id);
                localStorage.setItem("candidate_identity", user.identity);
                email: localStorage.setItem("candidate_email", user.email);
                localStorage.setItem("candidate_cv", user.cv);
                localStorage.setItem("isCandidateLoggedIn", true);
                $window.location.href = "#Candidate-Dashboard";
              
                
                me.message = undefined;
            }
            else {
                $scope.message = "Your login credentials were not correct, please try again.";
            }
        });
    };
});
app.controller('logoutController', function ($http, $scope, $window) {
    localStorage.clear();
    $window.location.href = $location.absUrl();
});
app.controller('companyRegisterController', function ($http, $scope, $window) {
    $scope.message = undefined;
    $scope.Register = function () {

        $scope.message = undefined;
        var name = $scope.name;
        var contactperson = $scope.contactperson;
        var tel = $scope.tel;
        var email = $scope.email;
        var province = $scope.province;
        var city = $scope.city;
        var surbub = $scope.surbub;
        var address = $scope.address;
        var password = $scope.password;
        var passwordConfirm = $scope.passwordConfirm;
        if (password !== passwordConfirm) {
            $scope.message = "Password does not match";
        }
        else if (email === undefined) {
            $scope.message = "Invalid email address";
        }

        else {
            var data = {
                name: name,
                contactperson: contactperson,
                tel: tel,
                email: email,
                province: province,
                city: city,
                surbub: surbub,
                address: address,
                password: password
               
            };

            $http.post(GetApiUrl("Company_Add"), data)
            .success(function (response, status) {
                if (response === "1") {
                    $scope.message = "Halala !!!";
                    localStorage.setItem("email", $scope.email);
                    localStorage.setItem("name", $scope.name);
                    //Send email
                    var emailObj = {
                        email: localStorage.getItem("email"),
                        body: welcome,
                        name: localStorage.getItem("name"),
                        subject: "Welcome to black Friday",
                        from: "noreply@black-friday.co.za"
                    };
                    $http.post("http://ndu-systems.net/Api/email.php", emailObj)
                   .success(function (response) {
                       console.log(response);
                   })
                .error(function (error) {
                    console.error(error);
                });

                    // End Send Email
                    localStorage.setItem("isLoggedIn", true);

                    $window.location.href = "#my-dashboard";

                } else {
                    $scope.message = response;
                }
            });
        }
    };
});
app.controller('registerController', function ($http, $scope, $window) {
    $scope.message = undefined;
    $scope.Register = function () {

        $scope.message = undefined;
        var name = $scope.name;
        var surname = $scope.lastName;
        var email = $scope.email;
        var cell = $scope.cell;
        var password = $scope.password;
        var confirmPassword = $scope.confirmPassword;
        if (password !== confirmPassword) {
            $scope.message = "Password does not match";
        }
        else if (email === undefined) {
            $scope.message = "Invalid email address";
        }
        else if (name === undefined) {
            $scope.message = "Please Provide Surnames";
        }
        else if (surname === undefined) {
            $scope.message = "Please Provide First Name";
        }
        else if (cell === undefined) {
            $scope.message = "Please Provide Contact Number";
        }
        else {
            var data = {
                name: name,
                surname: surname,
                email: email,
                cell: cell,
                password:password
            };
            $http.post(GetApiUrl("Candidate_Add"), data)
                .success(function (response, status) {
                    if (response === "1") {
                        $scope.message = "Halala !!!";
                        localStorage.setItem("email", $scope.email);
                        localStorage.setItem("name", $scope.name);
                        //Send email
                        var emailObj = {
                            email: localStorage.getItem("email"),
                            body: welcome,
                            name: localStorage.getItem("name"),
                            subject: "Welcome To Sebenzanani",
                            from: "noreply@sebenzanani.co.za"
                        };
                    //    $http.post("http://ndu-systems.net/Api/email.php", emailObj)
                    //   .success(function (response) {
                    //       console.log(response);
                    //   })
                    //.error(function (error) {
                    //    console.error(error);
                    //});

                        // End Send Email
                        localStorage.setItem("isLoggedIn", true);

                        $window.location.href = "#updateCV";

                    } else {
                        $scope.message = response;
                    }
                });
         
        }


    }
});

app.controller('logoutController', function ($http, $scope, $window) {
    localStorage.clear();
    $window.location.href = "#/";
});
app.controller('registerCandidateController', function ($http, $scope, $window) {
    $scope.message = undefined;

    $scope.Register = function () {
        var name = $scope.name;
        var surname = $scope.surname;
        var email = $scope.email;
        var cell = $scope.cell;
        var identity = $scope.identity;
        var title = $scope.title;
        var jobCatergory = $scope.jobCatergory;
        var jobTitle = $scope.jobTitle;
        var jobDescription = $scope.jobDescription;
        var expirience = $scope.expirience;
        var cv ="";
        var city = $scope.city;
        var password = $scope.password;
        var passwordConfirm = $scope.passwordConfirm;
        if (password !== passwordConfirm) {
            $scope.message = "Password does not match";
        }
        else if (email === undefined) {
            $scope.message = "Invalid email address";
        }

        else {
            var data = {
                name             :name,
                surname         :surname,
                email           :email,
                cell            :cell,
                identity        :identity,
                title           :title,
                jobCatergory    :jobCatergory,
                jobTitle        :jobTitle,
                jobDescription  :jobDescription,
                expirience      :expirience,
                cv              :cv,
                city            :city,
               password        :password

            };

            $http.post(GetApiUrl("Candidate_Add"), data)
            .success(function (response, status) {
               
                if (response === "1") {
                    localStorage.setItem("candidate_email", $scope.email);
                    localStorage.setItem("candidate_name", $scope.name);
                    //Send email
                    var emailObj = {
                        email: localStorage.getItem("candidate_email"),
                        body: welcome,
                        name: localStorage.getItem("candidate_name"),
                        subject: "Welcome to Sebenzisanane",
                        from: "noreply@Sebenzisanane.co.za"
                    };
                    $http.post("http://ndu-systems.net/Api/email.php", emailObj)
                   .success(function (response) {
                       console.log(response);
                   })
                .error(function (error) {
                    console.error(error);
                });

                    // End Send Email
                    // seuccess
                    localStorage.setItem("succes", "You account was created successfully");
                    localStorage.setItem("url", "#candidateLogin");
                    $window.location.href = "#succes";
                    //end success

                } else {
                    $scope.message = response;
                }
            });
        }
    };
});