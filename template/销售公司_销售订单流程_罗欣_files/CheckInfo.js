
$(document).ready(function () {
    loadCheckInfo(""); //调用该方法时需要指定是否是增加，增加为add，其他任意填写
});

//加载审批意见区域
function loadCheckInfo(type) {
    var userCode = $.getUrlParam("UserID");
    $.ajax({
        type: "POST",
        url: "/WebMobile/handler/CheckInfoHandler.ashx",
        data: { fun: "LoadCheckInfo", type: type, userCode: userCode },
        async: false,
        success: function (data) {
            var arr = data.split("^");
            if (arr.length > 1) {
                $("#checkInfoDiv").html(arr[0].toString());
                $("#txtUserCode").val(arr[1].toString());
                $("#appName").val(arr[2].toString());
                $("#appDate").val(arr[3].toString());
            }
            //审批意见长度限制为5000字符 yiyk 2015-11-4
            $("#txtArSpyj").blur(function () {
                checkLength(this, "5000");
            });
            //设置申请结果是同意时的审批意见默认值 yiyk  2015-11-4
            $("input[name='raspjg']").change(function () {
                var REV_RESULT = $("input[name='raspjg']:checked").val();
                if (REV_RESULT == "同意") {
                    //$("#txtArSpyj").val("同意");
                    $("#trSpth").hide();
                } else {
                    //$("#txtArSpyj").val("");
                    //$("#trSpth").show();
                }
            });
        }
    });
}
//加载退回至的步骤
function getSelectSteps() {
    var type = "";
    var txtProName = $("#txtProName").val(); //流程名

    var txtProInc = $("#txtProInc").val(); //实例号
    var stepName = $("#stepName").val(); //步骤名
   
    $.ajax({
        type: "POST",
        url: "/WebMobile/handler/CheckInfoHandler.ashx",
        data: { fun: "getSelectSteps", type: type, txtProName: txtProName, txtProInc: txtProInc, stepName: stepName },
        async: false,
        success: function (data) {
            $("#getSelectSteps").html(data);
        }
    });
}