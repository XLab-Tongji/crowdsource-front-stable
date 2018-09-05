'use strict';

app.controller('RegisterController', ['$scope', '$state', '$rootScope', 'AlertTool', 'ToasterTool',
    'SessionFactory', function ($scope, $state, $rootScope, AlertTool, ToasterTool, SessionFactory) {

        init();

        function init() {
            $scope.register = register;
            $scope.adddevloper = adddevloper;
        }

        function register() {
            var name = $scope.registerName;
            var username = $scope.registerUserName;
            var password = $scope.registerPassword;
            var email = $scope.registerEmail;
            var mobile = $scope.registerPhone;
            var ext_params = {};

            SessionFactory.register().post({
                'name': name,
                'username': username,
                'password': password,
                'email': email,
                'mobile': mobile,
                'ext_params': ext_params

            }).$promise
                .then(function (data) {
                    if (data.result == 1) {
                        ToasterTool.success('注册成功', '欢迎使用众包平台!');
                        $state.go('auth');
                    } else {
                        ToasterTool.error('错误', data.message);
                    }
                });

        }

        function.adddevloper(){
            var data = {};
            data.dev_domain=$scope.dev_domain;
            data.dev_intro=$scope.dev_intro;
            data.dev_project=$scope.dev_project;
            
            data.username=SessionService.getCurrentUser();

            SessionFactory.beDeveloper().post({
                
                    'username':data.username,
                    'dev_domain':data.dev_domain,
                    'dev_intro':data.dev_intro,
                    'dev_project':data.dev_project
            }).$promise.then(function (data) {
                    console.log(data);
                    if (data.status == 200) {
                        ToasterTool.success('成为开发者！');
                    } else{//} if (data.status == 500) {
                        ToasterTool.error('创建失败');
                    }
            })

        }

    }]);
