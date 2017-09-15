app.controller('candidateController', function ($http, $scope, $window) {
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
                  alert(doc);
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
app.controller('candidate1Controller', function ($http, $scope, $window) {
    
});