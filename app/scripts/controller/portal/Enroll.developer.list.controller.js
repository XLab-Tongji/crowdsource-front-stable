
'use strict';

app.controller('EnrollDevlistController', ['$scope', '$state', '$rootScope', 'AlertTool', 'ToasterTool',
    'ProjectFactory', 'SessionFactory', 'SessionService', 'EnrollService', function ($scope, $state, $rootScope, AlertTool, ToasterTool,
        ProjectFactory, SessionFactory, SessionService, EnrollService) {

        init();

        function init() {

            getenrolllist();
            $scope.cancelenroll = cancelenroll;
            

        }

        function getenrolllist() {

            ProjectFactory.getenrolldetail().get({

                "username":SessionService.getCurrentUser()

            }).$promise.then(function (data) {
                if (data.result != null) {
                    var result = data.result;
                    $scope.result = result;

                } else {
                    ToasterTool.error('获取失败', '请重试');
                }
            })
        }

        function cancelenroll(id) {
            console.log(id)
            ProjectFactory.cancelenroll().delete({
                "dev_username": SessionService.getCurrentUser(),
                "enroll_project_id": id
            }).$promise.then(function (data) {
                if (data.status == 200) {
                    ToasterTool.success("取消报名成功");
                } else if (data.status == 500) {
                    ToasterTool.error("报名取消失败");
                }
            })
        }


    }]);
