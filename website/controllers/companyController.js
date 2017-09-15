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


