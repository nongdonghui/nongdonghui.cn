//页面最大化
setTimeout('top.moveTo(0,0)', 1);
setTimeout('top.resizeTo(screen.availWidth,screen.availHeight)', 1);
var loadingIndex = null;
var proName = "";
var taskid = "";
var strip = "";
var chek = "";
var Rev_varList = "";
var Rev_KeyName = "PubSqlYWConString";
var Rev_YWTableName = "";
//审批步骤是否可编辑 参数
var SP_TDID = "";
var errorInfo = ""; //错误信息
//保存按钮状态标示
var isSave = false;
//是否从草稿箱打开
var isOpenDrafts = false;
function load(TableName) {
    Rev_YWTableName = TableName;    
    proName = $("#txtProName").val();    
    $("#txtTaskID").val($.getUrlParam("TaskID"));
    var txtTaskID = $("#txtTaskID").val();
    taskid = $("#txtTaskID").val();    
    chek = taskid.slice(0, 1); //取TaskID首字母
    if (chek == "S" || chek == "s") {  //如果是发起环节
        loadUserInfo();
        ControlValLoad();
        $("#checkInfoDiv").hide();
    } else {
        $("#btnSave").hide();
        Rev_GetProInfo();
    }
    //取消按钮 btnClose 关闭窗口，避免浏览器提示
    $("#btnClose").click(function () {
        uexWindow.evaluateScript("biaodan", 0, "closedetail();");
    });
    //提交按钮 同意按钮 btnSend
    $("#btnSend").click(function () {
        var type = "1";
        if (chek == "S" || chek == "s") {
            type = "1";
        }
        else {
            type = "4";
        }        
        var t = txtCheck();

        if (t) {
            t = customValidation();//自定义验证方法(如果需要请在各自的js中书写这个方法后，再放开屏蔽)
            if (t) {
                loadingIndex = layer.load(0, { shade: [0.5, '#fff'], shadeClose: true });
                ControlSave(type);
            }
        }
    });

    //退回按钮
    $("#btnReturn").click(function () {
        var type = "1";
        if (chek == "S" || chek == "s") {
            type = "1";
        }
        else {
            type = "4";
        }

        $("#rbtnNo").attr("checked", "checked");        

        var t = txtCheck();

        if (t) {
            t = customValidation();//自定义验证方法(如果需要请在各自的js中书写这个方法后，再放开屏蔽)
            if (t) {
                loadingIndex = layer.load(0, { shade: [0.5, '#fff'], shadeClose: true });
                ControlSave(type);
            }
        }
    });

    //保存按钮
    $("#btnSave").click(function () {
        isSave = true;

        var type = "1";
        if (chek == "S" || chek == "s") {
            type = "1";
        }
        else {
            type = "4";
        }

        //var t = txtCheck();//保存业务数据时，如果需要验证，请放开屏蔽；
        var t = true;

        if (t) {
            //t = customValidation();//自定义验证方法(如果需要请在各自的js中书写这个方法后，再放开屏蔽)
            if (t) {
                ControlSave(type);
            }
        }
    });    

    //调用各自流程js的方法
    loadOther();
    getSelectSteps();
    //判断是否是从草稿箱打开
    var ywCid = $.cookie('rev_CID');
    if (ywCid != undefined && ywCid.length > 0) {
        if ($("#YW_CID").val().length > 0) {
            $("#YW_CID").val(ywCid);
            //清除‘rev_CID’的Cookie
            delRev_CidCookie();
            $("#txtStatus").val("1");
            loadSql();
            isOpenDrafts = true;
        }
    }
}

//清除Rev_Cid的Cookie
function delRev_CidCookie() {
    $.ajax({
        type: "POST",
        url: "/WebMobile/Rev_Drafts/Handler/Rev_DraftsHandler.ashx",
        data: { type: "DelCookie" },
        async: false,
        success: function (data) {
        }
    });
}

/***************拼接数据库查询字段**************************/
function loadSql() {
    var str = "";

    //bootStrap中div解析
    $(".divOther").each(function () {
        //获取需要拼接控件的div的id
        var this_id = $(this).attr("id");
        //id不能为空
        if (this_id != undefined) {
            var tdid = this_id;
            controlID = tdid.substring(3);
            if (tdid.split("_")[1] != "title") {
                str += controlID.split("-")[0] + "^"
            }
        }
    });
    if (str.length > 0) {
        str = str.substr(0, str.length - 1);

        //根据TD中的ID获取到数据库字段名称，然后查询数据库
        $.ajax({
            type: "POST",
            url: "/WebMobile/handler/Rev_flowHandler.ashx",
            data: { type: "2", str: str, YW_CID: $("#YW_CID").val(), Rev_YWTableName: Rev_YWTableName },
            async: false,
            success: function (data) {
                var arr = data.split("|");

                if (arr[0] != "error") {
                    //查询单据编号
                    for (var no = 0; no < arr.length; no++) {
                        var NoName = arr[no].split("^")[0];
                        if (NoName == "YWNumber") {
                            $("#labDjbh").text("单据编号：" + arr[no].split("^")[1]);
                        }
                    }

                    var num = 0;

                    //赋值
                    //bootStrap中div解析
                    $(".divOther").each(function () {
                        //获取需要拼接控件的div的id
                        var this_id = $(this).attr("id");
                        //id不能为空
                        if (this_id != undefined) {
                            var tdid = this_id;

                            controlID = tdid.substring(3);
                            for (var n = 0; n < arr.length; n++) {
                                var name = arr[n].split("^")[0];
                                var val = arr[n].split("^")[1];
                                var sID = controlID.split("-")[0];
                                var dID = name;
                                sID = sID.toUpperCase();
                                if (sID == dID) {
                                    if ($.trim($("#" + tdid + "").html()).length == 0) {
                                        var type = controlID.split("-")[1].toString();
                                        if (type == "A") {
                                            val = val.replace(/\\r/g, "");
                                            val = val.replace(/\\n/g, "<br>");
                                        }
                                        if (type == "M") {
                                            $("#" + tdid + "").css("text-align", "right");
                                        }
                                        $("#" + tdid + "").html(val);
                                    } else {
                                        var type = controlID.split("-")[1].toString();
                                        if (type == "R") {
                                            //单选赋值
                                            var radio = document.getElementsByName(tdid.split("-")[1]);
                                            var value = "";
                                            for (var i = 0; i < radio.length; i++) {
                                                value = (radio[i].value).replace(/\s+/g, "");
                                                if (value == val) {
                                                    radio[i].checked = true;
                                                    break;
                                                }
                                            }
                                        }
                                        else if (type == "C") {
                                            //复选框赋值
                                            var checkbox = document.getElementsByName(tdid.split("-")[1]);
                                            var pageValue = ""; //页面值
                                            var sqlValue = val.split(','); //数据库值
                                            for (var i = 0; i < checkbox.length; i++) {
                                                pageValue = checkbox[i].value;
                                                for (var j = 0; j < sqlValue.length; j++) {
                                                    if (pageValue == sqlValue[j]) {
                                                        checkbox[i].checked = true;
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            if (val != "" && val != null) {
                                                if (type == "A" && val.indexOf("\\n") > -1) {
                                                    val = val.replace(/\\r/g, "~").replace(/\~/g, "");
                                                    val = val.replace(/\\n/g, "~").replace(/\~/g, "^");
                                                    var a = val.split("^");
                                                    var str = "";
                                                    for (var m = 0; m < a.length; m++) {
                                                        str += a[m] + "\r\n";
                                                    }
                                                    $("#" + controlID + "").val(str);
                                                }
                                                else {
                                                    $("#" + controlID + "").val(val);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });
                } else {
                    errorInfo = $("#errorInfo").val() + "\nloadSql():" + arr[1]; //一般处理程序返回的错误信息
                    $("#errorInfo").val(errorInfo);
                }
                if ($("#txtStatus").val() != "1") {
                    $("#checkInfoDiv").hide();
                    $("#divSendFooter").hide();
                    $("#divCloseFooter").show();
                    $("input:text").attr("disabled", "disabled");
                    $("input[type='number']").attr("disabled", "disabled");
                    $("input[type='tel']").attr("disabled", "disabled");
                    $("input:radio").attr("disabled", "disabled");
                    $("input:checkbox").attr("disabled", "disabled");
                    $("textarea").attr("disabled", "disabled");
                    $("select").attr("disabled", "disabled");
                }
            }
        });
    } else {
        if ($("#txtStatus").val() != "1") {
            $("#checkInfoDiv").hide();
            $("#divSendFooter").hide();
            $("#divCloseFooter").show();
        }
    }
}

/****************************************************加载各个控件公共方法*********************************************************/
function ControlLoad() {
    SP_TDID = $("#SP_TDID").val(); //审批中控件类型

    //bootStrap中div解析
    $(".divOther").each(function () {
        //获取需要拼接控件的div的id
        var this_id = $(this).attr("id");
        //id不能为空
        if (this_id != undefined) {
            var tdid = this_id;
            tdtype = tdid.split("-")[2]; //空间类型
            isBT = tdid.split("-")[3]; //是否必填
            controlID = tdid.substring(3);
            if (isBT == "BT" || isBT == "KT") {
                var pholder = $("div[id='" + tdid + "']").attr("pholder");
                if (pholder == undefined) {
                    pholder = "";
                }
                if (tdtype == "S") {
                    $("#" + tdid + "").append("<input type=\"text\" id=\"" + controlID + "\" style='width:90%' class=\"txtinput\" placeholder='" + pholder + "'/>");
                }
                else if (tdtype == "T") {
                    $("#" + tdid + "").append("<input type=\"text\" id=\"" + controlID + "\" style='width:90%' class=\"txtinput\" readonly=\"readonly\" placeholder='" + pholder + "'/>");
                }
                else if (tdtype == "N") {
                    $("#" + tdid + "").append("<input type=\"text\" id=\"" + controlID + "\" style='width:90%;' class=\"txtinput\" placeholder='" + pholder + "'/>");
                }
                else if (tdtype == "M") {
                    $("#" + tdid + "").append("<input type=\"text\" id=\"" + controlID + "\" style='width:90%;' class=\"txtinput\" placeholder='" + pholder + "'/>");
                }
                else if (tdtype == "P") {
                    //电话
                    $("#" + tdid + "").append("<input type=\"tel\" id=\"" + controlID + "\" style='width:90%;' class=\"txtinput\" placeholder='" + pholder + "'/>");
                }
                else if (tdtype == "L") {
                    $("#" + tdid + "").append("<input type=\"text\" id=\"" + controlID + "\" style='width:90%' class=\"txtinput\" placeholder='" + pholder + "'/>");
                }
                else if (tdtype == "A") {
                    $("#" + tdid + "").append("<textarea style='width:90%;height:50px' id=\"" + controlID + "\"  class=\"textarea\"   placeholder='" + pholder + "'/>");
                } else if (tdtype == "E") {//下拉框
                    var group = $("div[id='" + tdid + "']").attr("name"); //document.getElementById(tdid).name; //获取td中 name 的值
                    var map = group.split('|'); //北京^BJ
                    var str = "";
                    for (var i = 0; i < map.length; i++) {
                        str = str + "<option value='" + map[i] + "'>" + map[i] + "</option>";
                    }
                    $("#" + tdid + "").append("<select  id=\"" + controlID + "\" class='select'  style='width:90%;min-width:65px;'>" + str + "</select");
                } else if (tdtype == "R") {//单选按钮
                    var width = $("div[id='" + tdid + "']").attr("width");
                    var group = $("div[id='" + tdid + "']").attr("name"); // document.getElementById(tdid).name; //获取td中 name 的值
                    var map = group.split('|'); //
                    var R_name = tdid.split("-")[1];
                    var str = "";
                    if (width == "" || width == undefined) {
                        width = "50%";
                    }
                    for (var i = 0; i < map.length; i++) {
                        if (i == 0) {
                            str = str + "<span class='inputSpan' style='width:" + width + ";text-align:left;'>";
                            str = str + "<input type='radio' checked id='" + controlID + "' name='" + R_name + "' value='" + map[i] + "'><label style='vertical-align:center;'>&nbsp;" + map[i] + "&nbsp;&nbsp;</label>";
                            str = str + "</span>";
                        } else {
                            str = str + "<span class='inputSpan' style='width:" + width + ";text-align:left;'>";
                            str = str + "<input type='radio' id='" + controlID + "'name='" + R_name + "' value='" + map[i] + "'><label style='vertical-align:center;'>&nbsp;" + map[i] + "&nbsp;&nbsp;</label>";
                            str = str + "</span>";
                        }
                    }
                    $("#" + tdid + "").append(str);
                } else if (tdtype == "C") {//复选框
                    var width = $("div[id='" + tdid + "']").attr("width");
                    var group = $("div[id='" + tdid + "']").attr("name"); // document.getElementById(tdid).name; //获取td中 name 的值
                    var map = group.split('|');
                    var C_name = tdid.split("-")[1];
                    var str = "";
                    if (width == "" || width == undefined) {
                        width = "50%";
                    }
                    for (var i = 0; i < map.length; i++) {
                        str = str + "<span class='inputSpan' style='width:" + width + ";text-align:left;'>";
                        str = str + "<input type='checkbox' id='" + controlID + "'name='" + C_name + "' value='" + map[i] + "'>&nbsp;" + map[i] + "&nbsp;&nbsp;";
                        str = str + "</span>";
                    }
                    $("#" + tdid + "").append(str);
                } else if (tdtype == "D") {//弹出框
                    $("#" + tdid + "").append("<input type=\"text\" id=\"" + controlID + "\" style='width:" + width + "' class=\"txtinput\" onclick=\"" + tdid.replace(/-/g, '_') + "_Dialog()\"/>");
                }
                if (isBT == "BT") {
                    $("#" + controlID + "").after("<span class=\"Required\" style=\"color:Red\">*</span>");
                }
            }
        }
    });   
    txtCheckLoad();
    setScroll();
}

//js验证必填以及格式验证
function txtCheckLoad() {

    $("textarea").each(function (i, val) {
        var id = val.id;
        if (id.split('-').length == 3) {
            var str = $("#" + id + "").val();
            /*********************
            必填提示后，恢复字体颜色
            **********************/
            $("#" + id + "").bind("focus", function () {
                $("#" + id + "").css("color", "black").trigger("select");
            });
        }
    });

    $("input:text,input[type='number'],input[type='tel']").each(function (i, val) {
        var id = val.id;
        if (id.split('-').length == 3 || id.split('-').length == 4) {
            var str = $("#" + id + "").val();
            /*********************
            必填提示后，恢复字体颜色
            **********************/
            $("#" + id + "").bind("focus", function () {
                var input = $("#" + id + "").val();
                $("#" + id + "").css("color", "black").trigger("select");
                if (id.toUpperCase().indexOf("BT") != -1 && (input == "" || input == "此项必填！")) {
                    $("#" + id + "").val("");
                }
            });
            /********************
            必填验证
            *********************/
            if (id.toUpperCase().indexOf("BT") != -1 && (str == "" || str == "此项必填！")) {
                $("#" + id + "").val("");
            }
            /********************
            长度验证--短字符
            *********************/
            if (id.split('-')[1].toUpperCase() == "S") {
                $("#" + id + "").bind("blur", function () {
                    var len = $("#TD-" + id).attr("name"); //document.getElementById(tdid).name; //获取td中 name 的值
                    if (len != "" && len != undefined) {
                        checkLength(val, len);
                    } else {
                        checkLength(val, "100");
                    }
                });
            }
            /********************
            长度验证--长字符
            *********************/
            if (id.split('-')[1].toUpperCase() == "L") {
                if (id == "SQZT-L-KT") {
                    $("#" + id + "").bind("blur", function () {
                        var len = $("#TD-" + id).attr("name"); //document.getElementById(tdid).name; //获取td中 name 的值
                        if (len != "" && len != undefined) {
                            checkLength(val, len);
                        } else {
                            checkLength(val, "300");
                        }
                    });
                } else {
                    $("#" + id + "").bind("blur", function () {
                        var len = $("#TD-" + id).attr("name"); //document.getElementById(tdid).name; //获取td中 name 的值
                        if (len != "" && len != undefined) {
                            checkLength(val, len);
                        } else {
                            checkLength(val, "100");
                        }
                    });
                }
            }

            /********************
            格式验证--数字
            *********************/
            if (id.split('-')[1].toUpperCase() == "N") {
                $("#" + id + "").bind("blur", function () {
                    checkNunmb(val);
                });
            }

            /********************
            格式验证--金额
            *********************/
            if (id.split('-')[1].toUpperCase() == "M") {
                $("#" + id + "").bind("blur", function () {
                    checkM(val);
                });
            }

            /********************
            格式验证--日期
            *********************/
            if (id.split('-')[1].toUpperCase() == "T") {
                //日期操作接口 yiyk   2015-11-10
                //var opt = {};
                var myDate = new Date();
                var year = myDate.getFullYear();
                var month = myDate.getMonth() + 1;
                var date = myDate.getDate();
                var datetime = year + "-" + month + "-" + date;//拼接时间


                var format = $("#TD-" + id).attr("name"); //document.getElementById(tdid).name; //获取td中 name 的值
                if (format != "" && format != undefined) {
                    $("#" + id + "").val('').mobiscroll().datetime({
                        theme: '',
                        mode: "scroller",
                        display: "modal",
                        lang: 'zh',
                        defaultValue: new Date(datetime),
                        dateFormat: 'yyyy-mm-dd',
                        startYear: year - 10,
                        endYear: year + 10
                    }).val(datetime);
                }
                else {                                        
                    $("#" + id + "").val('').mobiscroll().date({
                        theme: '',
                        mode: "scroller",
                        display: "modal",
                        lang: 'zh',
                        defaultValue: new Date(datetime),
                        dateFormat: 'yyyy-mm-dd',
                        startYear: year - 10,
                        endYear: year + 10
                    }).val(datetime);
                }
            }
        }
    });
    $("textarea").each(function (i, val) {
        var id = val.id;
        if (id.split('-').length == 3) {
            var str = $("#" + id + "").val();
            /********************
            格式验证--文本域的格式
            *********************/
            if (id.split('-')[1].toUpperCase() == "A") {
                $("#" + id + "").blur(function () {
                    var len = $("#TD-" + id).attr("name"); //document.getElementById(tdid).name; //获取td中 name 的值
                    if (len != "" && len != undefined) {
                        checkLength(val, len);
                    } else {
                        checkLength(val, "6000");
                    }
                });
            }
        }
    });
}
//日期范围限制    yiyk    2015-11-10
//startID:开始日期ID
//minDateValue：日期最小值
//endID：结束日期ID
//maxDateValue：日期最大值
function dateCompare(startID, minDateValue, endID, maxDateValue) {
    $("#" + startID + "").bind("focus",
        function () {
            WdatePicker({ minDate: "'" + minDateValue + "'", maxDate: "#F{$dp.$D('" + endID + "')||'" + maxDateValue + "'}" });
        }
    );

    $("#" + endID + "").bind("focus",
        function () {
            WdatePicker({ minDate: "#F{$dp.$D('" + startID + "')}", maxDate: "{'" + maxDateValue + "'}" });
        }
    );
}
//日期格式化    yiyk    2015-11-10
//ID:日期ID
//format：日期格式
function dateFormat(ID, format) {
    $("#" + ID + "").bind("click", function () {
        WdatePicker({ dateFmt: "" + format + "" });
    });
}

//验证
function txtCheck() {
    var check = "0";
    var userDpt = $("#appDeptName").text();
    if (userDpt == "") {
        $.MsgBox.Alert("提示:", "请选择发起部门！");
        return false;
    }
    if (SP_TDID.length == 0) {
        $("textarea").each(function (i, val) {
            var id = val.id;
            if (id.split('-').length == 3) {
                var str = $("#" + id + "").val();
                if (id.split('-')[2].toUpperCase() == "BT" && (str == "" || str == "此项必填！")) {
                    $("#" + id + "").val("此项必填！").css("color", "red");
                    check = "1";
                }
            }
        });
        $("input:text,input[type='number'],input[type='tel']").each(function (i, val) {
            var id = val.id;
            if (id.split('-').length == 3) {
                var str = $("#" + id + "").val();
                if (id.split('-')[2].toUpperCase() == "BT" && (str == "" || str == "此项必填！")) {
                    $("#" + id + "").val("此项必填！").css("color", "red");
                    check = "1";
                }
            }
        });
        $("select").each(function (i, val) {
            var id = val.id;
            if (id.split('-').length == 3) {
                var str = $("#" + id + "").val();
                //if (id.split('-')[2].toUpperCase() == "BT" && (str == "" || str == "此项必填！")) {
                //    $("#" + id + "").val("此项必填！").css("color", "red");
                //    check = "1";
                //}
                if (str == "") {                    
                    check = "2";
                }
            }
        });
        if (check == "1") {
            $.MsgBox.Alert("提示:", "您有必填项目尚未填写，请检查表单！");
        }
        if (check == "2") {
            $.MsgBox.Alert("提示:", "您有下拉框尚未选择，请检查表单！");
        }
    }
    else {
        $("textarea").each(function (i, val) {
            var id = val.id;
            if (id.split('-').length == 3) {
                //参数判断是否必填或可写
                var arr = SP_TDID.split("^");
                var isBT = "";
                for (var n = 0; n < arr.length; n++) {
                    var tdID = arr[n].toString();
                    var sID = tdID.substring(3);
                    sID = sID.substr(0, sID.length - 3);
                    var dID = id.substr(0, id.length - 3);
                    if (sID == dID) {
                        isBT = tdID.split("-")[3].toString();
                    }
                }

                var str = $("#" + id + "").val();
                if (isBT.toUpperCase() == "BT" && (str == "" || str == "此项必填！")) {
                    $("#" + id + "").val("此项必填！").css("color", "red");
                    check = "1";
                }
            }
        });
        $("input:text,input[type='number'],input[type='tel']").each(function (i, val) {
            var id = val.id;
            if (id.split('-').length == 3) {
                //参数判断是否必填或可写
                var arr = SP_TDID.split("^");
                var isBT = "";
                for (var n = 0; n < arr.length; n++) {
                    var tdID = arr[n].toString();
                    var sID = tdID.substring(3);
                    sID = sID.substr(0, sID.length - 3);
                    var dID = id.substr(0, id.length - 3);
                    if (sID == dID) {
                        isBT = tdID.split("-")[3].toString();
                    }
                }

                var str = $("#" + id + "").val();
                if (isBT.toUpperCase() == "BT" && (str == "" || str == "此项必填！")) {
                    $("#" + id + "").val("此项必填！").css("color", "red");
                    check = "1";
                }
            }
        });
        $("select").each(function (i, val) {
            var id = val.id;
            if (id.split('-').length == 3) {
                var str = $("#" + id + "").val();
                //if (id.split('-')[2].toUpperCase() == "BT" && (str == "" || str == "此项必填！")) {
                //    $("#" + id + "").val("此项必填！").css("color", "red");
                //    check = "1";
                //}
                if (str == "") {
                    //alert("请在下拉框中选择");
                    check = "2";
                }
            }
        });
        if (check == "1") {
            $.MsgBox.Alert("提示:", "您有必填项目尚未填写，请检查表单！");
        }
        if (check == "2") {
            $.MsgBox.Alert("提示:", "您有下拉框尚未选择，请检查表单！");
        }
    }
    //判断选人文本框是否为空
    if ($("#XRNAME")) {
        if ($("#XRNAME").val() == "单击选择审批人" || $("#XRNAME").val() == "") {
            if ($("input[name='raspjg']:checked").val() == "同意" || $.getUrlParam('sp') == "sq") {
                $.MsgBox.Alert("提示:", "请选择审批处理人！");
                check = "1";
            }
        }
    }

    if (check == "0") {
        return true;
    }
    else {
        return false;
    }
}

//控制文本框字数，当超过限制字数时不能输入
function checkLength(which, num) {
    var maxChars = num; //最大长度
    var str = "";
    var val = "";
    var realLength = 0, len = which.value.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = which.value.charCodeAt(i);
        str = which.value.charAt(i);
        if (charCode >= 0 && charCode <= 128) {
            realLength += 1;
        }
        else {
            realLength += 2;
        }
        if (realLength <= num) {
            val = val.concat(str);
        }
    }
    if (realLength > maxChars) {
        $.MsgBox.Alert("提示:", "您输入的字数超出限制，最大长度为" + num + "个字符！");
        // 超过限制的字数了就将 文本框中的内容按规定的字数 截取
        var lastVar = which.value.substring(realLength - 2, realLength - 1);
        charCode = lastVar.charCodeAt(0);
        if (charCode < 0 || charCode > 128) { maxChars = maxChars - 2; }
        which.value = val;
    }
}

//金额格式化
function checkM(obj) {
    var value = obj.value;
    var arr = value.split(",");
    var val = "";
    for (var i = 0; i < arr.length; i++) {
        val += arr[i].toString();
    }
    value = $.trim(val);
    if (isNaN(value)) {
        //再判断必须是数字
        $.MsgBox.Alert("提示:", "请输入数字！");
        obj.value = obj.value.replace(/[^\d\.]/g, '');
        return;
    }
    var float = parseFloat(value).toFixed(2).toString().split(".");
    value = float[0].toString();
    if (value.length > 3) {
        var result = "";
        while (value.length > 3) {
            var one = value.substr(value.length - 3, value.length);
            var two = value.substr(0, value.length - 3);
            value = two;
            result = "," + one + result;
        }
        if (result.length > 0) {
            value = value + result;
        }
    }
    value = value + "." + float[1].toString();

    obj.value = value;
}

function checkNunmb(val) {
    var r = val.value.match(/[^\d\.]/g);
    if (r != null) {
        $.MsgBox.Alert("提示:", "请输入数字！");
    }
    val.value = val.value.replace(/[^\d\.]/g, '');
}

/*********遍历控件并拼接格式*********/
function ControlSave(type) {
    var strSave = "";
    if (type == "1") {
        strSave = "Rev_CID^" + $("#YW_CID").val() + "|Rev_Creater_Code^" + $("#appCode").val() + "|Rev_Creater_Name^" + $("#appuName").text() + "|Rev_Creater_Dpt^" + $("#appDeptName").text() + "|Rev_Creater_Date^" + $("#appTime").text() + "|Rev_ProcessName^" + proName + "|Rev_Creater_Tel^" + $("#appTel").text() + "|REV_PRO_STATUS^0" + "|";
    }
    else {
        strSave = "Rev_CID^" + $("#YW_CID").val() + "|";
    }
    var strvalue = "";
    //bootStrap中div解析
    $(".divOther").each(function () {
        //获取需要拼接控件的div的id
        var this_id = $(this).attr("id");
        //id不能为空
        if (this_id != undefined) {
            var tdid = this_id;
            tdtype = tdid.split("-")[2]; //空间类型
            isBT = tdid.split("-")[3]; //是否必填
            controlID = tdid.substring(3);
            if (tdid.split("_")[1] != "title" && isBT != "ZD") {
                if (tdtype == "N" || tdtype == "S" || tdtype == "L" || tdtype == "T" || tdtype == "E" || tdtype == "D") {
                    var ty = document.getElementById(controlID);
                    if (ty != null) {
                        strvalue = $("#" + controlID + "").val();
                        controlID = controlID.split("-")[0];
                        strSave += controlID + "^" + strvalue + "|";
                    }
                }
                else if (tdtype == "M") {
                    var ty = document.getElementById(controlID);
                    if (ty != null) {
                        strvalue = $("#" + controlID + "").val();
                        controlID = controlID.split("-")[0];

                        var arr = strvalue.split(",");
                        var val = "";
                        for (var i = 0; i < arr.length; i++) {
                            val += arr[i].toString();
                        }
                        if (val.length > 0) {
                            strvalue = $.trim(val);
                        }
                        strSave += controlID + "^" + strvalue + "|";
                    }
                }
                else if (tdtype == "A") {
                    var ty1 = document.getElementById(controlID);
                    if (ty1 != null) {
                        strvalue = "";
                        strvalue = $("#" + controlID + "").html();
                        if (strvalue.length == 0) {
                            strvalue = $("#" + controlID + "").val();
                        }
                        if (strvalue.length == 0) {
                            if (typeof (document.getElementById("" + controlID + "").html) == "undefined") {
                                strvalue = "";
                            }
                            else {
                                strvalue = document.getElementById("" + controlID + "").html;
                            }
                        }
                        controlID = controlID.split("-")[0];

                        strSave += controlID + "^" + strvalue + "|";
                    }
                } else if (tdtype == "R") {//单选按钮保存数据
                    var radio = document.getElementsByName(tdid.split("-")[1]);
                    for (var i = 0; i < radio.length; i++) {
                        if (radio[i].checked == true) {
                            strvalue = radio[i].value; //获取选中的值
                            break;
                        }
                    }
                    controlID = controlID.split("-")[0];
                    strSave += controlID + "^" + strvalue + "|";
                } else if (tdtype == "C") {//复选框保存数据
                    var strSave_C = "";
                    var checkbox = document.getElementsByName(tdid.split("-")[1]);
                    for (var i = 0; i < checkbox.length; i++) {
                        if (checkbox[i].checked == true) {
                            strSave_C += checkbox[i].value + ","; //获取选中的值
                        }
                    }
                    if (strSave_C.length > 0) {
                        strSave_C = strSave_C.substr(0, strSave_C.length - 1);
                    }
                    controlID = controlID.split("-")[0];
                    strSave += controlID + "^" + strSave_C + "|";
                }
                else if (tdtype == "H") {//html保存数据
                    var ty1 = document.getElementById(controlID);
                    if (ty1 != null) {
                        strvalue = $.trim($("#" + controlID + "").html()).replace(/[\r\n]/g, "");
                        controlID = controlID.split("-")[0];
                        strSave += controlID + "^" + strvalue + "|";
                    }
                }
            }
        }
    });

    if (taskid.indexOf("S") >= 0 || taskid.indexOf("s") >= 0) {
        savedata(type, strSave);
    }
    else {
        savedata(type, strSave);
    }
}

/*********遍历控件查询字段*********/
function ControlValLoad() {
    ControlLoad();
}

//提交按钮
function savedata(type, strSave) {
    //$("#btnSend").hide();
    strSave = strSave.substring(0, strSave.length - 1);
    //判断是发起还是审批,将缩写传给发起时保存方法
    var Abbreviation = "";
    if (type == "1") {
        Abbreviation = $("#Abbreviation").val();
    }
    //如果是草稿箱打开则修改type为4，update业务表数据
    if (isOpenDrafts) {
        type = "4";
    }
    $.post('/WebMobile/handler/Rev_flowHandler.ashx',
        { type: type, strSave: strSave, Rev_YWTableName: Rev_YWTableName, Abbreviation: Abbreviation }, function (result) {
            var arr = result.split('|');
            if (arr[0] == "ok") {
                //如果是从草稿箱打开，点击保存时，则不再保存
                if (isOpenDrafts && isSave) {
                    layer.close(loadingIndex);
                    $.MsgBox.Confirm("温馨提示", "提交成功！", success);
                }
                else if (isSave) {//如果是存草稿箱                    
                    //将流程信息存储到草稿箱
                    $.post('/WebMobile/Rev_Drafts/Handler/Rev_DraftsHandler.ashx',
                    { type: "SaveDrafts", ywCid: $("#YW_CID").val(), userCode: $("#appCode").val(), userName: $("#appuName").text(), userDpt: $("#appDeptName").text(), processName: $("#txtProName").val(), taskID: $("#txtTaskID").val(), status: 0 },
                    function (data) {
                        layer.close(loadingIndex);
                        $.MsgBox.Confirm("温馨提示", "提交成功！", success);
                    });
                }
                else {
                    //判断是从草稿箱提交还是直接提交
                    if (isOpenDrafts) {
                        //草稿箱提交:更新该流程草稿箱状态为“发起中”；(status:0草稿；status:1发起中)
                        $.post('/WebMobile/Rev_Drafts/Handler/Rev_DraftsHandler.ashx',
                       { type: "UpdateDraftsStatus", ywCid: $("#YW_CID").val(), status: 1 },
                       function (data) {
                       });
                    }
                    else {
                        //直接提交：插入流程信息到草稿箱，状态为“发起中”
                        $.post('/WebMobile/Rev_Drafts/Handler/Rev_DraftsHandler.ashx',
                        { type: "SaveDrafts", ywCid: $("#YW_CID").val(), userCode: $("#appCode").val(), userName: $("#appuName").text(), userDpt: $("#appDeptName").text(), processName: $("#txtProName").val(), taskID: $("#txtTaskID").val(), status: 1 },
                        function (data) {
                        });
                    }
                    //发起流程
                    if (taskid.indexOf("S") >= 0 || taskid.indexOf("s") >= 0) {
                        Rev_varList = "Rev_CID^" + $("#YW_CID").val() + "@Rev_TableName^" + Rev_YWTableName;
                        var list2 = InsertVal();
                        if (list2 != "") {
                            if (Rev_varList != "") {
                                Rev_varList += "@" + list2;
                            }
                            else {
                                Rev_varList = list2;
                            }
                        }
                        sendOther();
                    }
                    else {
                        Rev_SendSPInfo();
                    }
                }
            }
            else {
                //错误信息
                errorInfo = $("#errorInfo").val() + "\nsavedata(" + type + "):" + arr[1];
                $("#errorInfo").val(errorInfo);

                //错误弹出框;
                layer.close(loadingIndex);
                $.MsgBox.Alert("提示:", "系统异常，请联系信息中心！");
                //$("#btnSend").show();
            }
        });
}

//审批时获取信息
function Rev_GetSPTable() {
    var Rev_TableName = "Rev_Approval";

    $.ajax({
        type: "POST",
        url: "/WebMobile/handler/Rev_flowHandler.ashx",
        data: {
            type: "Rev_GetSPTable", Rev_CID: $("#YW_CID").val(), Rev_KeyName: Rev_KeyName,
            Rev_TableName: Rev_TableName
        },
        async: false,
        success: function (Rev_Result) {
            var arr = Rev_Result.split('|');
            if (arr[0] == "er") {
                //错误弹出框;
                errorInfo = $("#errorInfo").val() + "\nRev_GetSPTable():" + arr[1];
                $("#errorInfo").val(errorInfo);
                $.MsgBox.Alert("提示:", "Rev_GetSPTable获取信息失败，请联系信息中心！");
                //错误信息
                return false;
            }
            else {
                $("#div_sp").html(arr[1]);
            }
            return true;
        }
    });
}

function showSpTable() {
    if ($("#divSpTable").is(":hidden")) {
        $("#divSpTable").show();
    }
    else {
        $("#divSpTable").hide();
    }
}

//显示审批意见
function showSpDetail(obj) {
    layer.open({
        type: 1,
        title: "审批意见",
        shadeClose: true,
        area: ['90%', '50%'],
        content: "<div>" + $(obj).find("input:hidden[name='Rev_NOTION']").val().replace(/[\r\n]/g, "<br/>") + "</div>"
    });
}

//审批时获取信息
function Rev_GetProInfo() {
    var Rev_TableName = "TASKS";
    $.ajax({
        type: "POST",
        url: "/WebMobile/handler/Rev_flowHandler.ashx",
        data: {
            type: "Rev_GetProInfo", Rev_TaskID: $("#txtTaskID").val(), Rev_KeyName: Rev_KeyName,
            Rev_TableName: Rev_TableName
        },
        async: false,
        success: function (Rev_Result) {
            var arr = Rev_Result.split('|');
            if (arr[0] == "er") { //
                //错误弹出框;
                $.MsgBox.Alert("提示:", "系统异常，获取信息失败，请联系信息中心！");
                //错误信息
                errorInfo = $("#errorInfo").val() + "\nRev_GetProInfo():" + arr[1];
                $("#errorInfo").val(errorInfo);
                return false;
            }
            else {
                $("#txtProName").val(arr[1].split("^")[0]);
                $("#txtProInc").val(arr[1].split("^")[1]);
                $("#stepName").val(arr[1].split("^")[2]);
                $("#txtStatus").val(arr[1].split("^")[3]);
                $(document).attr("title", arr[1].split("^")[2] + "_" + arr[1].split("^")[0]); //修改title值

                Rev_GetCID();
            }
            return true;
        }
    });
}

//提交流程
function Rev_SendProcess() {
    var taskid = $("#txtTaskID").val();
    chek = taskid.slice(0, 1); //取TaskID首字母
    var appCode = "";
    if (chek == "S" || chek == "s") {  //如果是发起环节
        appCode = $("#appCode").val();
    } else {
        appCode = $("#txtUserCode").val();
    }

    var Rev_TaskID = $("#txtTaskID").val(); //步骤ID
    var Rev_ProName = $("#txtProName").val(); //流程名称
    var Rev_UserUltCode = appCode; //登录人账号
    var strStepLable = $("#getSelectSteps").val(); //指定激活步骤名
    if (typeof (strStepLable) == "undefined") {
        strStepLable = "";
    }
    var REV_RESULT = $("input[name='raspjg']:checked").val();
    if (REV_RESULT != "退回") {
        strStepLable = "";
    }
    var Rev_Summary = Rev_ProName + "_" + $("#appuName").text(); //摘要
    $.post('/WebMobile/handler/Rev_flowHandler.ashx',    //ajax页面
    {
        type: "Rev_SendProcess", Rev_TaskID: Rev_TaskID, Rev_ProName: Rev_ProName,
        Rev_UserUltCode: Rev_UserUltCode, strStepLable: strStepLable, Rev_Summary: Rev_Summary, Rev_varList: Rev_varList
    }, function (Rev_Result) {
        var arr = Rev_Result.split('|');
        if (arr[0] == "er") { //
            //错误弹出框;
            layer.close(loadingIndex);
            $.MsgBox.Alert("提示:", "系统异常，提交流程失败，请联系信息中心！");
            //错误信息
            errorInfo = $("#errorInfo").val() + "\nRev_SendProcess():" + arr[1];
            $("#errorInfo").val(errorInfo);
            return false;
        }
        else {
            $.MsgBox.Confirm("温馨提示", "提交成功！", success);
        }
        return true;
    });
}

//提交成功后关闭页面
function success() {
    uexWindow.evaluateScript("biaodan", 0, "closedetailAndRemoveNode();");
}

//提交审批
function Rev_SendSPInfo() {
    var list2 = InsertVal();
    Rev_varList = "";
    if (list2 != "") {
        if (Rev_varList.length > 0) {
            Rev_varList += "@" + list2;
        }
        else {
            Rev_varList = list2;
        }
    }
    spIsHid = $("#checkInfoDiv").is(":hidden"); //审批信息div是否隐藏 可见false隐藏true
    if ($("#checkInfoDiv").val() == "undefined" || $("#checkInfoDiv").val() == undefined) {
        spIsHid = true;
    }
    var Rev_TableName = "Rev_Approval";
    if (spIsHid) {//如果是隐藏的则不作操作
        sendOther();
        return true;
    }
    else {
        var REV_RESULT = $("input[name='raspjg']:checked").val();
        if ($("#txtArSpyj").val() == "" && REV_RESULT != "同意") {
            layer.close(loadingIndex);
            $.MsgBox.Alert("提示:", "请填写审批意见！");
            $("#btnSend").show();
            return false;
        }
        else {
            var Rev_CID = $("#YW_CID").val();
            var Inc = $("#txtProInc").val();
            var stepName = $("#stepName").val();
            var REV_RESULT = $("input[name='raspjg']:checked").val();
            var list = "";
            if (REV_RESULT == "同意") {
                list = "Rev_Result^1";
            }
            else if (REV_RESULT == "退回") {
                list = "Rev_Result^0";
            }
            else {
                list = "Rev_Result^2";
            }
            if (Rev_varList.length <= 0) {
                Rev_varList = list;
            }
            else {
                Rev_varList = list + "@" + Rev_varList;
            }
            var taskid = $("#txtTaskID").val();
            chek = taskid.slice(0, 1); //取TaskID首字母
            var appcode = "";
            if (chek == "S" || chek == "s") {  //如果是发起环节
                appcode = $("#appCode").val();
            } else {
                appcode = $("#txtUserCode").val();
            }

            $.post('/WebMobile/handler/Rev_flowHandler.ashx',
            {
                type: "Rev_SendSPInfo", Rev_CID: Rev_CID, REV_RESULT: REV_RESULT,
                REV_NOTION: $("#txtArSpyj").val(), REV_PROCESSNAME: proName, Rev_KeyName: Rev_KeyName,
                Rev_TableName: Rev_TableName, REV_INCIDENT: Inc, REV_STEPLABEL: stepName,
                REV_TRANSACTORCODE: appcode, REV_TRANSACTORNAME: $("#txtSprName").text(),
                REV_DEALTIME: $("#txtSpTime").text()
            }, function (result) {
                var arr = result.split('|');
                if (arr[0] == "ok") { //如果保存成功
                    sendOther();
                    return true;
                }
                else {
                    //错误弹出框;
                    layer.close(loadingIndex);
                    $.MsgBox.Alert("提示:", "保存审批信息异常，请联系信息中心！");
                    //错误信息
                    errorInfo = $("#errorInfo").val() + "\nRev_SendSPInfo():" + arr[1];
                    $("#errorInfo").val(errorInfo);
                    return false;
                }
            });
        }
    }
}

//获取业务CID
function Rev_GetCID() {
    var Rev_TaskID = $("#txtTaskID").val();
    $.ajax({
        type: "POST",
        url: "/WebMobile/handler/Rev_flowHandler.ashx",
        data: { type: "Rev_GetCID", Rev_TaskID: Rev_TaskID },
        async: false,
        success: function (result) {
            var arr = result.split('|');
            if (arr[0] != "er") {
                $("#YW_CID").val(arr[1]);
                getUserInfo(Rev_YWTableName);
                ControlValLoad(); //获取表单信息
                $("#checkInfoDiv").show();
                //获取基本信息
                loadSql();
                Rev_GetAttachments();
                Rev_GetSPTable();
                return true;
            }
            else {
                //错误弹出框;
                $.MsgBox.Alert("提示:", "获取信息异常，请联系信息中心！");
                //错误信息
                errorInfo = $("#errorInfo").val() + "\nRev_GetCID:" + arr[1];
                $("#errorInfo").val(errorInfo);
                return false;
            }
        }
    });
}

//加载附件列表
function Rev_GetAttachments() {
    var Rev_TableName = "REV_ATTACHMENTS";    
    $.ajax({
        type: "POST",
        url: "/WebMobile/handler/Rev_flowHandler.ashx",
        data: {
            type: "Rev_GetAttachments", Rev_CID: $("#YW_CID").val(), Rev_KeyName: Rev_KeyName, Rev_TableName: Rev_TableName, userCode: $("#appCode").val(), rnum: Math.random()
        },
        async: false,
        success: function (Rev_Result) {
            var arr = Rev_Result.split('|');
            if (arr[0] == "er") {
                //错误弹出框;
                errorInfo = $("#errorInfo").val() + "\Rev_GetAttachments():" + arr[1];
                $("#errorInfo").val(errorInfo);
                $.MsgBox.Alert("提示:", "Rev_GetAttachments获取信息失败，请联系信息中心！");
                //错误信息
                return false;
            }
            else {
                $("#divRev_Attach").html(arr[1]);
            }
            return true;
        }
    });
}

//显示附件信息
function showAttachInfo() {
    if ($("#divAttachInfoShow").is(":hidden")) {
        $("#divAttachInfoShow").show();
    }
    else {
        $("#divAttachInfoShow").hide();
    }
}


//选择人员
function chooseUser(userCode,dptName, chooseSL, Ifun) {
    var url = "/WebMobile/ChooseUser/ChooseUserNew/Page/ChooseUser.html?IframeFun="+Ifun+"&IframeMaxCount="+chooseSL+"&IframeSupDpt=" + dptName + "&IframeValue=" + userCode + "&rnum=" + Math.random();
    openLayer(url);
}

//通过弹窗选择信息
function openLayer(url) {
    layer.open({
        type: 2,
        title: "",
        shadeClose: true,
        shade: false,
        area: ["100%", "100%"],
        content: url
    });
    //layer.full(1);
}

//选择部门
function chooseDpt(CIDID, objID, dptName, chooseSL) {//显示控件的ID，接收CID的控件ID，部门，数量
    var obj = new Object();
    obj.dptName = dptName;
    obj.checkLineCount = chooseSL;
    obj.minCheckLineCount = 1;
    obj.dptCid = $("#" + CIDID + "").val();
    var result = window.showModalDialog("/WebMobile/ChooseUser/ChooseDpt/Page/ChooseDpt.htm", obj, "dialogWidth:625px;dialogHeight:450px;scroll:no;status:no");
    if (typeof (result) == "undefined") {
        return;
    }
    var bmName = "";
    var bmCID = "";
    var arr = result.split("~");
    for (var i = 0; i < arr.length; i++) {
        var value = arr[i].toString();
        var arrLine = value.split("^");
        if (i == 0) {
            bmName = arrLine[1].toString();
            bmCID = arrLine[0].toString();
        }
        else {
            bmName = bmName + "，" + arrLine[1].toString();
            bmCID = bmCID + "," + arrLine[0].toString();
        }
    }
    if (bmCID.length > 0) {
        $("#" + CIDID + "").val(bmCID);
    }
    if (bmName.length > 0) {
        $("#" + objID + "").val(bmName);
    }
}

//选择工作组
function chooseGroup(userCodeId, UserNameId, dptName, chooseSL) {
    var obj = new Object();
    obj.dptName = dptName;
    obj.checkLineCount = chooseSL;
    obj.minCheckLineCount = 1;
    obj.userCode = $("#" + userCodeId + "").val();
    var result = window.showModalDialog("/WebMobile/ChooseUser/ChooseGroup/Page/ChooseGroup.htm", obj, "dialogWidth:1035px;dialogHeight:450px;scroll:no;status:no");
    if (typeof (result) == "undefined") {
        return;
    }
    var userName = "";
    var userCode = "";
    var arr = result.split("~");
    for (var i = 0; i < arr.length; i++) {
        var value = arr[i].toString();
        var arrLine = value.split("^");
        if (arrLine.length > 4) {
            userName += arrLine[2].toString() + ",";
            userCode += arrLine[1].toString() + "|" + arrLine[4].toString() + "^";
        }
    }
    if (userCode.length > 0) {
        userCode = userCode.substr(0, userCode.length - 1);
        $("#" + userCodeId + "").val(userCode);
    }
    if (userName.length > 0) {
        userName = userName.substr(0, userName.length - 1);
        $("#" + UserNameId + "").val(userName);
    }
}

//获取申请编号
function getYwnum(sign, dptName, kjId) {
    var bmzth = "";
    $.post('/WebMobile/handler/Rev_flowHandler.ashx',
    {
        type: "getYwnum", sign: sign, dptName: dptName, numType: "ywnum"
    }, function (result) {
        if (result != "") {
            var results = result.split('^');
            $("#" + kjId + "").val(results[0]);
            bmzth = results[2];
            if (bmzth == "") {
                $.MsgBox.Alert("提示:", "您当前部门的帐套号为空，不能进行填写信息提交申请操作，请联系信息技术部门进行完善帐套号信息！");
                $("#btnSend").hide();
                $("input:text").attr("disabled", "disabled");
                $("input[type='number']").attr("disabled", "disabled");
                $("input[type='tel']").attr("disabled", "disabled");
                $("input:radio").attr("disabled", "disabled");
                $("input:checkbox").attr("disabled", "disabled");
                $("textarea").attr("disabled", "disabled");
                $("select").attr("disabled", "disabled");
            }
        } else {
            //错误信息
        }
    });
}

//获取申请编号
function getXMnum(sign, dptName, kjId) {
    var djDpt = "";
    $.post('/WebMobile/handler/Rev_flowHandler.ashx',
    {
        type: "getYwnum", sign: sign, dptName: dptName, numType: "xmnum"
    }, function (result) {
        if (result != "") {
            var results = result.split('^');
            $("#" + kjId + "").val(results[0]);
            djDpt = results[1];
        } else {
            //错误信息
        }
    });
    return djDpt;
}

//防止键盘遮挡输入框
function setScroll() {
    $("input[type='text'],input[type='number'],input[type='tel'],textarea").focus(function () {
        var top = $(this).offset().top;
        var cTop = $(".content").offset().top;
        var scTop = $(".content").scrollTop();
        var setTop = top - cTop + scTop - 5;
        $(".content").animate({ scrollTop: setTop }, 500);
    });    

}

//获取url参数  $.getUrlParam('cid');
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = decodeURI(window.location.search).substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery);

//根据部门名称 获取分管领导账号
function LeadersInCharge(dptName, userCodeId, userNameId) {
    if (dptName != "") {
        $.post('/WebMobile/handler/Rev_flowHandler.ashx',
        {
            type: "LeadersInCharge", dptName: dptName
        }, function (result) {
            if (result != "") {
                var results = result.split('^');
                $("#" + userCodeId + "").val(results[0]);
                $("#" + userNameId + "").val(results[1]);
            } else {
                //错误信息
            }
        });
    }
}

//根据部门名称 获部门领导账号
function GetTopDeptLead(dptName, userCodeId, userNameId) {
    if (dptName != "") {
        $.post('/WebMobile/handler/Rev_flowHandler.ashx',
        {
            type: "GetTopDeptLead", dptName: dptName
        }, function (result) {
            if (result != "") {
                var results = result.split('^');
                $("#" + userCodeId + "").val(results[0]);
                $("#" + userNameId + "").val(results[1]);
            } else {
                //错误信息
            }
        });
    }
}

//打印功能
function lodopFun(printContent, styleCustom, printPageSize) {
    if (printContent == "") {
        printContent = "form1";
    }
    if (printPageSize == "") {
        printPageSize = "2"; //设置默认打印方向为横向
    }
    var LODOP = getLodop();
    var initWidth = "";
    var initHeight = "";
    if (printPageSize == "1") {
        initWidth = "210mm";
        initHeight = "297mm";
    } else {
        initWidth = "297mm";
        initHeight = "210mm";
    }
    var time = LODOP.FORMAT("TIME:yyyy-mm-dd hh:mm:ss", "now");
    var initName = proName + "_" + time;
    LODOP.PRINT_INITA("1mm", "5mm", initWidth, initHeight, initName); //初始化打印位置、可打印区域以及打印任务名称
    LODOP.SET_PRINT_PAGESIZE(printPageSize, 0, 0, "A4")//type/width/height/ptype
    var strBodyStyle1 = "<link href='/WebMobile/css/css.css' rel='stylesheet' type='text/css' />";
    var strBodyStyle2 = "<link href='/WebMobile/css/common.css' rel='stylesheet' type='text/css' />";
    var strBodyStyle3 = "<link href='/WebMobile/js/easyui-1.3.4/themes/icon.css' rel='stylesheet' type='text/css' />";
    var strBodyStyle4 = "<link href='/WebMobile/js/easyui-1.3.4/themes/gray/easyui.css' rel='stylesheet' type='text/css' />";
    var strBodyStyle5 = "<link href='/WebMobile/Rev_Attachment/Attahment.css' rel='stylesheet' type='text/css' />";

    var styleDefault = strBodyStyle1 + strBodyStyle2 + strBodyStyle3 + strBodyStyle4 + strBodyStyle5;
    var style = "";
    if (styleCustom == "") {
        style = styleDefault;
    } else {
        style = styleDefault + styleCustom;
    }
    var strFormHtml = "<!DOCTYPE html>" + style + "<body>" + document.getElementById(printContent).innerHTML + "</body>";
    if (printPageSize == "1") {
        initWidth = "200mm";
        initHeight = "282mm";
    } else {
        initWidth = "287mm";
        initHeight = "200mm";
    }
    LODOP.ADD_PRINT_HTML(0, 0, initWidth, initHeight, strFormHtml); //打印网页中的图片
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
    LODOP.SET_PRINT_STYLEA(0, "ItemType", 4);
    LODOP.SET_PRINT_STYLEA(0, "Horient", 3);
    LODOP.SET_PRINT_STYLEA(0, "Vorient", 3);
    var lineTop = "";
    var lineLeft1 = "";
    var lineLeft2 = "";
    if (printPageSize == "1") {
        lineTop = "288mm";
        lineLeft1 = "2mm";
        lineLeft2 = "198mm";
    } else {
        lineTop = "203mm";
        lineLeft1 = "0mm";
        lineLeft2 = "286mm";
    }
    LODOP.ADD_PRINT_LINE(lineTop, lineLeft1, lineTop, lineLeft2, 0, 2);
    LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
    LODOP.SET_PRINT_STYLEA(0, "Horient", 3);
    LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
    var location = window.location.href;
    var hrefInfo = "";
    var pageLeft = "";
    if (printPageSize == "2") {
        hrefInfo = location;
    } else {
        var href = location.split('/');
        var length = href.length;
        for (var i = 0; i < length; i++) {
            if (i == 0) {
                hrefInfo = href[i];
            } else if (i == 1) {
                hrefInfo = hrefInfo + "//";
            } else if (i == 2) {
                hrefInfo = hrefInfo + href[i] + "/";
            } else if (i == 3) {
                hrefInfo = hrefInfo + href[i] + "/";
            } else if (i == length - 1) {
                hrefInfo = hrefInfo + ".../" + href[length - 1];
            }
        }
    }
    var textTop = "";
    var textLeft = "";
    if (printPageSize == "1") {
        textTop = "290mm";
        textLeft = "5mm";
    } else {
        textTop = "205mm";
        textLeft = "5mm";
    }
    LODOP.ADD_PRINT_TEXT(textTop, textLeft, "180mm", 22, hrefInfo + " " + time);

    LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
    LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);

    if (printPageSize == "1") {
        textLeft = "176mm";
    } else {
        textLeft = "265mm";
    }

    LODOP.ADD_PRINT_TEXT(textTop, textLeft, "30mm", 22, "第#页/共&页");
    LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
    LODOP.SET_PRINT_STYLEA(0, "Horient", 1);
    LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);

    LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1); //横向旋转90度
    LODOP.SET_PRINT_MODE("RESELECT_ORIENT", false) //可以选择打印方向
    LODOP.SET_PRINT_MODE("RESELECT_PAGESIZE", true) //可以选择纸张大小
    //LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true)
    //LODOP.PRINT_DESIGN();
    LODOP.PREVIEWA();
}

//模拟弹出框js
$(document).ready(function () {
    $.MsgBox = {
        Alert: function (title, msg) {
            GenerateHtml("alert", title, msg);
            btnOk(); //alert只是弹出消息，因此没必要用到回调函数callback
            btnNo();
        },
        Confirm: function (title, msg, callback) {
            GenerateHtml("confirm", title, msg);
            btnOk(callback);
            btnNo();
        }
    }

    //生成Html
    var GenerateHtml = function (type, title, msg) {
        var _html = "";
        _html += '<div id="mb_box"></div><div id="mb_con"><span id="mb_tit">' + title + '</span>';
        _html += '<a id="mb_ico">x</a><div id="mb_msg">' + msg + '</div><div id="mb_btnbox">';
        if (type == "alert") {
            _html += '<input id="mb_btn_ok" type="button" value="确定" />';
        }
        if (type == "confirm") {
            _html += '<input id="mb_btn_ok" type="button" value="确定" />';
            // _html += '<input id="mb_btn_no" type="button" value="取消" />';
        }
        _html += '</div></div>';

        //必须先将_html添加到body，再设置Css样式
        $("body").append(_html); GenerateCss();
    }

    //生成Css
    var GenerateCss = function () {
        $("#mb_box").css({
            width: '100%', height: '100%', zIndex: '99999', position: 'fixed',
            filter: 'Alpha(opacity=60)', backgroundColor: 'black', top: '0', left: '0', opacity: '0.6'
        });

        $("#mb_con").css({
            zIndex: '99999999', width: '90%', position: 'fixed',
            backgroundColor: 'White', borderRadius: '15px'
        });

        $("#mb_tit").css({
            display: 'block', fontSize: '14px', color: '#444', padding: '10px 15px',
            backgroundColor: '#DDD', borderRadius: '15px 15px 0 0',
            borderBottom: '3px solid #009BFE', fontWeight: 'bold'
        });

        $("#mb_msg").css({
            padding: '20px', lineHeight: '20px',
            borderBottom: '1px dashed #DDD', fontSize: '13px'
        });

        $("#mb_ico").css({
            display: 'block', position: 'absolute', right: '10px', top: '9px',
            border: '1px solid Gray', width: '18px', height: '18px', textAlign: 'center',
            lineHeight: '16px', cursor: 'pointer', borderRadius: '12px', fontFamily: '微软雅黑'
        });

        $("#mb_btnbox").css({ margin: '15px 0 10px 0', textAlign: 'center' });
        $("#mb_btn_ok,#mb_btn_no").css({ width: '85px', height: '30px', color: 'white', border: 'none' });
        $("#mb_btn_ok").css({ backgroundColor: '#168bbb' });
        $("#mb_btn_no").css({ backgroundColor: 'gray', marginLeft: '20px' });

        //右上角关闭按钮hover样式
        $("#mb_ico").hover(function () {
            $(this).css({ backgroundColor: 'Red', color: 'White' });
        }, function () {
            $(this).css({ backgroundColor: '#DDD', color: 'black' });
        });

        var _widht = document.documentElement.clientWidth; //屏幕宽
        var _height = document.documentElement.clientHeight; //屏幕高

        var boxWidth = $("#mb_con").width();
        var boxHeight = $("#mb_con").height();

        //让提示框居中
        $("#mb_con").css({ top: (_height - boxHeight) / 2 + "px", left: (_widht - boxWidth) / 2 + "px" });
    }

    //确定按钮事件
    var btnOk = function (callback) {
        $("#mb_btn_ok").click(function () {
            $("#mb_box,#mb_con").remove();
            if (typeof (callback) == 'function') {
                callback();
            }
        });
    }

    //取消按钮事件
    var btnNo = function () {
        $("#mb_btn_no,#mb_ico").click(function () {
            $("#mb_box,#mb_con").remove();
        });
    }
});

//选择发起部门时给隐藏的部门名称赋值
function dptEval() {
    var userDpt = $("#deptNameSel option:selected").text();
    $("#appDeptName").text(userDpt);
}