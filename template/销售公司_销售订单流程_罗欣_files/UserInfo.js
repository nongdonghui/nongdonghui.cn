//加载用户基本信息
function loadUserInfo() {
    var UserCode = $.getUrlParam("UserID");
    $.ajax({
        type: "POST",
        url: "/WebMobile/handler/UserInfoHandler.ashx",
        data: {
            fun: "LoadUserInfo", userCode: UserCode,
            proName: $.trim($("#txtProName").val())
        },
        async: false,
        success: function (data) {
            var arr = data.split("^");
            if (arr.length > 1) {
                $("#userInfoDiv").html(arr[0].toString());
                $("#appCode").val(arr[1].toString());
                $("#YW_CID").val(arr[2].toString());
                $("#appDate").val(arr[3].toString());
                $("#labTitle").text($("#txtProName").val());
            }
        }
    });
}

//审批流程获取用户信息
function getUserInfo(Rev_TableName) {
    $.ajax({
        type: "POST",
        url: "/WebMobile/handler/UserInfoHandler.ashx",
        data: { fun: "getUserInfo", Rev_CID: $("#YW_CID").val(), Rev_TableName: Rev_TableName },
        async: false,
        success: function (data) {
            var arr = data.split("^");
            if (arr.length > 1) {
                $("#userInfoDiv").html(arr[0].toString());
                $("#appCode").val(arr[1].toString());
                $("#YW_CID").val(arr[2].toString());
                $("#cilentTime").val(arr[3].toString());
                $("#labTitle").text($("#txtProName").val());
            }
        }
    });
}

function getSelectUser(dptName, objID) {//为下拉框选择加载部门所有人员
    $.post("/WebMobile/handler/UserInfoHandler.ashx", { fun: "getSelectUser", dptName: dptName },
        function (data) {
            $("#" + objID).find("option").remove();
            var arr = data.split("||");
            if (arr.length > 0) {
                for (var i = 0; i < arr.length; i++) {
                    var user = arr[i].split("^^");
                    $("#" + objID).append("<option value='" + $.trim(user[1]) + "'>" + $.trim(user[0]) + "</option>");  //添加一项option
                }
            }
            $("#" + objID + " option[value='']").remove();
        });
}

function getAllDpt(dptName, objID) {//为下拉框选择加载当前部门的平级部门和下级部门
    $.post("/WebMobile/handler/UserInfoHandler.ashx", { fun: "getAllDpt", dptName: dptName },
        function (data) {
            $("#" + objID).find("option").remove();
            var arr = data.split("^^");
            if (arr.length > 0) {
                for (var i = 0; i < arr.length; i++) {
                    $("#" + objID).append("<option value='" + $.trim(arr[i]) + "'>" + $.trim(arr[i]) + "</option>");  //添加一项option
                }
            }
            $("#" + objID + " option[value='']").remove();
        });
}

//显示申请人基本信息
function showUserInfo() {
    if ($("#divUserInfo").is(":hidden")) {
        $("#divUserInfo").show();
    }
    else {
        $("#divUserInfo").hide();
    }
}