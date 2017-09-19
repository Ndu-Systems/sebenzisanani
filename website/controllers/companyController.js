app.controller('companyController', function ($http, $scope, $window) {
    if (localStorage.getItem("isCompanyLoggedIn") !== "true") {
        $window.location.href = "#login";
    }
    $scope.companyName = localStorage.getItem("companyName");
    // get open jobs
    $scope.id = localStorage.getItem("companyId");
    var data = {
        table: "job",
        condition: "status = 'Open' AND componeyId = " + $scope.id
    };
    $http.post(GetApiUrl("get"), data)
    .success(function (response, status) {
        $scope.openJobs = response.data;
    });


    //get closed jobs
    var data = {
        table: "job",
        condition: "status = 'Closed' AND componeyId = " + $scope.id
    };
    $http.post(GetApiUrl("get"), data)
    .success(function (response, status) {
        $scope.closedJobs = response.data;
    });

    // get selected open job
    $scope.GetOpenJob = function (job) {
        localStorage.setItem("selectedJob", job.id);
        $window.location.href = "#this-job";
    };
});
app.controller('postjobController', function ($http, $scope, $window) {
    if (localStorage.getItem("isCompanyLoggedIn") !== "true") {
        $window.location.href = "#/";
    }
    $scope.Add = function () {
        $scope.message = undefined;
        var catergorty = $scope.catergorty;
        var description = $scope.description;
        var expirience = $scope.expirience;
        var comment = $scope.comment;
        var positions = $scope.positions;
        var location = $scope.location;
        var componeyName = localStorage.getItem("companyName");

        var data = {
            catergorty: catergorty,
            description: description,
            expirience: expirience,
            comment: comment,
            positions: positions,
            componeyId: localStorage.getItem("companyId"),
            location: location,
            componeyName: componeyName
        };
        $http.post(GetApiUrl("Company_Add_Job"), data)
        .success(function (response, status) {
            if (response === "1") {
                // seuccess
                localStorage.setItem("succes", "Job added successfully");
                localStorage.setItem("url", "#my-dashboard");
                $window.location.href = "#succes";
                //end success
            }
            else {
                $scope.message = "Opps some thing went wrong, please try again.";
            }
        });
    };
});
app.controller('succuessController', function ($http, $scope, $window) {
    $scope.success = localStorage.getItem("succes");
    $scope.OK = function () {
        $window.location.href = localStorage.getItem("url");
    }
});
app.controller('openjobController', function ($http, $scope, $window) {
    $scope.selectedJob = localStorage.getItem("selectedJob");
    var data = {
        table: "job",
        condition: "id = " + $scope.selectedJob
    };
    $http.post(GetApiUrl("get"), data)
    .success(function (response, status) {
        $scope.catergorty = response.data[0].catergorty;
        $scope.description = response.data[0].description;
        $scope.expirience = response.data[0].expirience;
        $scope.comment = response.data[0].comment;
        $scope.positions = response.data[0].positions;
        $scope.status = response.data[0].status;


    });
    // Update JOb
    $scope.Update = function (job) {
        var catergorty = $scope.catergorty;
        var description = $scope.description;
        var expirience = $scope.expirience;
        var comment = $scope.comment;
        var positions = $scope.positions;
        var status = $scope.status;
        var data = {
            catergorty: catergorty,
            description: description,
            expirience: expirience,
            comment: comment,
            positions: positions,
            status: status,
            jobId: $scope.selectedJob
        };

        $http.post(GetApiUrl("UpdateJob"), data)
        .success(function (response, status) {

            if (response === "1") {
                // success
                localStorage.setItem("succes", "Job updated successfully");
                localStorage.setItem("url", "#my-dashboard");
                $window.location.href = "#succes";
                //end success
            }
            else {
                $scope.message = "Opps some thing went wrong, please try again.";
            }
        });
    };

});
app.controller('landingCompanyController', function ($http, $scope, $window) {
    // get  candidates
    var data = {
        table: "candidate",
        condition: " 1 "
    };
    $http.post(GetApiUrl("get"), data)
    .success(function (response, status) {
        if (response.data !== undefined) {
            $scope.candidates = response.data;
            $scope.candidatesCount = $scope.candidates.length;
        } else {
            $scope.candidatesCount = 0;
        }
    });

    $scope.GetCandidate = function (candidate) {
        var SelectedCandidate = {
            id: candidate.id,
            name: candidate.name,
            surname: candidate.surname,
            email: candidate.email,
            cell: candidate.cell,
            identity: candidate.identity,
            title: candidate.title,
            jobCatergory: candidate.jobCatergory,
            jobTitle: candidate.jobTitle,
            jobDescription: candidate.jobDescription,
            expirience: candidate.expirience,
            cv: candidate.cv,
            city: candidate.city
        };
        localStorage.setItem("SelectedCandidate", JSON.stringify(SelectedCandidate));
        $window.location.href = "#Enquiry-Candidate";
    }

});
app.controller('candidateEnquiryController', function ($http, $scope, $window) {

    $scope.candidate = JSON.parse(localStorage.getItem("SelectedCandidate"));
    $scope.id = $scope.candidate.id;
    $scope.name = $scope.candidate.name;
    $scope.surname = $scope.candidate.surname;
    $scope.candidate_email = $scope.candidate.email;
    $scope.cell = $scope.candidate.cell;
    $scope.identity = $scope.candidate.identity;
    $scope.title = $scope.candidate.title;
    $scope.jobCatergory = $scope.candidate.jobCatergory;
    $scope.jobTitle = $scope.candidate.jobTitle;
    $scope.jobDescription = $scope.candidate.jobDescription;
    $scope.expirience = $scope.candidate.expirience;
    $scope.cv = $scope.candidate.cv;
    $scope.city = $scope.candidate.city;
    //check if user is logged in aready
    if (localStorage.getItem("isCompanyLoggedIn") === "true") {
        AppyData($scope.id, localStorage.getItem("companyId"));
        SendMail(admin_email, localStorage.getItem("candidate_name") + " are interested in job opportunity " + $scope.description + " Email " + localStorage.getItem("candidate_email") + " Cell " + localStorage.getItem("candidate_cell"), "Admin", "New job application", "application@sebenzisane.co.za");

    }
    // end check 

    $scope.LoginToAppy = function () {

        $scope.message2 = undefined;
        var email = $scope.email;
        var password = $scope.password;
        if (email !== undefined) {
            var data = {
                email: email,
                password: password
            };

            $http.post(GetApiUrl("login"), data)
            .success(function (response, status) {
                debugger
                if (response !== undefined && response.length !== 0) {
                    var user = response.client[0];

                    localStorage.setItem("companyName", user.name);
                    localStorage.setItem("companyId", user.id);
                    email: localStorage.setItem("email", user.email)
                    localStorage.setItem("isCompanyLoggedIn", true);

                    AppyData($scope.id, user.id);


                    me.message2 = undefined;
                }
                else {
                    $scope.message2 = "Your login credentials were not correct, please try again.";
                }
            });
        } else {
            $scope.message2 = "Email is invalid!";
        }
    };

    $scope.Contact_Save = function () {
        var contact_email = $scope.contact_email;
        var contact_cell = $scope.contact_cell;
        var contact_name = $scope.contact_name;
        if (contact_email === undefined) {
            $scope.message = "Enter valid email address";
        } else if (contact_cell === undefined) {
            $scope.message = "Enter valid cell number ";
        } else if (contact_name === undefined) {
            $scope.message = "Please tell us your name ";
        } else {
            // save info 
            var data = {
                email: contact_email,
                cell: contact_cell,
                name: contact_name,
                type: "Company"
            };

            $http.post(GetApiUrl("Contact_Save"), data)
                      .success(function (response, status) {
                          SendMail(admin_email, $scope.contact_name + " are interested in a candidate opportunity " + $scope.description   + " name: "+ $scope.name + " Email " + contact_email + " Cell " + contact_cell, "Admin", "New job application", "application@sebenzisane.co.za");
                          // seuccess
                          localStorage.setItem("succes", response);
                          localStorage.setItem("url", "#Our-Candidates");
                          $window.location.href = "#succes";
                      });
        }
    };

    function AppyData(jobId, candidateId) {

        var data = {
            jobId: jobId,
            candidateId: candidateId,
            status: "New"
        };

        $http.post(GetApiUrl("Job_Apply"), data)
        .success(function (response, status) {
            // seuccess
            localStorage.setItem("succes", response);
            localStorage.setItem("url", "#Our-Candidates");
            $window.location.href = "#succes";
        });

    }

    function SendMail(send_to, message, name_to, subject, from_from) {
        var emailObj = {
            email: send_to,
            body: message,
            name: name_to,
            subject: subject,
            from: from_from
        };
        $http.post("http://ndu-systems.net/Api/email.php", emailObj)
       .success(function (response) {
           console.log(response);
       })
    .error(function (error) {
        console.error(error);
    });

        // End Send Email
    }
});



