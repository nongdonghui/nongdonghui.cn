/*
* 流程名称：销售公司_销售订单流程_罗欣
* 使用步骤：所有步骤申请人（统计）
* 用途：
* 编写者：梁章云
* 编写时间：2016年8月15日
* 版本：1.0
*/
//业务表名
var Rev_YWTableName = "yw_SalesOrderL";
//步骤名称
var isShenpi = "";
var type = "";


//页面加载事件
$(document).ready(function () {
    isShenpi = $.getUrlParam('sp');
    $.ajaxSetup({
        async: false
    });
    //明细页面url    
    if (isShenpi == "sq") {
        $("#txtProName").val("销售公司_销售订单流程_罗欣"); //流程名称
        getInvoice();//获取收货地址
        getAccount();//获取收款账号        
        type = "SQ";

    }
    else if (isShenpi == "sh") {
        getData();//获取资料信息
        //审批步骤需要编辑控件ID
        $("#SP_TDID").val("TD-DATA-E-BT^TD-SALE_TYPE-S-BT^TD-PROVINCE_CODE-S-BT^TD-PROVINCE_NAME-S-BT^TD-ORDER_CODE-S-BT");
        type = "SPE";
    }
    else {        
        type = "SP";
    }    

    dateFormat();
    //InitDateInput();//初始化日期控件        
    //加载流程信息
    load(Rev_YWTableName);
});

/*给电子表格变量赋值
 *公共变量：变量名^变量值
 *业务变量：BusinessVariables.变量名^变量值
 */
function InsertVal() {
    var list = ""; //moneyf^123@Rev_TableName^Rev_Apply
    if (isShenpi == "sq") {
        //list = "BusinessVariables.name^[USER:org=CustomOC,user=BPM/cuiliang~USER:org=CustomOC,user=BPM/zhangqichao]@BusinessVariables.value^测试多个变量";
        //list = "Rev_Step^" + $("#stepName").val() + "@Rev_UserCode^BPM/haoyang123@Rev_yz_UserCode^BPM/cuiliang~BPM/zhangqichao";
        //list = "Rev_Step^" + $("#stepName").val() + "@Rev_UserCode^BPM/wangchuntao@Rev_yz_UserCode^BPM/haoyang123";
        var type = $.trim($('input[name="THE_RANGE"]:checked').val());//获取选中所属范围
        list = "theRange^" + type + "@ApplyUser^USER:org=CustomOC,user=BPM/guanglidu";

        //var appCode = $("#appCode").val();
        //var userCode = $("#SGRZH-S-BT").val();//申购人账号
        //if (appCode == userCode) {
        //    list = "UserCode^USER:org=CustomOC,user=" + userCode + "@IsOne^1" + "@UserLCode^" + userCode;
        //}
        //else {
        //    list = "UserCode^USER:org=CustomOC,user=" + userCode + "@IsOne^2" + "@UserLCode^" + userCode;
        //}

        //var skipInfo = $("#hidSkip").val();
        //if (skipInfo != "") {
        //    var skTemp = skipInfo.split("|")
        //    list += "@dirCode^USER:org=CustomOC,user=" + skTemp[0] + "@Skip^" + skTemp[1] + "@isLeader^" + skTemp[2] + "@isDir^" + skTemp[3] + "@isSupLeader^" + skTemp[4];
        //}

    }
    return list;
}



//最后加载的 自定义方法
function loadOther() {

    if (isShenpi == "sq") {
        taskid = $("#txtTaskID").val();
        chek = taskid.slice(0, 1); //取TaskID首字母
        if (chek == "S" || chek == "s") {  //如果是发起环节 {
            $("#USER_NAME-S-BT").val($("#appuName").text());
            $("#USER_DPT-S-BT").val($("#appDeptName").text());
            $("#USER_CODE-S-BT").val($("#appCode").val());
            var myDate = new Date();
            var year = myDate.getFullYear();
            var month = myDate.getMonth() + 1;
            var date = myDate.getDate();
            var datetime = year + "-" + month + "-" + date;//拼接时间
            //$("#REMITTANCE_DATE-T-BT").val(datetime);
            //$("#ORDER_DATE-S-BT").val(datetime); 
            $("#SALES_DPT-S-BT").val("020202");//销售部门
            $("#TAX_RATE-S-BT").val("17.00");//税率
            getERPCode();
            //$("#SALESMAN_ERP-S-BT").val("guanglidu");//业务员ERP编码---暂时用
        }

        $("#NEXT_USER-S-BT").val("");//打开时清空已选择的人员
        $("#NEXT_CODE-S-BT").val("");//打开时清空已选择的人员
        $("#NEXT_USER-S-BT").attr("readOnly", true);
        $("#NEXT_CODE-S-BT").attr("readOnly", true);
        //选择下一步处理人
        $("#NEXT_USER-S-BT").click(function () {
            var dptName = "001_" + $("#USER_DPT-S-BT").val();
            var userCode = $("#NEXT_CODE-S-BT").val();            
            chooseUser(userCode, dptName, "1", "loadNextUser");                       
        });

        $("#USER_NAME-S-BT").attr("readOnly", true);//申请人姓名
        $("#USER_DPT-S-BT").attr("readOnly", true);
        //选择人员
        $("#USER_NAME-S-BT").click(function () {
            $(this).blur();
            var userCode = $("#USER_CODE-S-BT").val();
            chooseUser(userCode, "山东罗欣药业集团股份有限公司", "1", "loadChooseUser");
        });
        $("#ORDER_CODE-S-KT").attr("disabled", "disabled");//订单设置为不可用
        $("#BILL_TYPE-E-KT").change(function () {
            var type = $(this).val();//获取单据类型
            if (type == "选取未通过订单") {                
                //选择未通过的订单
                chooseFailedOrder();                
            }
            else {
                $("#ORDER_CODE-S-KT").attr("disabled", "disabled");//订单设置为不可用

            }
        });
        $("#CUSTOM_NAME-S-BT").attr("readOnly", true);
        $("#CUSTOM_CODE-S-BT").attr("readOnly", true);
        //选择客户
        $("#CUSTOM_NAME-S-BT").click(function () {
            chooseCustomer();
        });
        //选择省份
        $("#PROVINCE_CODE-S-BT").click(function () {
            chooseProvince();
        });

        $("#DELIVERY-S-BT").attr("readOnly", true);
        $("#DELIVERY_T-S-BT").attr("readOnly", true);
        //选择发运方式
        $("#DELIVERY_T-S-BT").click(function () {
            chooseDelivery();
        });

    }
    if (isShenpi == "sh") {        
        $("#checkInfoDiv").hide();
        $("#SALE_TYPE-S-BT").attr("readOnly", true);//销售类型只读
        $("#PROVINCE_CODE-S-BT").attr("readOnly", true);//省份只读
        $("#PROVINCE_NAME-S-BT").attr("readOnly", true);//省份名称只读
        $("#NORDER_CODE-S-BT").attr("readOnly", true);//新订单编号只读
        var num = $("#labDjbh").text();
        num = num.substr(5);//截取单据编号
        $("#NORDER_CODE-S-BT").val(num);//单据编号作为新订单号
        //选择省份
        $("#PROVINCE_NAME-S-BT").click(function () {
            chooseProvince();
        });
        //选择销售类型
        $("#SALE_TYPE-S-BT").click(function () {
            chooseSaleType();
        });
        //格式化汇款日期
        var REMITTANCE_DATE = $("#TD-REMITTANCE_DATE-T-ZD").html();
        $("#TD-REMITTANCE_DATE-T-ZD").html(new Date(REMITTANCE_DATE).Format("yyyy-MM-dd"))
    }
    var txtStatus = $("#txtStatus").val();
    if (txtStatus == "3") {
        $("#sfWrite").val("0");
        $("#divAddItem").hide();

        $("#dxbclr").hide();     //隐藏下步处理人
        $("#divZjTitle").hide();
    }

    LoadDetailList(type, $("#YW_CID").val(), $("#txtStatus").val());    
}


function loadChooseUser(data) {
    var userName = "";
    var ultCode = "";

    var arr = data.split("~");
    for (var i = 0; i < arr.length; i++) {
        var value = arr[i].toString();
        var arrLine = value.split("^");
        if (arrLine.length > 2) {
            userName += arrLine[0].toString() + ",";
            ultCode += arrLine[2].toString() + "^";
        }
    }
    if (ultCode.length > 0) {
        ultCode = ultCode.substr(0, ultCode.length - 1);
        $("#USER_CODE-S-BT").val(ultCode);
    }
    if (userName.length > 0) {
        userName = userName.substr(0, userName.length - 1);
        $("#USER_NAME-S-BT").val(userName);
    }
    getDpt(ultCode);

}

//下一步处理人选中
function loadNextUser(data) {
    var userName = "";
    var ultCode = "";

    var arr = data.split("~");
    for (var i = 0; i < arr.length; i++) {
        var value = arr[i].toString();
        var arrLine = value.split("^");
        if (arrLine.length > 2) {
            userName += arrLine[0].toString() + ",";
            ultCode += arrLine[2].toString() + "^";
        }
    }
    if (ultCode.length > 0) {
        ultCode = ultCode.substr(0, ultCode.length - 1);
        $("#NEXT_CODE-S-BT").val(ultCode);
    }
    if (userName.length > 0) {
        userName = userName.substr(0, userName.length - 1);
        $("#NEXT_USER-S-BT").val(userName);
    }
}

//提交后调用自定义方法
function sendOther() {
    //保存明细行信息
    sendDH();
    //拼接摘要
    //if (isShenpi == "sq") {
    //    var purName = $("#SGRXM-S-BT").val();
    //    $("#hidSummary").val("申购人：" + purName);
    //}
    //else {
    //    var purName = $("#TD-SGRXM-S-ZD").html();
    //    $("#hidSummary").val("申购人：" + purName);
    //}

    //发起步骤（固定）
    Rev_SendProcess();
}
//保存多行信息
function sendDH() {
    if (isShenpi == "sq" || isShenpi == "sh") {

        saveCustomData($("#YW_CID").val());
    }
}
//日期操作函数接口
function dateOption() {
    //日期范围限制
    //    dateCompare("KSSJ-T-KT", "%y-%M-{%d+1}", "JSSJ-T-KT", "2021-12-31");    
}

//自定义验证方法
function customValidation() {
    var result = true;
    if (isShenpi == "sq" || isShenpi == "cgy") {
        //调用验证明细行信息方法
        result = checkCustomData($("#YW_CID").val());
        if (result) {
            //判断附件是否和物料分类匹配
            //var wlbm = "MCD010,MCD011,MCD012,MCD013,MCD014,MCI003,MCI004,MCI005,MCI006,MCI007,MCI008,MCI009,MCI010";
            //result = window.frames["ifm"].checkAttach(wlbm);
        }
        //return result;

    }
    else {
        result = true;
    }


    return result;
}

//选择未通过订单
function chooseFailedOrder() {
    var userCode = $.trim($("#appCode").val());
    var url = "/WebMobile/FormSales/SalesOrderL/SalesOrderLPage/ChooseFailedOrder.aspx?userCode=" + userCode + "&IframeFun=loadOrderInfo&rnum=" + Math.random();
    openLayer(url);
}

//加载订单信息
function loadOrderInfo(data) {
    alert(data);
}

//获取收货地址信息
function getInvoice() {
    $.post("../SalesOrderLAshx/SalesOrderLAshx.ashx",
        {
            type: "getInvoice"
        },
        function (data) {
            if (data != "er" && data != "") {
                $("#TD-INVOICE_ISSUE-E-BT").attr("name", "");
                /*
                var opts = data.split('|');
                $("#SHDZ-E-KT").empty();

                for (var i = 0; i < opts.length; i++) {

                    $("#SHDZ-E-KT").append("<option value='" + opts[i] + "'>" + opts[i] + "</option>");

                }
                */
                var opts = $.parseJSON(data);
                var adds = "";
                $.each(opts, function (i, opt) {
                    adds += "|" + opt.cValue;
                });
                $("#TD-INVOICE_ISSUE-E-BT").attr("name", adds);
            }
            else {
                alert("未获取到发票开具信息！");
            }
        },
        'text');
}

//获取资料信息
function getData() {
    $.post("../SalesOrderLAshx/SalesOrderLAshx.ashx",
        {
            type: "getData"
        },
        function (data) {
            if (data != "er" && data != "") {
                $("#TD-DATA-E-BT").attr("name", "");
                /*
                var opts = data.split('|');
                $("#SHDZ-E-KT").empty();

                for (var i = 0; i < opts.length; i++) {

                    $("#SHDZ-E-KT").append("<option value='" + opts[i] + "'>" + opts[i] + "</option>");

                }
                */
                var opts = $.parseJSON(data);
                var adds = "";
                $.each(opts, function (i, opt) {
                    adds += "|" + opt.cValue;
                });
                $("#TD-DATA-E-BT").attr("name", adds);
            }
            else {
                alert("未获取到资料信息！");
            }
        },
        'text');
}

//获取收款账号信息
function getAccount() {
    $.post("../SalesOrderLAshx/SalesOrderLAshx.ashx",
        {
            type: "getAccount"
        },
        function (data) {            
            if (data != "er" && data != "") {
                $("#TD-COLL_ACCOUNT-E-BT").attr("name", "");
                var opts = $.parseJSON(data);
                var adds = "";
                $.each(opts, function (i, opt) {
                    adds += "|" + opt.Receivables;
                });
                $("#TD-COLL_ACCOUNT-E-BT").attr("name", adds);
            }
            else {
                alert("未获取到收款账号信息！");
            }
        },
        'text');
}

//获取ERP账号信息
function getERPCode() {
    $.post("../SalesOrderLAshx/SalesOrderLAshx.ashx",
        {
            type: "getERPCode",
            userCode: $("#USER_CODE-S-BT").val()
        },
        function (data) {
            if (data != "er" && data != "") {
                $("#SALESMAN_ERP-S-BT").val(data);
            }
            else {
                alert("获取ERP账号信息！");
            }
        },
        'text');
}

//根据账号获取部门
function getDpt(userCode) {
    $.post("/WebMobile/Form/PurchaseNeedApply/PurchaseNeedApplyAshx/PurchaseNeedApplyAshx.ashx",
        {
            type: "getDpt",
            userCode: userCode
        },
        function (data) {
            if (data != "er" && data != "") {
                $("#USER_DPT-S-BT").val(data);
                //getSkipInfo($("#SGRBM-S-BT").val(), userCode);
            }
            else {
                $("#USER_DPT-S-BT").val("");
                alert("未获取到部门信息！");
            }
        },
        'text');
}

//选择客户
function chooseCustomer() {    
    var url = "/WebMobile/FormSales/SalesOrderL/SalesOrderLPage/ChooseCustomer.aspx?IframeFun=setCustomer&rnum=" + Math.random();
    openLayer(url);
}

//加载选中客户信息
function setCustomer(data) {
    var arr = data.split("^");
    $("#CUSTOM_CODE-S-BT").val(arr[0].toString());//客户编号
    $("#CUSTOM_NAME-S-BT").val(arr[1].toString());//客户名称
    $("#ADDRESS-S-BT").val(arr[2].toString());//发货地址--隐藏域中
}

//选择省份
function chooseProvince() {    
    var url = "/WebMobile/FormSales/SalesOrderL/SalesOrderLPage/ChooseProvince.aspx?IframeFun=setProvince&rnum=" + Math.random();
    openLayer(url);
}

//加载选中省份信息
function setProvince(data) {
    var arr = data.split("^");
    $("#PROVINCE_CODE-S-BT").val(arr[0].toString());//省份编号
    $("#PROVINCE_NAME-S-BT").val(arr[1].toString());//省份名称
}

//选择销售类型
function chooseSaleType() {    
    var url = "/WebMobile/FormSales/SalesOrderL/SalesOrderLPage/ChooseSaleType.aspx?IframeFun=setSaleType&rnum=" + Math.random();
    openLayer(url);
}
//加载选中的销售类型
function setSaleType(data) {
    var arr = data.split("^");
    $("#SALE_TCODE-S-BT").val(arr[0].toString());//类型编码
    $("#SALE_TYPE-S-BT").val(arr[1].toString());//销售类型
}

//选择发运方式
function chooseDelivery() {    
    var url = "/WebMobile/FormSales/SalesOrderL/SalesOrderLPage/ChooseDelivery.aspx?IframeFun=setDelivery&accCode=1&rnum=" + Math.random();
    openLayer(url);
}

//加载选中的发运方式信息
function setDelivery(data) {    
    arr = data.split("^");
    $("#DELIVERY-S-BT").val(arr[0].toString());//发运方式编号
    $("#DELIVERY_T-S-BT").val(arr[1].toString());//发运方式名称
}

//根据账号获取跳过信息
function getSkipInfo(dptName, userCode) {
    if (userCode.indexOf("BPM/") == -1) {
        userCode = "BPM/" + userCode;
    }
    $.post("../PurchaseNeedApplyAshx/PurchaseNeedApplyAshx.ashx",
        {
            type: "getSkipInfo",
            dptName: dptName,
            userCode: userCode
        },
        function (data) {
            if (data != "er" && data != "") {

                $("#hidSkip").val(data);
                //alert($("#hidSkip").val());
            }
            else {
                //$("#SGRBM-S-BT").val("");
                alert("未获取到跳过信息！");
            }
        },
        'text');
}

function showApplyInfo() {
    if ($("#divApplyInfoEdit").is(":hidden")) {
        $("#divApplyInfoEdit").show();
    }
    else {
        $("#divApplyInfoEdit").hide();
    }
}


function dateFormat() {
    Date.prototype.Format = function (fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
}