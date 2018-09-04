$(document).ready(function() {

    $("#changePwd").click(function() {
        
        var token = localStorage.getItem('token')
        
        var oldPwd = $("#oldPassword").val();
        if (oldPwd.length <= 0) {
            alert("Please type your current password");
            return;
        }

        var newPwd = $("#newPassword").val();
        var confirmPwd = $("#confirmPassword").val();
        if (newPwd.length <= 0 || confirmPwd.length <=0 || newPwd != confirmPwd) {
            alert("confirm password is matched on new password");
            return;
        }
        debugger
        $.ajax({
            url: '/api/v1/users/change-password',
            type: 'put',
            headers: {
                'Authorization': token
            },
            data: {
                newPassword: newPwd,
                currentPassword: oldPwd
            },
            dataType: 'json',
            success: function(response) {
                if (!response.success) {
                    alert(response.error);                    
                }
            }
        })
    });

    $("#getToken").click(function() {
        var token = token = $("#token").val();

        //localStorage.setItem('token', token);
        
        $.ajax({
            url: '/users/token',
            type: 'get',
            dataType: 'json',
            success: function(response) {
                localStorage.setItem('token', response.token);
                $("#appToken").html(response.token);
            }
        })
    });
})
