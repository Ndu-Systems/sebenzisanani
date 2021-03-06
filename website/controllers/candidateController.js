﻿app.controller('candidateController', function ($http, $scope, $window) {
    if (localStorage.getItem("isCandidateLoggedIn") !== "true") {
        $window.location.href = "#candidateLogin";
    }
    $scope.email = localStorage.getItem("candidate_email");
    $scope.name = localStorage.getItem("candidate_name");

    
   
    var data = {
        email: $scope.email
    };

    $http.post(GetApiUrl("Candidate_Get"), data).success(function (data, status) {
        
        $scope.candidate = data.candidate[0];       
        var obj = $scope.candidate;      
        $scope.name = obj.name;
        $scope.surname = obj.surname;
        $scope.cell = obj.cell;
        $scope.surname = obj.surname;
        $scope.cell = obj.cell;
        $scope.title = obj.title;
        $scope.jobCatergory = obj.jobCatergory;
        $scope.jobTitle = obj.jobTitle;
        $scope.jobDescription = obj.jobDescription;
        $scope.expirience = obj.expirience;
        $scope.cv = obj.cv;
        $scope.city = obj.city;
        $scope.password = obj.password;
        $scope.id = obj.id;

        if ($scope.cv === "" || $scope.cv === undefined) {
            $scope.warning = "We dont have your CV ";
        } else {
            $scope.warning = "Upload updated CV ";
        }
    })

    // on upload 
    $scope.filesChanged = function (eml) {
        $scope.files = eml.files;
        $scope.filename = $scope.files[0].name;
        $scope.$apply();
    };
    // end on upload

    $scope.UploadCV = function () {
        if ($scope.filename !== undefined) {
            var doc = "";
            var formData = new FormData();
            angular.forEach($scope.files, function (file) {
                formData.append('file', file);
                formData.append('name', file.name)
            });

            $http.post(GetApiUrl("upload"), formData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
            .success(function (resp) {
                var expectedDate = new Date();
                doc = GetHost(resp);
                  //alert(doc);
                var data = {
                    url: doc,
                    id: $scope.id
                   
                };
                $http.post(GetApiUrl("Save_CV_TO_DB"), data).success(function (data, status) {
                    if (parseFloat(data) === 1) {
                        //Candidate-Dashboard
                        // seuccess
                        localStorage.setItem("succes", "CV was uploaded  successfully");
                        localStorage.setItem("url", "#Candidate-Dashboard");
                        $window.location.href = "#succes";
                        //end success
                       
                    }
                    else {
                        $scope.error = "Something went wrong, please try again.";
                    }
                })
            })
        }
        else {
            $scope.error = "Please select the files!";
        }
    }

});
app.controller('updateCandidateController', function ($http, $scope, $window) {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        $window.location.href = "#candidateLogin";
    }
        $scope.name = localStorage.getItem("name");
        $scope.surname = localStorage.getItem("surname");
        $scope.email = localStorage.getItem("email");
        $scope.cell = localStorage.getItem("cell");
        $scope.id = localStorage.getItem("id");
    $scope.updateUser = function () {
        var data = {            
            surname: $scope.surname,
            cell: $scope.cell,
            id: $scope.id
        };
        $http.post(GetApiUrl("Candidate_Update"), data).success(function (data, status) {
            if (parseFloat(data) === 1) {
                localStorage.setItem("surname", $scope.surname);             
                localStorage.setItem("succes", "Details Updated Successfully");
                localStorage.setItem("url", "#candidate");
                $scope.error = undefined;
                $window.location.href = "#succes";
            }
            else {
                $scope.error = "Something Went Wrong, Please Try Again";
            }
        })
    };

});
app.controller('updateCVController', function ($http, $scope, $window) {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        $window.location.href = "#candidateLogin";
    }
    $scope.name = localStorage.getItem("name");
    $scope.surname = localStorage.getItem("surname");
    $scope.email = localStorage.getItem("email");
    $scope.title = localStorage.getItem("title");
    $scope.jobCatergory = localStorage.getItem("jobCatergory");
    $scope.jobTitle = localStorage.getItem("jobTitle");
    $scope.jobDescription = localStorage.getItem("jobDescription");
    $scope.expirience = localStorage.getItem("expirience");
    $scope.cv = localStorage.getItem("cv");
    $scope.city = localStorage.getItem("city");

    $scope.filesChanged = function (eml) {
        $scope.files = eml.files;
        $scope.filename = $scope.files[0].name;
        // alert($scope.filename);
        $scope.$apply();
    };
    $scope.UpdateCV = function () {
        if($scope.filename !== undefined){
            var doc = "";
            var formData = new FormData();

            angular.forEach($scope.files, function (file) {
                formData.append('file', file);
                formData.append('name', file.name)
            });

            $http.post(GetApiUrl("upload"), formData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
            .success(function (resp) {
                var expectedDate = new Date();
                doc = GetHost(resp);
                alert(doc);          
                
                var data = {
                    email: $scope.email,
                    cv: doc,
                    title: $scope.title,
                    jobTitle: $scope.jobTitle,
                    jobCatergory: $scope.jobCatergory,
                    jobDescription: $scope.jobDescription,
                    expirience: $scope.expirience,
                    city: $scope.city
                };

                $http.post(GetApiUrl("Candidate_updateCV"), data).success(function (data, status) {
                    if (parseFloat(data) === 1) {                      
                        $scope.message = undefined;
                        localStorage.setItem("succes", "CV  Updated Successfully");
                        localStorage.setItem("url", "#candidate");
                        $scope.error = undefined;
                        $window.location.href = "#succes";
                    }
                    else {
                        $scope.message = "Something went wrong, please try again.";
                    }
                })
            })
        }
        else {
            $scope.message = "Oops ! please Upload Updated CV"
        }
    }


});
app.controller('landingController', function ($http, $scope, $window) {
    // get  jobs
    var data = {
        table: "job",
        condition: " status = 'Open'"
    };
    $http.post(GetApiUrl("get"), data)
    .success(function (response, status) {
        if (response.data !== undefined) {
            $scope.openJobs = response.data;
            $scope.JobsCount = $scope.openJobs.length;
        } else {
            $scope.JobsCount = 0;
        }
    });

    $scope.GetJob = function (job) {
        var jobSelectedJob = {
            id: job.id,
            catergorty: job.catergorty,
            description: job.description,
            expirience: job.expirience,
            comment: job.comment,
            componeyId: job.componeyId,
            positions: job.positions,
            status: job.status,
            location: job.location,
            componeyName: job.componeyName,
            date: job.date
        };
        localStorage.setItem("jobSelectedJob", JSON.stringify(jobSelectedJob));
        $window.location.href = "#Job-Details";
    }

});
app.controller('jobDetailsController', function ($http, $scope, $window) {
   
    $scope.job = JSON.parse(localStorage.getItem("jobSelectedJob"));
   
    $scope.id = $scope.job.id;
    $scope.catergorty = $scope.job.catergorty;
    $scope.description = $scope.job.description;
    $scope.expirience = $scope.job.expirience;
    $scope.comment = $scope.job.comment;
    $scope.componeyId = $scope.job.componeyId;
    $scope.positions = $scope.job.positions;
    $scope.status = $scope.job.status;
    $scope.location = $scope.job.location;
    $scope.componeyName = $scope.job.componeyName;
    $scope.date = $scope.job.date;


    $scope.Appy = function () {
        $window.location.href = "#Apply";
        //if (localStorage.getItem("isCandidateLoggedIn") === "true") {
        //    $window.location.href = "#candidateLogin";
        //} else {

        //}
    }
});
app.controller('applyController', function ($http, $scope, $window) {

    $scope.job = JSON.parse(localStorage.getItem("jobSelectedJob"));

    $scope.id = $scope.job.id;
    $scope.catergorty = $scope.job.catergorty;
    $scope.description = $scope.job.description;
    $scope.expirience = $scope.job.expirience;
    $scope.comment = $scope.job.comment;
    $scope.componeyId = $scope.job.componeyId;
    $scope.positions = $scope.job.positions;
    $scope.status = $scope.job.status;
    $scope.location = $scope.job.location;
    $scope.componeyName = $scope.job.componeyName;
    $scope.date = $scope.job.date;
    //check if user is logged in aready
    if (localStorage.getItem("isCandidateLoggedIn") === "true") {
        AppyData($scope.id, localStorage.getItem("candidate_id"));
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

            $http.post(GetApiUrl("Candidate_Login"), data)
            .success(function (response, status) {
                if (response !== undefined && response.length !== 0) {
                    var user = response.candidate[0];
                    localStorage.setItem("candidate_name", user.name);
                    localStorage.setItem("candidate_id", user.id);
                    localStorage.setItem("candidate_identity", user.identity);
                    localStorage.setItem("candidate_email", user.email);
                    localStorage.setItem("candidate_cv", user.cv);
                    localStorage.setItem("candidate_cell", user.cell);
                    localStorage.setItem("isCandidateLoggedIn", true);
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
        var  contact_email = $scope.contact_email; 
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
                email:contact_email,
                cell :contact_cell,
                name: contact_name,
                type: "Candidate"
            };

            $http.post(GetApiUrl("Contact_Save"), data)
                      .success(function (response, status) {
                          SendMail(admin_email, $scope.contact_name + " are interested in job opportunity " + $scope.description + " Email " + contact_email + " Cell " + contact_cell, "Admin", "New job application", "application@sebenzisane.co.za");
                          // seuccess
                          localStorage.setItem("succes", response);
                          localStorage.setItem("url", "#Job-Offers");
                          $window.location.href = "#succes";
                    });
        }
    };

    function AppyData(jobId, candidateId) {
     
            var data = {
                jobId: jobId,
                candidateId: candidateId,
                status : "New"
            };

            $http.post(GetApiUrl("Job_Apply"), data)
            .success(function (response, status) {
                // seuccess
                localStorage.setItem("succes", response);
                localStorage.setItem("url", "#Candidate-Dashboard");
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

