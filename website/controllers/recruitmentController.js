app.controller('recruitmentController', function ($http, $scope, $window) {

});
app.controller('linkToInterviewtController', function ($http, $scope, $window) {
    
    $scope.name = localStorage.getItem("adminName");
    $scope.description = localStorage.getItem("description");
    $scope.positions = localStorage.getItem("positions");
    $scope.experience = localStorage.getItem("expirience");
    $scope.category = localStorage.getItem("catergorty");
    $scope.jobId = localStorage.getItem("id");

    $scope.filled = 0;

    var data2 = {
        table: "candidate",
        condition: $scope.description,
        experience: $scope.experience,
        category: $scope.category
    };
    //Gets Candidate based on Criteria in Data2
    $http.post(GetApiUrl("Interview_candidates"), data2)
    .success(function (response, status) {
        if (response.data !== undefined) {
            $scope.candidates = response.data;
            $scope.candidateCount = $scope.candidates.length;
        } else {
            $scope.candidateCount = 0;
        }
    });

    //Selected Candidate
    $scope.Assign = function (candidate) {
        $scope.id = candidate.id;
        var data = {
            candidateId: $scope.id,
            jobId: $scope.jobId         
        };

        $http.post(GetApiUrl("Interview_assign"), data)
          .success(function (response, status) {
              if (response === "1") {

                  // seuccess
                  localStorage.setItem("Success", "Candidate Assigned to interview successfully");
                  localStorage.setItem("url", "#linkToInterview");
                  $window.location.href = "#succes";
                  //end success


              } else {
                  $scope.message = response;
              }
          });
    }
    //Assigns Candidate to Position under Listing Table.


});
