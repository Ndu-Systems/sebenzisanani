﻿app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
         .when('/', {
             templateUrl: 'pages/Home/index.html',
             controller: 'homeController'
         }).when('/login', {
             templateUrl: 'pages/account/login.html',
             controller: 'loginController'
         }).when('/candidateLogin', {
             templateUrl: 'pages/account/candidateLogin.html',
             controller: 'candidateLoginController'
         })
         .when('/logout', {
             templateUrl: 'pages/account/logout.html',
             controller: 'logoutController'
         })
            .when('/register', {
                templateUrl: 'pages/account/register.html',
                controller: 'registerController'
            })
            .when('/companyRegister', {
                templateUrl: 'pages/account/companyRegister.html',
                controller: 'companyRegisterController'
            })
            .when('/candidateLanding', {
                templateUrl: 'pages/recruitment/candidateLanding.html',
                controller: 'recruitmentController'
            })
            .when('/companyLanding', {
                  templateUrl: 'pages/recruitment/companyLanding.html',
                  controller: 'recruitmentController'
              })
            .when('/training', {
                templateUrl: 'pages/training/training.html',
                controller: 'trainingController'
            })
            .when('/candidate', {
                templateUrl: 'pages/candidate/candidate.html',
                controller: 'candidate1Controller'
            })
            .when('/updateCandidate', {
                templateUrl: 'pages/candidate/updateCandidate.html',
                controller: 'updateCandidateController'
            })
            .when('/updateCV', {
                templateUrl: 'pages/candidate/updateCV.html',
                controller: 'updateCVController'
            })
            .when('/company', {
                templateUrl: 'pages/company/company.html',
                controller: 'companyController'
            })
         .when('/my-dashboard', {
             templateUrl: 'pages/company/company.html',
             controller: 'companyController'
         })
            .when('/post-job', {
                templateUrl: 'pages/company/postjob.html',
                controller: 'postjobController'
            })
         .when('/succes', {
             templateUrl: 'pages/succes.html',
             controller: 'succuessController'
         })
            .when('/courses', {
                templateUrl: 'pages/courses/courses.html',
                controller: 'coursesController'
            })
      .when('/about', {
          templateUrl: 'pages/Home/about.html',
          controller: 'aboutController'
      })
         .when('/this-job', {
             templateUrl: 'pages/company/openjob.html',
             controller: 'openjobController'
         })
          .when('/user-login', {
              templateUrl: 'pages/admin/login.html',
              controller: 'adminLoginController'
          })
           .when('/admin-dashboard', {
               templateUrl: 'pages/admin/dash.html',
               controller: 'adminController'
           })
      .when('/contact', {
          templateUrl: 'pages/Home/contact.html',
          controller: 'contactController'
      })
     .when('/Our-Clients', {
         templateUrl: 'pages/admin/clients.html',
         controller: 'ourClintsController'
     })
    .when('/Vacances', {
        templateUrl: 'pages/admin/vacances.html',
        controller: 'vacancesController'
    })
     .when('/Our-Candidates', {
         templateUrl: 'pages/admin/candidates.html',
         controller: 'candidatesController'
     })
     .when('/Register-With-Us', {
         templateUrl: 'pages/account/registerCandidate.html',
         controller: 'registerCandidateController'
     })
     .when('/Candidate-Dashboard', {
         templateUrl: 'pages/candidate/dash.html',
         controller: 'candidateController'
     })
});
