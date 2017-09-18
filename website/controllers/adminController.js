app.controller('adminController', function ($http, $scope, $window) {
    $scope.name = localStorage.getItem("adminName");
    $scope.adminId = localStorage.getItem("adminId");
    $scope.adminEmail = localStorage.getItem("adminEmail");
  
    // get  jobs
    var data = {
        table: "job",
        condition: " 1"
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


    //get  candidates
    var data2 = {
        table: "candidate",
        condition: "1"
    };
    $http.post(GetApiUrl("get"), data2)
    .success(function (response, status) {
        if (response.data !== undefined) {
        $scope.candidates = response.data;
        $scope.candidateCount = $scope.candidates.length;
    } else {
            $scope.candidateCount = 0;
}
    });

    //get  clients
    var data3 = {
        table: "company",
        condition: "1"
    };
    $http.post(GetApiUrl("get"), data3)
    .success(function (response, status) {
        if (response.data !== undefined) {
        $scope.clients = response.data;
        $scope.clientCount = $scope.clients.length;
    } else {
            $scope.clientCount = 0;
}
    });

    // get Courses
    var data4 = {
        table: "course",
        condition: "1"
    };
    $http.post(GetApiUrl("get"), data4)
    .success(function (response, status) {
        if (response.data !== undefined) {
            $scope.courses = response.length;
            $scope.coursesCount = $scope.courses.length;
        } else {
            $scope.coursesCount = 0;
        }
    });

    //get trainers
    var data5 = {
        table: "trainer",
        condition: "1"
    };
    $http.post(GetApiUrl("get"), data5)
    .success(function (response, status) {
        if (response.data !== undefined) {
        $scope.trainers = response.data;
        $scope.trainersCount = $scope.trainers.length;
        } else {
            $scope.trainersCount = 0;
        }
    });


});
app.controller('ourClintsController', function ($http, $scope, $window) {
    $scope.name = localStorage.getItem("adminName");
    //get  clients
    var data3 = {
        table: "company",
        condition: "1"
    };
    $http.post(GetApiUrl("get"), data3)
    .success(function (response, status) {
        if (response.data !== undefined) {
            $scope.clients = response.data;
            $scope.clientCount = $scope.clients.length;
        } else {
            $scope.clientCount = 0;
        }
    });

    // selected client
    $scope.GetSelected = function (client) {
        $scope.name = client.name;
        $scope.contactperson = client.contactperson;
        $scope.email = client.email;
        $scope.tel = client.tel;
        $scope.province = client.province;
        $scope.city = client.city;
        $scope.surbub = client.surbub;
        $scope.address = client.address;
        $scope.status = client.status;
        $scope.id = client.id;
    };

    // Update
    $scope.Update = function () {

        $scope.message = undefined;
        var name = $scope.name;
        var contactperson = $scope.contactperson;
        var tel = $scope.tel;
        var email = $scope.email;
        var province = $scope.province;
        var city = $scope.city;
        var surbub = $scope.surbub;
        var address = $scope.address;
        
       
         if (email === undefined) {
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
                id : $scope.id
             

            };

            $http.post(GetApiUrl("Company_Update"), data)
            .success(function (response, status) {
              //  alert(response);
                if (response === "1") {
                   
                    // seuccess
                    localStorage.setItem("succes", "Client details updated successfully");
                    localStorage.setItem("url", "#Our-Clients");
                    $window.location.href = "#succes";
                    //end success
                    

                } else {
                    $scope.message = response;
                }
            });
        }
    };

    // Remove
    $scope.Remove = function () {

        $scope.message = undefined;
        var id = $scope.id;
       

            var data = {
                id: id,
                table: "company"
            };

        $http.post(GetApiUrl("Remove"), data)
            .success(function (response, status) {
                if (response === "1") {
                    $scope.message = "Client info removed";

                    // seuccess
                    localStorage.setItem("succes", "Client removed successfully");
                    localStorage.setItem("url", "#Our-Clients");
                    $window.location.href = "#succes";
                    //end success

                } else {
                    $scope.message = response;
                }
            });
        
    };

});
app.controller('vacancesController', function ($http, $scope, $window) {
    $scope.name = localStorage.getItem("adminName");
    // get  jobs
    var data = {
        table: "job",
        condition: " 1"
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
    $scope.show = false;
   
    // selected client
    $scope.GetSelectedJob = function (job) {       
        $scope.catergorty = job.catergorty;
        $scope.description = job.description;
        $scope.expirience = job.expirience;
        $scope.comment = job.comment;
        $scope.positions = job.positions;
        $scope.location = job.location;
        $scope.componeyName = job.componeyName;
        $scope.status = job.status;
        $scope.id = job.id;       
        $scope.show = true;
    };

    $scope.JobInterview = function (job) {
        localStorage.setItem("catergorty", job.catergorty);
        localStorage.setItem("description", job.description);
        localStorage.setItem("expirience", job.expirience);
        localStorage.setItem("comment", job.comment);
        localStorage.setItem("positions", job.positions);
        localStorage.setItem("location", job.location);
        localStorage.setItem("componeyName", job.componeyName);
        localStorage.setItem("componeyName", job.componeyName);
        localStorage.setItem("status", job.status);
        localStorage.setItem("id", job.id);
        $scope.show = false;
        $window.location.href = "#linkToInterview"
    }

    // Update
    $scope.Update = function () {
        var catergorty = $scope.catergorty;
        var description = $scope.description;
        var expirience = $scope.expirience;
        var comment = $scope.comment;
        var positions = $scope.positions;
        var location = $scope.location;
        var componeyName = $scope.componeyName;
        var status = $scope.status;
        if (description === undefined) {
            $scope.message = "enter job description";
        }

        else {
            var data = {
                catergorty: catergorty,
                description: description,
                expirience: expirience,
                comment: comment,
                positions: positions,
                location: location,
                componeyName: componeyName,
                id: $scope.id,
                status: status

            };

            $http.post(GetApiUrl("Job_Update"), data)
            .success(function (response, status) {
                if (response === "1") {

                    // seuccess
                    localStorage.setItem("succes", "Job details updated successfully");
                    localStorage.setItem("url", "#Vacances");
                    $window.location.href = "#succes";
                    //end success


                } else {
                    $scope.message = response;
                }
            });
        }
    };

    // Remove
    $scope.Remove = function () {

        $scope.message = undefined;
        var id = $scope.id;


        var data = {
            id: id,
            table: "job"
        };

        $http.post(GetApiUrl("Remove"), data)
            .success(function (response, status) {
                if (response === "1") {

                    // seuccess
                    localStorage.setItem("succes", "Job removed successfully");
                    localStorage.setItem("url", "#Vacances");
                    $window.location.href = "#succes";
                    //end success

                } else {
                    $scope.message = response;
                }
            });

    };

});
app.controller('candidatesController', function ($http, $scope, $window) {
    $scope.name = localStorage.getItem("adminName");
    //get  candidates
    var data2 = {
        table: "candidate",
        condition: "1"
    };
    $http.post(GetApiUrl("get"), data2)
    .success(function (response, status) {
        if (response.data !== undefined) {
            $scope.candidates = response.data;
            $scope.candidateCount = $scope.candidates.length;
        } else {
            $scope.candidateCount = 0;
        }
    });

    // selected client
    $scope.GetSelectedJob = function (candidate) {
        $scope.name = candidate.name;
        $scope.surname = candidate.surname;
        $scope.email = candidate.email;
        $scope.cell = candidate.cell;
        $scope.identity = candidate.identity;
        $scope.title = candidate.title;
        $scope.jobCatergory = candidate.jobCatergory;
        $scope.jobTitle = candidate.jobTitle;
        $scope.jobDescription = candidate.jobDescription;
        $scope.expirience = candidate.expirience;
        $scope.cv = candidate.cv;
        $scope.city = candidate.city;
        $scope.id = candidate.id;
    };

    // Update
    $scope.Update = function () {
        
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
        var cv = $scope.cv;
        var city = $scope.city;

        if (email === undefined) {
            $scope.message = "email is invalid";
        }

        else {
            var data = {
                name               : $scope.name,
                surname            : $scope.surname,
                email              : $scope.email,
                cell               : $scope.cell,
                identity           : $scope.identity,
                title              : $scope.title,
                jobCatergory       : $scope.jobCatergory,
                jobTitle           : $scope.jobTitle,
                jobDescription     : $scope.jobDescription,
                expirience         : $scope.expirience,
                cv                 : $scope.cv,
                city 				: $scope.city,
                id: $scope.id
            };

            $http.post(GetApiUrl("Job_Update_All_DATA"), data)
            .success(function (response, status) {
                if (response === "1") {

                    // seuccess
                    localStorage.setItem("succes", "Candidate details updated successfully");
                    localStorage.setItem("url", "#Our-Candidates");
                    $window.location.href = "#succes";
                    //end success


                } else {
                    $scope.message = response;
                }
            });
        }
    };

    // Remove
    $scope.Remove = function () {

        $scope.message = undefined;
        var id = $scope.id;


        var data = {
            id: id,
            table: "job"
        };

        $http.post(GetApiUrl("Remove"), data)
            .success(function (response, status) {
                if (response === "1") {

                    // seuccess
                    localStorage.setItem("succes", "Job removed successfully");
                    localStorage.setItem("url", "#Vacances");
                    $window.location.href = "#succes";
                    //end success

                } else {
                    $scope.message = response;
                }
            });

    };


});