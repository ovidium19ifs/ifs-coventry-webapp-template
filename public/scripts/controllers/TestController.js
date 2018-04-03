module.exports = function(application){
    application.controller("TestController",["dataBlock","$scope","fileService","$window",function(dataBlock,$scope,fileService,$window){
        $scope.results = {};
        $scope.urls = {};
        $('#fileSelect').on("click",function(e){
           $('#fileElem').click();
        });
        $scope.$watchCollection('files',function(newV,oldV){
            if (!newV) return;
            for (let f of newV){
                if (!$scope.urls.hasOwnProperty(f)){
                    $scope.urls[f] = $window.URL.createObjectURL(f);
                }
            }
        });
        $scope.$on("destroy",function(){
           console.log("destroying scope");
           for (let f of Object.keys($scope.urls)){
              console.log("Releasing " + f);
              $window.URL.revokeObjectURL($scope.urls[f]);
           };
        });
        document.getElementById('fileElem').addEventListener('change',function(){
            let f = this.files
            $scope.$apply(function(){
                $scope.files = f;
                console.log(f[0]);
            });
        },false);

        $scope.getFiles = function(){
            $scope.results = {
                images: fileService.get('images'),
                pdfs: fileService.get('pdfs')
            };
        }
        function constructBody(){
            return new Promise(function(resolve,reject){
                let requestBody = {};
                let nrOfFiles = $scope.files.length;
                let iter = 0;
                for (let f of $scope.files){
                    let r = new FileReader();
                    r.onload = function(e){
                        iter++;
                        requestBody[f.name]={};
                        requestBody[f.name].type = f.type;
                        requestBody[f.name].content = e.target.result;
                        if (iter==nrOfFiles) resolve(requestBody);
                    }
                    r.readAsBinaryString(f);
                }
            });
        }
        $scope.sendFiles = function(){
           let res = constructBody().then(function(resp){
               console.log(resp);
               fileService.post(resp).$promise.then(function(resp){
                   console.log("Succeded");
               },function(err){
                   console.log("error: "+err);
               });
           })


        }

    }]);
};