//数据库读取的行数
var customRowsNum = 0;
//数据暂存集合
var customTableList = [];
//当前页的行数
var onPageCount = 0;
//当前页删除的行数
var onPageDelCount = 0;
//一行空白数据集合
var emptyInfo = [];
//合计参数
var isTotal;
//合计返回值
var customTotal = 0;
//网站虚拟目录名
var virtualName = "/WebMobile";
//加载多行
function loadCustomTable() {
    $.post(virtualName + "/customTable/handler/TableInfoHandler_Mobile.ashx", { type: "GetDataList", jsonArray: jsonArray },
    function (data) {
        if (data.length != 0) {
            //将数据库Json字符串转换成Json对象
            var jsonList = eval(data);
            //数据库数据行数
            customRowsNum = jsonList.length;
            //解析Json串中的集合到数据暂存集合中
            for (var i = 0; i < jsonList.length; i++) {
                customTableList.push(jsonList[i]);
            }
        }

        //加载明细数据
        getCustomTable();
    });
}

//初次加载合计多列*****************************2016年6月15日 梁章云还原合计
function getListTotal() {
    //循环列找到合计的列
    var array = eval(jsonArray);
    var colums = eval(array[0]["colum"]);
    for (var i = 0; i < customTableList.length; i++) {
        var info = customTableList[i];

        for (var m = 0; m < colums.length; m++) {
            var isHJ = colums[m]["isTotal"] == null ? "false" : colums[m]["isTotal"].toString();
            //如果是合计的列，则将合计的值减去删除行的该列数值
            if (isHJ == "float") {
                var hjID = "td_" + m.toString();
                var hjCount = 0;
                var count = "";
                if (info[m] == "") {
                    count = 0;
                } else {
                    var count = info[m];
                }

                if (document.all(hjID) != null) {
                    hjCount = $("#" + hjID + "").html();
                }
                if (hjCount.length > 0) {
                    var newCount = parseFloat(hjCount) + parseFloat(count);
                    $("#" + hjID + "").html(parseFloat(newCount).toFixed(2));
                }
                else {
                    $("#" + hjID + "").html(parseFloat(count).toFixed(2));
                }

            }
            else if (isHJ == "int") {
                var hjID = "td_" + m.toString();
                var hjCount = 0;
                //                var count = info[m];
                if (info[m] == "") {
                    count = 0;
                } else {
                    var count = info[m];
                }
                if (document.all(hjID) != null) {
                    hjCount = $("#" + hjID + "").html();
                }
                if (hjCount.length > 0) {
                    var newCount = parseInt(hjCount) + parseInt(count);
                    $("#" + hjID + "").html(newCount);
                }
                else {
                    $("#" + hjID + "").html(count);
                }

            }
        }
    }
}
//*********************End*************************************

//加载多行,弹出
function loadCustomTableTC() {
    $.post(virtualName + "/customTable/handler/TableInfoHandler.ashx", { type: "GetDataList", jsonArray: jsonArray },
    function (data) {
        if (data.length != 0) {
            //将数据库Json字符串转换成Json对象
            var jsonList = eval(data);
            //数据库数据行数
            customRowsNum = jsonList.length;
            //解析Json串中的集合到数据暂存集合中
            for (var i = 0; i < jsonList.length; i++) {
                customTableList.push(jsonList[i]);
            }
        }

        //判断是否有合计
        var svalue = "";
        var list = eval(jsonArray);
        isTotal = list[0]["total"];
        if (isTotal.length > 0) {
            var str = isTotal.split('^');
            for (var i = 0; i < str.length; i++) {
                var colum = parseInt(str[i]);
                //合计数据库中的数据
                if (svalue == 0) {
                    svalue += getTotal(colum - 1);
                } else {
                    svalue += "^" + svalue;

                }
            }
            customTotal = svalue;
            $("#customTotal").html(customTotal);
        }

        //加载操作按钮和表头
        loadCustomTableInfoTC();

        //2016年7月2日添加合计
        setTimeout(function () {
            getListTotal();
        }, 100);
        //初始化一个空白行
        var array = eval(jsonArray);
        var colums = eval(array[0]["colum"]);
        for (var i = 0; i < colums.length; i++) {
            emptyInfo.push("");
        }
    });
}

//加载多行,字典
function loadCustomTableZD(searchArray) {

    $.post(virtualName + "/customTable/handler/TableInfoHandler.ashx", { type: "GetDataListForZD", jsonArray: jsonArray, searchArray: searchArray },
    function (data) {
        customTableList = [];
        if (data.length != 0) {
            //将数据库Json字符串转换成Json对象
            var jsonList = eval(data);
            //数据库数据行数
            customRowsNum = jsonList.length;
            //解析Json串中的集合到数据暂存集合中
            for (var i = 0; i < jsonList.length; i++) {
                customTableList.push(jsonList[i]);
            }
        }

        //判断是否有合计
        var svalue = "";
        var list = eval(jsonArray);
        isTotal = list[0]["total"];
        if (isTotal.length > 0) {
            var str = isTotal.split('^');
            for (var i = 0; i < str.length; i++) {
                var colum = parseInt(str[i]);
                //合计数据库中的数据
                if (svalue == 0) {
                    svalue += getTotal(colum - 1);
                } else {
                    svalue += "^" + svalue;

                }
            }
            customTotal = svalue;
            $("#customTotal").html(customTotal);
        }

        //加载操作按钮和表头
        loadCustomTableInfoZD();

        //初始化一个空白行
        var array = eval(jsonArray);
        var colums = eval(array[0]["colum"]);
        for (var i = 0; i < colums.length; i++) {
            emptyInfo.push("");
        }
    });
}

//加载操作按钮和表头
function loadCustomTableInfo() {
    $.post(virtualName + "/customTable/handler/TableInfoHandler.ashx", { type: "LoadCustomTableInfo", jsonArray: jsonArray },
    function (data) {
        $("#customTable").html(data);
        //分页加载数据
        getPageCustomTable(1);
    });
}

//加载操作按钮和表头，弹出
function loadCustomTableInfoTC() {
    $.post(virtualName + "/customTable/handler/TableInfoHandler.ashx", { type: "LoadCustomTableInfoTC", jsonArray: jsonArray },
    function (data) {
        $("#customTable").html(data);
        //分页加载数据
        getPageCustomTable(1);
    });
}

//加载操作按钮和表头，弹出
function loadCustomTableInfoZD() {
    $.post(virtualName + "/customTable/handler/TableInfoHandler.ashx", { type: "LoadCustomTableInfoZD", jsonArray: jsonArray },
    function (data) {
        $("#customTable").html(data);
        //分页加载数据
        getPageCustomTableZD(1);
    });
}
function getPageCustomTableZD(pageIndex) {
    //初始化当前页删除的行数
    onPageDelCount = 0;
    //将数据暂存集合转换成Json传到一般处理程序中
    var jsonTableList = JSON.stringify(customTableList);
    $.post(virtualName + "/customTable/handler/TableInfoHandler.ashx", { type: "LoadTable", jsonArray: jsonArray, jsonTableList: jsonTableList, pageIndex: pageIndex, pageSize: pageSize },
    function (data) {
        $("#customTbody").html(data);
        allCount = customTableList.length;
        pageCount = allCount % pageSize == 0 ? parseInt(allCount / pageSize, 10) : (parseInt(allCount / pageSize, 10) + 1);
        if (curPage > pageCount)
            curPage = 1;
        if (pageIndex == 1)
            curPage = 1;
        loadPage();
        $("#customTbody TR").each(function () {
            var o = $(this);
            $(this).bind("dblclick", function () {
                customTrEvent(o);
            });


        });
        //初始化当前页的行数
        if (pageCount == 0) {
            onPageCount = 0
        }
        else if (pageCount == pageIndex) {
            onPageCount = allCount - pageSize * (pageCount - 1);
        }
        else {
            onPageCount = pageSize;
        }

    });
}



//分页加载数据
function getCustomTable() {
    //将数据暂存集合转换成Json传到一般处理程序中
    var jsonTableList = JSON.stringify(customTableList);
    $.post(virtualName + "/customTable/handler/TableInfoHandler_Mobile.ashx", { type: "LoadTable", jsonArray: jsonArray, jsonTableList: jsonTableList, rnum:Math.random() },
    function (data) {
        $("#divDetail").html(data);

        setTableScroll();
    });
}

//分页******************************************************************************************************
var pageSize = 10;
var pageCount = 0;
var curPage = 1;
var allCount;

function loadPage() {
    var pageStr = "<td colspan='77' align='center' class='footerpage'  id='pageDiv'><div style='float:left;'>";
    pageStr += "<img src='" + virtualName + "/customTable/images/pge.jpg' width='2' height='19'  alt='' style='cursor:pointer' /> &nbsp;";
    pageStr += "<img src='" + virtualName + "/customTable/images/no1.png' width='16' height='16'  alt='' style='cursor:pointer' onclick='PageClick(1)'/>&nbsp;";
    pageStr += "<img src='" + virtualName + "/customTable/images/pageup.png' width='16' height='16'  alt='' style='cursor:pointer' onclick='PrePage()'/>&nbsp;第";
    pageStr += "<input type='text' name='textfield' id='textfield' class='pga' onkeypress='getKey();'/>";
    pageStr += "页&nbsp;&nbsp;共" + pageCount + "页&nbsp;<img src='" + virtualName + "/customTable/images/pge.jpg' width='2' height='19'  alt='' style='cursor:pointer' />&nbsp;";
    pageStr += "<img src='" + virtualName + "/customTable/images/pugedown.png' width='16' height='16'  alt='' style='cursor:pointer' onclick='NextPage()'/>&nbsp;";
    pageStr += "<img src='" + virtualName + "/customTable/images/noend.png' width='16' height='16'  alt='' style='cursor:pointer' onclick='PageClick(" + pageCount + ")'/>&nbsp;";
    pageStr += "<img src='" + virtualName + "/customTable/images/pge.jpg' width='2' height='19'  alt='' style='cursor:pointer'/>&nbsp;";
    pageStr += "<img src='" + virtualName + "/customTable/images/ref.png' width='16' height='16'  alt='' style='cursor:pointer' onclick='getPageCustomTable(" + curPage + ")'/>";
    pageStr += "</div><span style='float:right;'>显示" + curPage + "-" + pageCount + "，共" + allCount + "条</span></td>";

    $("#pageDiv").html(pageStr);

    var type = getUrlParam("type");
    var stu = getUrlParam("prcStu");
    //if (stu == 3) {

    //}
    setheight();
}

//iframe 自适应高度
function setheight() {
    var frameId = window.frameElement && window.frameElement.id || '';
    var ifmhe = $(document.body).height(); //获取body高度，

    ifmhe += 24; //添加行高度补偿
    $(parent.document.getElementById(frameId)).height(ifmhe);
}

//iframe 自适应高度申请用
function setheightSQ() {
    var frameId = window.frameElement && window.frameElement.id || '';
    var ifmhe = $(document.body).height(); //获取body高度，
    ifmhe += 50; //添加行高度补偿
    $(parent.document.getElementById(frameId)).height(ifmhe);
}


function PrePage() {
    if (curPage - 1 > 0) {
        //保存当前页数据到暂存集合
        GetTableList();
        curPage = curPage - 1;
        getPageCustomTable(curPage);
    }
}

function NextPage() {
    if (curPage + 1 <= pageCount) {
        //保存当前页数据到暂存集合
        GetTableList();
        curPage = curPage + 1;
        getPageCustomTable(curPage);
    }
}

function PageClick(obj) {
    if (parseInt(obj, 10) != curPage) {
        //保存当前页数据到暂存集合
        GetTableList();
        curPage = parseInt(obj, 10);
        getPageCustomTable(curPage);
    }
}
function getKey() {
    if (event.keyCode == 13) {
        window.event.keyCode = 0; //阻止刷新页面
        ChangePage();
    }
}
function ChangePage() {
    var txt = document.getElementById("textfield").value;
    if (isNaN(txt)) {
        alert("页码请输入数字！");
        return;
    }
    var page = parseInt(document.getElementById("textfield").value, 10);
    if (page != curPage) {
        //保存当前页数据到暂存集合
        GetTableList();
        if (page <= 0)
            page = 1;
        else if (page > pageCount)
            page = pageCount;
        curPage = page;
        getPageCustomTable(curPage);
    }
}
//******************End***********************************************************************

//添加或删除时动态变更当前分页个数
function changePageInfo() {
    pageCount = allCount % pageSize == 0 ? parseInt(allCount / pageSize, 10) : (parseInt(allCount / pageSize, 10) + 1);
    loadPage();
}

//全选
function allCustomCheck() {
    //if ($("#checkAllOrNull").attr("checked") == "checked") {
    //if ($("#checkAllOrNull")[0].checked) {
    //    $("input[name='custom_name']").attr("checked", "checked");
    //}
    //else {
    //    $("input[name='custom_name']").removeAttr("checked");
    //}

    if ($("#checkAllOrNull").prop("checked")) {
        $("input[name='custom_name']").prop("checked", true);
    }
    else {
        $("input[name='custom_name']").removeAttr("checked");
    }
}

//添加行
function addCustomTableRow() {
    //获取最后一页的行数
    var endPageRowCount = allCount - pageSize * (pageCount - 1);
    if (allCount == 0) {
        endPageRowCount = 0;
    }
    //判断当前页的行数是否已达标
    if (pageCount > curPage) {
        //添加行的时候需要默认跳转到最后一页添加一行
        //向暂存集合中添加一行空数据
        customTableList.push(emptyInfo);
        //判断最后一页数据行是否已经饱和（及行数是否等于pageSize）
        if (endPageRowCount == pageSize) {
            //如果最后一页数据行数饱和，则先将总分页数累加一
            pageCount += 1;
        }
        //将当前页码改成最后一页页码
        curPage = pageCount;
        //重新绑定Table数据和分页
        getPageCustomTable(pageCount);
    }
    else if (pageCount = curPage) {
        //当前页是最后一页时需要判断当前页的行数是否与PageSize相等
        //如果最后一页的行数与PageSize相等
        if (endPageRowCount == pageSize) {
            //判断当前页的数据是否都填写完整
            checkTableIsWrite();
            if (tableIsWrite) {
                //如果填写完整，则自动添加一页并跳转，同事在新页上添加一个空白行
                //存储当前页的数据到暂存集合
                GetTableList();
                //向暂存集合中添加一行空数据
                customTableList.push(emptyInfo);
                //获取当前页码并加一
                curPage = curPage + 1;
                //重新绑定Table数据和分页
                getPageCustomTable(curPage);
            }
            else {
                alert("第" + tableIsNotWriteRow + "行的数据没有填写，请填写！");
                return;
            }
        }
        else {
            //添加一行
            $.post(virtualName + "/customTable/handler/TableInfoHandler.ashx", { type: "AddTable", jsonArray: jsonArray, onPageCount: (onPageCount + onPageDelCount), curPage: curPage, pageSize: pageSize },
            function (data) {
                if (data.length > 0) {
                    $("#customTbody").append(data);
                    allCount = parseInt(allCount) + 1;
                    onPageCount = parseInt(onPageCount) + 1;
                    changePageInfo();
                }
                else {
                    //添加行失败
                    alert("添加行失败！");
                }
            });
        }
    }
}

//删除行
function delCustomTableRow() {
    var checkBoxObj = $("input[name='custom_name']");
    //存储删除的行ID
    var trID = "";
    for (var i = 0; i < checkBoxObj.length; i++) {
        //if ($(checkBoxObj[i]).attr("checked") == "checked") {
        if ($(checkBoxObj[i])[0].checked) {
            var trId = checkBoxObj[i].id;
            trID += trId + "^";

            //判断是否有合计
            if (isTotal.length > 0) {
                //有合计的话就减去删除行的合计列值
                //获取删除行的合计列值
                var id = trId + "-" + (parseInt(isTotal) - 1).toString();
                if (document.all(id) != null) {
                    var val = $("#" + id + "").val();
                    customTotal = parseInt(customTotal) - parseInt(val);
                }
            }

            $("#tr_" + trId + "").remove();
            allCount = parseInt(allCount) - 1;
            onPageDelCount = parseInt(onPageDelCount) + 1;
        }
    }
    //新增 Bug-00149 梁章云 2016年8月12日 Start
    if (trID.length == 0) {
        alert("未选中任何行！");
        return;
    }
    //新增 Bug-00149 梁章云 2016年8月12日 End
    $("#customTotal").html(customTotal);

    //判断如果不是在最后一页删除数据，则将删除的数据从数据集中删除
    if (pageCount > curPage) {
        if (trID.length > 0) {
            trID = trID.substr(0, trID.length - 1);
        }

        var arr = trID.split("^");
        for (var n = arr.length - 1; n >= 0; n--) {
            //计算删除的行相当于暂存集合中的位置
            var index = parseInt(arr[n]);
            //将删除数据从集合中
            customTableList.splice(index, 1);
        }
        getPageCustomTable(curPage);
    }
    else {
        //最后一页删除数据时，只删除数据集合中含有的数据
        if (trID.length > 0) {
            trID = trID.substr(0, trID.length - 1);
        }

        var arr = trID.split("^");
        for (var n = arr.length - 1; n >= 0; n--) {
            //当前的页数据相当于数据暂存集合中的范围
            var startIndex = (curPage - 1) * pageSize;
            //计算删除的行相当于暂存集合中的位置
            var index = parseInt(arr[n]);
            //判断要删除的行是否是新增加的行
            if (startIndex > index) {
                //新增加的行需要计算其相当于在数据集合中的位置
                index = startIndex + index;
            }
            //删除数据集合中含有的数据
            if (index < customTableList.length) {
                //将删除数据从集合中
                customTableList.splice(index, 1);
            }
        }
        //获取最后一页的行数
        var endPageRowCount = allCount - pageSize * (pageCount - 1);
        if (endPageRowCount % pageSize == 0) {
            if (curPage != 1) {
                curPage = curPage - 1;
            }
            //删除的不是最后一页的数据则刷新Table
            getPageCustomTable(curPage);
        }
        else {
            //changePageInfo();
            getPageCustomTable(curPage);
        }
    }

    //去除全选状态
    $("#checkAllOrNull").removeAttr("checked");
}

//获取表单所有数据
function GetTableList() {
    customTableList = [];
    //遍历Table行
    $("#divDetail .editDiv").each(function (i, val) {
        //遍历每行的列
        var info = [];
        var arrDiv = $(val).find("div[class='row']");
        for (var m = 0; m < arrDiv.length; m++) {
            var divID = arrDiv[m].id;
            if (divID.length != 0) {
                //通过td的id截取到td中控件的id
                var arr = divID.split("_");
                //控件的ID
                var inputID = arr[1];
                //获取到当前控件的值
                var value = $("#" + inputID + "").val();

                info.push(value);
            }
        }
        customTableList.push(info);
    });
}

//判断当前页填写数据是否完整
var tableIsWrite = true;
var tableIsNotWriteRow = 1;
function checkTableIsWrite() {
    tableIsWrite = true;
    tableIsNotWriteRow = 1;
    //遍历Table行
    $("#customTbody").find("tr").each(function (i, val) {
        tableIsNotWriteRow = i + 1;
        //遍历每行的列
        var arrTD = $(this).children();
        //存储当前行所有列是否有值得个数
        var count = 0;
        for (var m = 0; m < arrTD.length; m++) {
            var tdID = arrTD[m].id;
            if (tdID.length != 0) {
                //通过td的id截取到td中控件的id
                var arr = tdID.split("_");
                //控件的ID
                var inputID = arr[1];
                //获取到当前控件的值
                var value = $("#" + inputID + "").val();
                if (value.length != 0) {
                    count += 1;
                }
            }
        }
        if (count == 0) {
            tableIsWrite = false;
            return false;
        }
    });
}


//保存数据
var parentGuid = "";
function saveCustomData(guid) {
    parentGuid = guid;
    GetTableList();        
    //数据集合customTableList(验证多行必填)
    var jsonTableList = JSON.stringify(customTableList);
    if (jsonTableList.toString() == "[]") {
        alert("明细行尚未添加信息，提交失败");
        return false;
    }

    $.ajax({
        type: "post",
        url: virtualName + "/customTable/handler/TableInfoHandler_Mobile.ashx",
        data: { type: "CheckSave", jsonArray: jsonArray, jsonTableList: jsonTableList, parentGuid: parentGuid },
        async: false, //同步
        success: function (strdata) {
            if (strdata.length == 0) {
                $("#hdcheck").val("1"); //验证通过
                saveCustomList(); //保存业务数据
            }
            else {
                alert(strdata);
                $("#hdcheck").val("2"); //验证失败
                return false;
            }
        }
    });
}

//验证明细行必填信息
function checkCustomData(guid) {
    var result = false;
    parentGuid = guid;
    GetTableList();
    // alert(customTableList);    
    //数据集合customTableList(验证多行必填)
    var jsonTableList = JSON.stringify(customTableList);
    if (jsonTableList.toString() == "[]") {
        alert("明细行尚未添加信息，提交失败");
        return false;
    }
    $.ajax({
        type: "post",
        url: virtualName + "/customTable/handler/TableInfoHandler_Mobile.ashx",
        data: { type: "CheckSave", jsonArray: jsonArray, jsonTableList: jsonTableList, parentGuid: parentGuid },
        async: false, //同步
        success: function (strdata) {

            if (strdata.length == 0) {

                $("#hdcheck").val("1"); //验证通过
                result = true;
            }
            else {
                alert(strdata);
                $("#hdcheck").val("2"); //验证失败
                result = false;
            }
        }
    });
    return result;
}

//存库
function saveCustomList() {
    //将数据暂存集合转换成Json传到一般处理程序中
    var jsonTableList = JSON.stringify(customTableList);
    $.post(virtualName + "/customTable/handler/TableInfoHandler_Mobile.ashx", { type: "SaveTable", jsonArray: jsonArray, jsonTableList: jsonTableList, parentGuid: parentGuid },
    function (data) {
        //alert(data);
    });
}

//合计
//var customTotal = 0;
function getTotal(colums) {
    customTotal = 0;
    for (var i = 0; i < customTableList.length; i++) {
        var info = customTableList[i];
        if (info.length >= colums) {
            var count = info[colums];
            if (count.length > 0) {
                customTotal = parseInt(customTotal) + parseInt(count);
            }
        }
    }

    return customTotal;
}

//鼠标进入合计列时，获取到当前存储的值
var beforTotalValue = "";
function getTotalBefore(n, e) {
    var id = e.id;
    if (n == 9) {
        //先判断不能为空
        beforTotalValue = $("#" + id + "").val();
    }
    //新增合计
    if (n == 197 || n == 198 || n == 35) {
        //先判断不能为空
        var index = id.lastIndexOf('-') + 1;
        var newId = id.substring(0, index) + (isTotal - 1);
        beforTotalValue = $("#" + newId + "").val();
        beforTotalValue = beforTotalValue.replace(/\,/g, "");
    }
}

//JS验证
function jsCheck(n, e) {
    var id = e.id;
    if (n == 1) {
        //验证为数字
        if (document.all(id) != null) {
            //获取当前控件的值
            var value = $("#" + id + "").val();
            if (isNaN(value)) {
                alert("请输入数字！");
                $("#" + id + "").focus();
                return;
            }
        }
    }
    else if (n == 2) {
        //验证不能为空
        //获取当前控件的值
        if (document.all(id) != null) {
            var value = $("#" + id + "").val();
            if (value.replace(/[ ]/g, "") == "") {
                alert("请输入内容！");
                return;
            }
        }
    }
    else if (n == 4) {
        //验证不能为空
        //获取当前控件的值
        if (document.all(id) != null) {
            var value = $("#" + id + "").val();
            if (value.replace(/[ ]/g, "") == "") {
                //alert("请输入内容！");
                return;
            }
        }
    }
    else if (n == 3) {
        //验证不能为空
        //获取当前控件的值
        if (document.all(id) != null) {
            var value = $("#" + id + "").val();
            if (value.replace(/[ ]/g, "") == "") {
                alert("请输入内容！");
                //$("#" + id + "").focus();
                return;
            }
            else {
                //验证为数字
                if (document.all(id) != null) {
                    //获取当前控件的值
                    var value = $("#" + id + "").val();
                    if (isNaN(value)) {
                        alert("请输入数字！");
                        $("#" + id + "").focus();
                        return;
                    }
                }
            }
        }
    }
    else if (n == 9) {
        //计算该列的合计并验证为数字
        //先判断不能为空
        if (document.all(id) != null) {
            var value = $("#" + id + "").val();
            value = value.replace(/\,/g, "");//替换数据中的逗号
            if (value.replace(/[ ]/g, "") == "") {
                alert("请输入内容！");
                //$("#" + id + "").focus();
                return;
            }
            else if (isNaN(value)) {
                //再判断必须是数字
                alert("请输入数字！");
                //$("#" + id + "").focus();
                return;
            }            
        }
    }
        //计算金额 单价*数量
    else if (n == 33) {
        if (document.all(id) != null) {
            var value = $("#" + id + "").val();
            if (value.replace(/[ ]/g, "") == "") {
                // alert("请输入内容！");
                //  $("#" + id + "").focus();
                return;
            }
            else if (isNaN(value)) {
                //再判断必须是数字
                alert("请输入数字！");
                // $("#" + id + "").focus();
                return;
            }
        }
        var arr = id.split('-');
        var m1 = parseInt(arr[1]) + 1;
        var id1 = arr[0] + "-" + m1;

        //写入的列id
        var m2 = parseInt(arr[1]) + 2;
        var id2 = arr[0] + "-" + m2;

        var val1 = $("#" + id1 + "").val();
        if (val1.length == 0 || value.length == 0) {
            $("#" + id2 + "").val("");
        }
        else {
            var NewVal = parseFloat(val1) * parseFloat(value);            

            $("#" + id2 + "").val(NewVal);
        }
    }
        //计算金额 单价*数量 销售下单流程用
    else if (n == 35) {
        if (document.all(id) != null) {
            var value = 0;
            var arr = id.split('-');
            if (id.indexOf("12") > -1) {
                value = $("#" + id + "").val();
            }
            else {
                var djid = arr[0] + "-12";//单价ID
                value = $("#" + djid + "").val();
            }

            value = value.replace(/\,/g, "");//替换数据中的逗号
            if (value.replace(/[ ]/g, "") == "") {
                //alert("请输入内容！");
                //  $("#" + id + "").focus();
                return;
            }
            else if (isNaN(value)) {
                //再判断必须是数字
                alert("请输入数字！");
                // $("#" + id + "").focus();
                return;
            }
        }
        var arr = id.split('-');

        var sl = 10;
        var slid = arr[0] + "-" + sl;//数量所在ID
        var quantity = $("#" + slid + "").val();
        quantity = quantity.replace(/\,/g, "");

        var hsl = 9;
        var hslid = arr[0] + "-" + hsl;//换算率所在ID
        var hslval = $("#" + hslid + "").val();



        var hszj = 13;
        var hszjid = arr[0] + "-" + hszj;//不含税总价所在ID
        var oldzj = $("#" + hszjid + "").val();
        if (oldzj == "") {
            beforTotalValue = 0;
        }
        else {
            oldzj = oldzj.replace(/\,/g, "");
            beforTotalValue = parseFloat(oldzj);
        }
        var lineTotal = parseFloat(value) * parseFloat(quantity);
        if (isNaN(lineTotal)) {
            lineTotal = 0;
        }

        //件数及总件数计算------------------↓↓↓↓↓↓↓↓-------------------------------
        var js = 11;
        var jsid = arr[0] + "-" + js;//件数所在ID
        //原件数
        var oldjs = $("#" + jsid + "").val();
        if (oldjs == "") {
            oldjs = 0;
        }
        else {
            oldjs = oldjs.replace(/\,/g, "");
            oldjs = parseFloat(oldjs);
        }

        var jsjs = 0.00;
        if (!isNaN(quantity) && !isNaN(hslval) && quantity != "" && hslval != "") {
            jsjs = parseFloat(quantity) / parseFloat(hslval);
            if (isNaN(lineTotal)) {
                jsjs = 0.00;
            }
            else {
                $("#" + jsid + "").val(jsjs.toFixed(2));
            }
        }
        else {
            $("#" + jsid + "").val(jsjs);
        }       

        lineTotal = numFormat(lineTotal, 2);
        $("#" + hszjid + "").val(lineTotal);
    }
    else if (n == 34) {
        if (document.all(id) != null) {
            var value = $("#" + id + "").val();
            if (value.replace(/[ ]/g, "") == "") {
                //alert("请输入内容！");
                //  $("#" + id + "").focus();
                return;
            }
            else if (isNaN(value)) {
                //再判断必须是数字
                alert("请输入数字！");
                // $("#" + id + "").focus();
                return;
            }
        }
        var arr = id.split('-');
        var m1 = parseInt(arr[1]) - 1;
        var id1 = arr[0] + "-" + m1;

        //写入的列id
        var m2 = parseInt(arr[1]) + 1;
        var id2 = arr[0] + "-" + m2;

        var val1 = $("#" + id1 + "").val();
        if (val1.length == 0 || value.length == 0) {
            $("#" + id2 + "").val("");
        }
        else {
            var NewVal = parseFloat(val1) * parseFloat(value);           

            $("#" + id2 + "").val(NewVal);
        }
    }
        //2016- 添加合计
    else if (n == 999) {
        //计算该列的合计并验证为数字
        //先判断不能为空

        if (document.all(id) != null) {
            var value = $("#" + id + "").val();
            if (value.replace(/[ ]/g, "") == "") {
                //alert("请输入内容！");
                //$("#" + id + "").focus();
                return;
            }
            else if (isNaN(value)) {
                //再判断必须是数字
                alert("请输入数字！");
                // $("#" + id + "").focus();
                return;
            }
            if (value != "") {
                $("#" + id + "").val(parseFloat(value).toFixed(2));
            }            
        }
    }
    else if (n == 186) {//采购PR单专用
        if (document.all(id) != null) {
            //Bug-00141 修改 梁章云  2016年8月11日 Start
            var value = 0;
            var arr = id.split('-');
            if (id.indexOf("12") > -1) {
                value = $("#" + id + "").val();
            }
            else {
                var djid = arr[0] + "-12";
                value = $("#" + djid + "").val();
            }

            value = value.replace(/\,/g, "");
            if (value.replace(/[ ]/g, "") == "") {
                //alert("请输入内容！");
                //  $("#" + id + "").focus();
                return;
            }
            else if (isNaN(value)) {
                //再判断必须是数字
                alert("请输入数字！");
                // $("#" + id + "").focus();
                return;
            }
        }
        var arr = id.split('-');
        var newVal = numFormat(value, 2);
        $("#" + id + "").val(newVal);

        var hl = 22;
        var hlid = arr[0] + "-" + hl;//汇率所在ID
        var rate = $("#" + hlid + "").val();

        var sl = 8;
        var slid = arr[0] + "-" + sl;//数量所在ID
        var quantity = $("#" + slid + "").val();

        var hsdj = 14;
        var hsdjid = arr[0] + "-" + hsdj;//不含税总价所在ID
        var lineTotal = parseFloat(value) * parseFloat(quantity);
        if (isNaN(lineTotal)) {
            lineTotal = 0;
        }
        lineTotal = numFormat(lineTotal, 2);
        $("#" + hsdjid + "").val(lineTotal);

        var rmbLinetotal = parseFloat(value) * parseFloat(quantity) * parseFloat(rate);
        var rmbzj = 23;
        var rmbzjid = arr[0] + "-" + rmbzj;//人民币总价所在ID
        $("#" + rmbzjid + "").val(rmbLinetotal.toFixed(2));

        CountTotal();
        //Bug-00141 修改 梁章云  2016年8月11日 End
    }
    else if (n == 187) {
        if (document.all(id) != null) {
            var value = $("#" + id + "").val();
            if (value.replace(/[ ]/g, "") == "") {
                alert("请输入内容！");
                $("#" + id + "").focus();
                return;
            }
            else if (isNaN(value)) {
                //再判断必须是数字
                alert("请输入数字！");
                $("#" + id + "").focus();
                return;
            }
        }
        var arr = id.split('-');
        var sl = 8;
        var slid = arr[0] + "-" + sl;//数量所在ID
        var slval = parseFloat($("#" + slid + "").val());

        var ydhsl = 14;
        var ydhslid = arr[0] + "-" + ydhsl;//已到货数量所在ID
        var ydhslval = parseFloat($("#" + ydhslid + "").val());

        var bcdhsl = 15;
        var bcdhslid = arr[0] + "-" + bcdhsl;//本次到货数量所在ID
        var bcdhslval = parseFloat($("#" + bcdhslid + "").val());

        if ((bcdhslval + ydhslval) > slval) {
            alert("本次到货数量和已到货数量和应小于总数量！");
            $("#" + id + "").focus();
            return;
        }

        // CountTotal();
    }
    else if (n == 197) {
        if (document.all(id) != null) {
            var value = $("#" + id + "").val();
            if (value.replace(/[ ]/g, "") == "") {
                //alert("请输入内容！");
                //  $("#" + id + "").focus();
                return;
            }
            else if (isNaN(value)) {
                //再判断必须是数字
                alert("请输入数字！");
                // $("#" + id + "").focus();
                return;
            }
        }
        var arr = id.split('-');
        var m1 = 8;
        var id1 = arr[0] + "-" + m1;//数量所在ID
        //写入的列id
        var m2 = 14;
        var id2 = arr[0] + "-" + m2;//总价所在ID

        var val1 = $("#" + id1 + "").val();
        if (val1.length == 0 || value.length == 0) {
            $("#" + id2 + "").val("");
        }
        else {
            var NewVal = parseFloat(val1) * parseFloat(value);

            $("#" + id2 + "").val(NewVal.toFixed(2));
            //合计总额列的值
            var hjID = "td_" + m2;

            //获取合计的值
            var total = 0;
            var hjje = $("#" + hjID + "").html();
            hjje = hjje.replace(/\,/g, "");
            if (hjje.length > 0) {
                total += parseFloat(hjje);
            }
            if (beforTotalValue.length == 0) {
                total += parseFloat(NewVal.toFixed(2));
            }
            else {
                total = parseFloat(total) - parseFloat(beforTotalValue) + parseFloat(NewVal);
            }

            //写入合计
            var newVal = numFormat(total, 2);
            $("#" + hjID + "").html(newVal);
            $("#hidTotal").val(newVal);
            $('#RMBZE-M-BT', parent.document).val(newVal);
            //$("#" + hjID + "").html(total.toFixed(2));
            //$("#hidTotal").val(total.toFixed(2));
            //$('#RMBZE-M-BT', parent.document).val(total.toFixed(2));
        }
    }

    else if (n == 198) {

        //计算该列的合计并验证为数字
        //先判断不能为空
        if (document.all(id) != null) {
            var value = $("#" + id + "").val();
            if (value.replace(/[ ]/g, "") == "") {
                //alert("请输入内容！");
                //$("#" + id + "").focus();
                return;
            }
            else if (isNaN(value)) {
                //再判断必须是数字
                alert("请输入数字！");
                $("#" + id + "").val(beforTotalValue);
                // $("#" + id + "").focus();
                return;
            }

            var arr = id.split("-");
            //获取存储合计列的td的id
            var hjID = "td_" + arr[1].toString();
            //获取合计的值
            var custom = 0;
            var hjje = $("#" + hjID + "").html();
            hjje = hjje.replace(/\,/g, "");
            if (hjje.length > 0) {
                custom += parseFloat(hjje);
            }

            if (beforTotalValue.length == 0) {
                custom += parseFloat(value);
            }
            else {
                custom = parseFloat(custom) - parseFloat(beforTotalValue) + parseFloat(value);
            }

            //写入合计
            //写入合计
            var newVal = numFormat(total, 2);
            $("#" + hjID + "").html(newVal);
            $("#hidTotal").val(newVal);
            $('#RMBZE-M-BT', parent.document).val(newVal);
        }
    }
    else if (n == 199) {
        //验证不能为空
        //获取当前控件的值
        if (document.all(id) != null) {
            var value = $("#" + id + "").val();
            if (value.replace(/[ ]/g, "") == "") {
                alert("请输入内容！");
                //$("#" + id + "").focus();
                return;
            }
            else {
                //验证为数字
                if (document.all(id) != null) {
                    //获取当前控件的值
                    var value = $("#" + id + "").val();
                    value = value.replace(/\,/g, "");
                    if (isNaN(value)) {
                        alert("请输入数字！");
                        $("#" + id + "").focus();
                        return;
                    }
                    else {
                        if (Number(value) < 0) {
                            alert("退款金额不能为负！");
                            $("#" + id + "").focus();
                            return;
                        } else if (Number(value) > 0) {
                            var arr = id.split("-");
                            //获取存储合计列的td的id
                            var payId = arr[0].toString() + "-5";
                            var refundId = arr[0].toString() + "-8";
                            var payMoney = $("#" + payId + "").val();
                            var refundMoney = $("#" + refundId + "").val();
                            if (!isNaN(payMoney)) {
                                if (Number(refundMoney) == 0) {
                                    if (Number(value) > Number(payMoney)) {
                                        alert("本次退款金额不能大于付款金额！");
                                        $("#" + id + "").focus();
                                        return;
                                    }
                                } else {
                                    if (Number(value) > (Number(payMoney) - Number(refundMoney))) {
                                        alert("总退款金额不能大于付款金额！");
                                        $("#" + id + "").focus();
                                        return;
                                    }
                                }
                            }

                        }
                    }
                    var moneycount = parseFloat(value).toFixed(2);
                    moneycount = numFormat(moneycount, 2);
                    $("#" + id + "").val(moneycount);
                }
            }
        }
    }
    else if (n == 286) {
        if (document.all(id) != null) {
            var value = $("#" + id + "").val();
            value = value.replace(/\,/g, "");
            if (value.replace(/[ ]/g, "") == "") {
                $("#" + id + "").val(0);
            }
            else if (isNaN(value)) {
                //再判断必须是数字
                alert("请输入数字！");
                $("#" + id + "").val(0);
            }
        }
        CountTotal();
    }
    else if (n == 5) {
        //金额格式化
        if (document.all(id) != null) {
            var value = $("#" + id + "").val();
            var arr = value.split(",");
            var val = "";
            for (var i = 0; i < arr.length; i++) {
                val += arr[i].toString();
            }
            value = $.trim(val);
            if (value.replace(/[ ]/g, "") == "") {
                //alert("请输入内容！");
                //$("#" + id + "").focus();
                return;
            }
            else if (isNaN(value)) {
                //再判断必须是数字
                alert("请输入数字！");
                $("#" + id + "").val(beforTotalValue);
                // $("#" + id + "").focus();
                return;
            }

            var newvalue = numFormat(value, 2);
            $("#" + id + "").val(newvalue)
        }
    }
}
//格式化数字例如  123,456.78
function numFormat(value, length) {
    var float = 0;
    if (parseInt(length) > 0) {
        float = parseFloat(value).toFixed(parseInt(length)).toString().split(".");
        value = float[0].toString();
    }
    else {
        value = parseInt(value);
    }

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
    if (parseInt(length) > 0) {
        value = value + "." + float[1].toString();
    }
    else {
        value = value
    }
    return value;
}

//验证整数
function checkNunmb(e, num) {

    //
    var val = $(e).val();
    var r = val.match(/[^\d]/g);
    if (r != null) {
        alert("请输入整数！");
        $(e).val("");
        $(e).focus();
    }

    if (num != 0) {
        var idbox = new Array();
        var box = new Array;
        box = String(num).split("");
        idh = e.id.split("-")[0];
        for (var i = 1; i <= box.length; i++) {
            if (box[i] == 0) {
                box[i - 1] = box[i - 1] + "0";
            }
        }
        for (var i = 0; i <= box.length; i++) {
            if (box[i] != 0 && box[i] != null) {
                idbox.push(box[i]);
            }
        }
        beforTotalValue = $("#" + idh + "-" + String(idbox[2])).val();
        $("#" + idh + "-" + String(idbox[2])).val(Number($("#" + idh + "-" + String(idbox[0])).val()) * Number($("#" + idh + "-" + String(idbox[1])).val()));
        $("#" + idh + "-" + String(idbox[2])).blur();
        // $("#" + idh + "-" + String(idbox[2])).focusin();
        $("#" + idh + "-" + String(idbox[2])).focusout();
    }
    //    val.value = val.value.replace(/(\.\d{2})\d*$/, '\$1');

}

//验证金额
function checkMoney(e, num) {

    var val = $("#" + e.id + "").val();

    val = val.replace(/\,/g, "");

    var r = val.match(/[^\d\.]/g);
    if (r != null) {
        alert("请输入数字！");
        //$("#" + e.id + "").val("");
    } else {

        if (val == ".") {
            //$("#" + e.id + "").val("");
        }
        if (val != "") {
            var moneycount = parseFloat(val).toFixed(2);
            moneycount = numFormat(moneycount, 2);
            $("#" + e.id + "").val(moneycount);
        }
    }
    if (num != 0) {
        var idbox = new Array();
        var box = new Array;
        box = String(num).split("");
        idh = e.id.split("-")[0];
        for (var i = 1; i <= box.length; i++) {
            if (box[i] == 0) {
                box[i - 1] = box[i - 1] + "0";
            }
        }
        for (var i = 0; i <= box.length; i++) {
            if (box[i] != 0 && box[i] != null) {
                idbox.push(box[i]);
            }
        }
        beforTotalValue = $("#" + idh + "-" + String(idbox[2])).val();
        $("#" + idh + "-" + String(idbox[2])).val(Number($("#" + idh + "-" + String(idbox[0])).val()) * Number($("#" + idh + "-" + String(idbox[1])).val()));
        $("#" + idh + "-" + String(idbox[2])).blur();
        //$("#" + idh + "-" + String(idbox[2])).focusin();
        $("#" + idh + "-" + String(idbox[2])).focusout();
    }
}

//获取URL参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

//获取父级URL参数
function getParentUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.top.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}


//弹出页，新增后，修改当前页,addLen添加的长度信息
function AddRowTableModify(addLen) {
    
}

//删除行
function ShanChu() {
    var checkBoxObj = $("input[name='custom_name']");
    //存储删除的行ID
    var trGuids = "";
    var trId = "";
    for (var i = 0; i < checkBoxObj.length; i++) {
        //if ($(checkBoxObj[i]).attr("checked") == "checked") {
        if ($(checkBoxObj[i])[0].checked) {
            trId = $("#" + checkBoxObj[i].id + "-0").val();
            trGuids = trGuids + "'" + trId + "',"
        }
    }

    if (trGuids == "") {
        $.MsgBox.Alert("提示", "请选择要删除的数据!");
        return;
    }
    if (confirm("您确定要删除选中的信息吗？")) {
        trGuids = trGuids.substring(0, trGuids.length - 1);

        var jsonTableList = JSON.stringify(customTableList);
        $.post(virtualName + "/customTable/handler/TableInfoHandler.ashx", { type: "DeleteInfoByGuids", jsonArray: jsonArray, Guids: trGuids },
        function (data) {
            if (data == "OK") {
                delCustomTableRow();
                $.MsgBox.Alert("提示", "删除成功!");
            }
            else {
                $.MsgBox.Alert("提示", "删除失败!");
            }
        });
    } else {
        return;
    }


}

//加载用户基本信息
function loadUserInfoSelf(func) {
    $.ajax({
        type: "POST",
        url: "/Web/handler/UserInfoHandler.ashx",
        data: { fun: "LoadUserInfoForZD" },
        async: false,
        success: function (data) { func(data); }
    });
}

//查询
function SearchInfoByFilter() {
    //收集搜索条件
    var strSave = "";

    $(".divOther").each(function () {
        //获取需要拼接控件的div的id
        var this_id = $(this).attr("id");
        var this_operation = $(this).attr("operation");
        if (!this_operation) {
            this_operation = 'like';
        }
        //id不能为空
        if (this_id != undefined) {
            var tdid = this_id;
            tdtype = tdid.split("-")[2]; //控件类型
            isBT = tdid.split("-")[3]; //是否必填
            controlID = tdid.substring(3);

            if (tdid.split("_")[1] != "title" && isBT != "ZD") {
                if (tdtype == "N" || tdtype == "S" || tdtype == "L" || tdtype == "T" || tdtype == "M" || tdtype == "E") {
                    var ty = document.getElementById(controlID);
                    if (ty != null) {
                        strvalue = $("#" + controlID + "").val();
                        controlID = controlID.split("-")[0];
                        strSave += controlID + "^" + changeStrValue(strvalue) + "^" + this_operation + "|";
                    }
                } else if (tdtype == "A") {
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

                        strSave += controlID + "^" + changeStrValue(strvalue) + "^" + this_operation + "|";
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
                    strSave += controlID + "^" + changeStrValue(strvalue) + "^" + this_operation + "|";
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
                    strSave += controlID + "^" + strSave_C + "^" + this_operation + "|";
                }
                else if (tdtype == "H") {//html保存数据
                    var ty1 = document.getElementById(controlID);
                    if (ty1 != null) {
                        strvalue = $.trim($("#" + controlID + "").html()).replace(/[\r\n]/g, "");
                        controlID = controlID.split("-")[0];
                        strSave += controlID + "^" + changeStrValue(strvalue) + "^" + this_operation + "|";
                    }
                }
            }
        }
    });

    loadCustomTableZD(strSave);
}

//更改strvalue值,非数值，添加数值验证操作
function changeStrValue(strvalue) {
    if (tdtype != 'N' && tdtype != 'M') {
        strvalue = '\'' + strvalue + '\'';
    }
    return strvalue;
}

//明细行中上传附件
function customAttach(selfTr) {
    var url = "/Web/Form/ContactSingleDHTC/ContactSinglePage/CheckPage.htm?SingleSelect=true"; //只允许单行选择
    var setStr = "dialogWidth:535px;dialogHeight:450px;scroll:no;status:no";
    var val = showModalDialog(url, "true", setStr);
    if (!val) {
        return;
    }
    else {
        GetTableList(); //重新保存数据源
        //添加多行数据
        var arr = val[0];
        var rowindex = selfTr.attr("id").split('-')[0]; //修改行ID
        var row = customTableList[rowindex]; //修改行内容
        for (var i = 0; i < val.length; i++) {
            arr = val[i].split("^");

            row[3] = arr[0].toString();
            row[4] = arr[1].toString();
            row[5] = arr[2].toString();
            row[6] = arr[3].toString();
            row[7] = arr[4].toString();

        }
        getPageCustomTable(curPage); //刷新当前页
    }
}

//明细行中上传附件
function customAttachNew(selfTr) {
    var rowIndex = selfTr.id.toString().split('-')[0]; //修改行ID
    var row = customTableList[rowIndex]; //修改行内容

    var guid;
    if (row[0].toString().length == 0) {
        //新生成guid
        $.ajax({
            type: "POST",
            url: virtualName + "/customTable/handler/TableInfoHandler.ashx",
            data: { type: "GetGuid" },
            async: false,
            success: function (data) {
                guid = data;
            }
        });
    }
    else {
        //判断row[0]中是否有|S，有则去除掉
        if (row[0].toString().indexOf("|S") > -1) {
            guid = row[0].toString().substr(0, row[0].length - 2);
        }
        else {
            guid = row[0].toString();
        }
    }
    var status = "0";
    var type = getUrlParam("type");
    var prcStu = getUrlParam("prcStu");
    if (type != null && type.toString().length > 1) {
        if (type == "SQ") {
            status = "1";
        }
        else if (type == "PRSQ") {
            status = "1";
        }
    }
    //判断如果是打开的已申请或已办中的页面时，则不能修改附件
    if (prcStu != null && prcStu.toString().length > 0) {
        if (prcStu != "1") {
            status = "0";
        }
    }

    var url = "/Web/Form/PurchaseOrderApply/PurchaseOrderApplyPage/PurchaseOrderApplyAttach.aspx?guid=" + guid + "&status=" + status; //
    var setStr = "dialogWidth:1000px;dialogHeight:450px;scroll:yes;status:no;overflow-x:hidden";
    var val = showModalDialog(url, "true", setStr);
    if (typeof (val) == "undefined") {
        return;
    }
    if (val == "true") {
        GetTableList(); //重新保存数据源
        //上传了附件
        //给当前行guid列赋值，同时标示该guid为新增行非更新(|S代表新增)
        if (type == "SQ") {
            customTableList[rowIndex][0] = guid + "|S";
        }
    }
    else {
        if (type == "SQ") {
            customTableList[rowIndex][0] = "";
        }
    }

    //重新加载多行
    getPageCustomTable(curPage);
}

//判断某些物料类别是否符合上传附件规定
function checkAttach(WLBM) {
    var result = true;
    var n = getColumByType("Attach");
    var m = getColumByTitle("物料编码");
    var arr = WLBM.split(",");
    for (var i = 0; i < customTableList.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            if (customTableList[i].indexOf(arr[j]) > -1) {
                var id = "td_" + i + "-" + n;
                if ($("#" + id + "").html().indexOf("查看") < 0) {
                    alert("请上传需求论证表或项目SOW,第" + parseInt(i + 1) + "行,物料编码：" + customTableList[i][m]);
                    result = false;
                    return result;
                }
            }
        }
    }

    return result;
}

//根据类型获取第几列，只适用于附件
function getColumByType(type) {
    var result;
    if (type.length > 0) {
        //循环列找到合计的列 
        var array = eval(jsonArray);
        var colums = eval(array[0]["colum"]);
        for (var m = 0; m < colums.length; m++) {
            var nType = colums[m]["type"] == null ? "" : colums[m]["type"].toString();
            if (type == nType) {
                result = m;
                break;
            }
        }
    }
    return result;
}

//根据title获取第几列
function getColumByTitle(title) {
    var result;
    if (title.length > 0) {
        //循环列找到合计的列 
        var array = eval(jsonArray);
        var colums = eval(array[0]["colum"]);
        for (var m = 0; m < colums.length; m++) {
            var nTitle = colums[m]["title"] == null ? "" : colums[m]["title"].toString();
            if (title == nTitle) {
                result = m;
                break;
            }
        }
    }
    return result;
}


//多行导出到excel  开发：郝垟，但是有问题找刘丽雷都可以！
function expCustomTableRow() {
    //var guid = $("#guid").val();
    var json = eval(jsonArray);
    var columList = json[0].colum;
    //if (sql == 1) {//sql==1为申请页面
    //    saveCustomData(guid);
    //}

    setTimeout(function () {
        if (customTableList.length > 0) {

            var strSql = "select ";
            for (var i = 0; i < columList.length; i++) {
                if (columList[i].title != "序号" && columList[i].display == "true") {
                    strSql += columList[i].sqlName + " as " + columList[i].title + ",";
                }
            }
            strSql = strSql.substring(0, strSql.length - 1);
            strSql += " from " + json[0].saveTable;
            strSql += " where parentguid='" + guid + "'"
            window.open("/Web/customTable/page/ToExcel.aspx?strSql=" + strSql + "&fileName" + expFileName);
        } else {
            alert("明细行内无数据，无法导出！");
        }
    }, 0);
}

//删除明细行
function deleteDetailInfo(obj) {
    if (confirm("确认删除该条数据？")) {
        var div = $(obj).parent().parent();
        var divId = $(div).attr("id");

        var arr = divId.split("_");
        var index = arr[1];
        customTableList.splice(index, 1);
        getCustomTable();
    }
}

//显示隐藏明细行信息
function showDetailInfo(obj) {    
    var div = $(obj).parent().parent();
    var divId = $(div).attr("id");
    $("#divDetail .editDiv").each(function (i, n) {
        var pDiv = $(n).parent();
        var pDivId = $(pDiv).attr("id");

        if (pDivId == divId) {
            if ($(n).is(":hidden")) {
                $(n).show();
            }
            else {
                $(n).hide();
            }
        }
        else {
            $(n).hide();
        }
    });
}


//防止键盘遮挡输入框
function setTableScroll() {
    $("#divDetail input[type='text'],#divDetail input[type='number'],#divDetail input[type='tel'],#divDetail textarea").focus(function () {
        var top = $(this).offset().top;
        var cTop = $(".content").offset().top;
        var scTop = $(".content").scrollTop();
        var setTop = top - cTop + scTop - 5;
        $(".content").animate({ scrollTop: setTop }, 500);
    });
}