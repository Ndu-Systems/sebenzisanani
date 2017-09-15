app.controller('candidateController', function ($http, $scope, $window) {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        $window.location.href = "#candidateLogin";
    }
    $scope.email = localStorage.getItem("email");
   
    var data = {
        email: localStorage.getItem("email")
    };

    $http.post(GetApiUrl("Candidate_Get"), data).success(function (data, status) {
        $scope.candidate = data.candidate[0];       
        var obj = $scope.candidate;      
        $scope.name = obj.name;
        $scope.surname = obj.surname;
        $scope.cell = obj.cell;
        localStorage.setItem("surname", obj.surname);
        localStorage.setItem("cell", obj.cell);
        localStorage.setItem("title", obj.title);
        localStorage.setItem("jobCatergory", obj.jobCatergory);
        localStorage.setItem("jobTitle", obj.jobTitle);
        localStorage.setItem("jobDescription", obj.jobDescription);
        localStorage.setItem("expirience", obj.expirience);
        localStorage.setItem("cv", obj.cv);
        localStorage.setItem("city", obj.city);
        localStorage.setItem("password", obj.password);
    })

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