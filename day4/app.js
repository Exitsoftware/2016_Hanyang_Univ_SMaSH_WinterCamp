var app = angular.module("Bookmark", ['firebase']);  
        app.controller("Ctrl", function ($scope, $firebaseArray) {
            $scope.url;  
            $scope.urlArr=[];
            
            var firebaseURL = "https://smashbook.firebaseio.com/";

            $scope.getList = function() {
                var echoRef = new Firebase(firebaseURL);
//                var query = echoRef.orderByChild("url");
                var query = echoRef.child('users').child($scope.$authData.uid).orderByChild('url');
                $scope.urlArr = $firebaseArray(query);
            };
//
            $scope.add = function() {
                var temp_title = $scope.url.split('/').slice(2);
                temp_title = temp_title[0].split('.');
                var real_title;
                if(temp_title[0] === 'www'){
                    real_title = temp_title[1];
                }else{
                    real_title = temp_title[0];
                }
                $scope.urlArr.$add({
                    url: $scope.url,
                    title: real_title,
                    favicon: "http://grabicon.com/icon?domain=" + $scope.url + "&size=50"
                });   
            };
            
            
            //LISTEN FOR RETURN KEY
            $scope.enter = function(e){
                if (e.keyCode === 13) {
                    $scope.add();
                }    
            }
            
            $scope.remove = function(url) {
              $scope.urlArr.$remove(url);
            };


            $scope.FBLogin = function () {
              var ref = new Firebase(firebaseURL);
              ref.authWithOAuthPopup("facebook", function(error, authData) {
              if (error) {
                console.log("Login Failed!", error);
              } else {
                $scope.$apply(function() {
                $scope.$authData = authData;
              });
              console.log("Authenticated successfully with payload:", authData);
              $scope.name = $scope.$authData['facebook']['displayName'];
              $scope.profileIMG = $scope.$authData['facebook']['profileImageURL']
                $scope.getList();
              // do something with the login info
            }
          });
        };

            
        $scope.FBLogout = function() {
          var ref = new Firebase(firebaseURL);
          ref.unauth();
          delete $scope.$authData;
          location.reload();
        };
            
        $scope.goUrl = function(u){
            window.location.href = u.url;
        }
            

    });