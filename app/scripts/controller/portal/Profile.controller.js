'use strict';

app.controller('ProfileController', ['$scope', '$state', '$rootScope', 'AlertTool', 'ToasterTool',
    'SessionFactory', 'SessionService', function ($scope, $state, $rootScope, AlertTool, ToasterTool, SessionFactory, SessionService) {

        init();

        function init() {
            $scope.showSubmit = true;
            checkIfDevloper();
            $scope.adddeveloper = adddeveloper;
        }

        function checkIfDevloper(){
            var username=SessionService.getCurrentUser();
            console.log(username);
            SessionFactory.devByName().get({

                'name': username

            }).$promise.then(function (data) {
                if (data.result != null) {
                    console.log(data)
                    $scope.dev_domain = data.result.dev_domain;
                    $scope.dev_intro = data.result.dev_intro;
                    $scope.dev_project = data.result.ext_param;
                    $scope.showSubmit = false;
                } 

            })
        }

        function adddeveloper(){
            var form = {};
            form.dev_domain=$scope.dev_domain;
            form.dev_intro=$scope.dev_intro;
            form.ext_param=$scope.dev_project;
            
            form.username=SessionService.getCurrentUser();

            SessionFactory.userIdByName().get({

                'name': form.username

            }).$promise.then(function (data) {
                if (data.result != null) {
                    var account_id = data.result;
                    form.account_id = account_id;
                    SessionFactory.beDeveloper().post({
                
                            'username':form.username,
                            'dev_domain':form.dev_domain,
                            'dev_intro':form.dev_intro,
                            'ext_param':form.ext_param,
                            'account_id':form.account_id
                    }).$promise.then(function (data) {
                            if (data.status == 200) {
                                ToasterTool.success('成为开发者！');
                                checkIfDevloper();
                            } else{
                                ToasterTool.error('创建失败');
                            }
                    })

                } else {
                    ToasterTool.error('获取失败', '请重试');
                }
            })

            

        }

    }]);
