/*
* 流程名称：销售公司_销售订单流程_罗欣
* 使用步骤：所有步骤申请人
* 用途：
* 编写者：梁章云
* 编写时间：2016年8月15日
* 版本：1.0
*/
var guid;
var mainTotal = "";

//加载明细行
function LoadDetailList(type, prcguid, stu) {
    guid = prcguid;
    //判断是申请还是审批    
    if (type != null && type.toString().length > 1) {
        if (type == "SQ") {//申请            
            if (stu == 3) {                
                loadTableArraySPR();
            } else {
                loadTableArray();
            }
        }
        else if (type == "SPE") {//审批
            if (stu == 3) {
                loadTableArraySPR();
            } else {
                loadTableArraySPE();

            }
        }
        else if (type == "SP") {
            loadTableArraySP();
        }
    }

    loadCustomTable();    
}


//配置项
//属性数组
var jsonArray;
//初始化配置项
function loadTableArray() {
    //自定义表单列属性变量     类型为：Text、DateTime、Select;  js验证格式:0:不验证、 1:数字、2：不为空 （9不能使用，已将其定义为合计标示）
    var tableInfo = [{
        saveTable: "yw_SalesOrderL_EX", //提交时存库的表名称   
        keyName: 4,
        delBtn: "true",
        selSql: "select ROW_NUMBER() over( order by ID asc) as rownum, GUID, ParentGuid, INV_CODE, INV_NAME, INV_STD, TAX_RATE, UNIT,UNIT_CODE, CON_RATE, NUM, PRICE, TOTAL, COUNT, APP_STATUS, ERP_STATUS, ERP_OPINION, WAIVER_APP, WAIVER_OPINION, OUT_STATUS, WAYBILL_NUM,BUS_TYPE from yw_SalesOrderL_EX where ParentGuid='" + guid + "'",
        colum: [//第一列必须为唯一标示列(不能为自增长ID)
            { title: "Guid", sqlName: "Guid", type: "Text", align: "center", display: "false", readOnly: "true", js: "0" },
            { title: "ParentGuid", sqlName: "ParentGuid", type: "Text", align: "center", display: "false", readOnly: "true", js: "0" },
            { title: "序号", sqlName: "rownum", type: "Text", width: "40px", align: "center", display: "false", readOnly: "true", js: "0" },
            { title: "存货编码", sqlName: "INV_CODE", type: "Text", width: "95px", align: "left", display: "true", readOnly: "true", js: "0" },
            { title: "存货名称", sqlName: "INV_NAME", type: "Text", width: "300px", align: "left", display: "false", readOnly: "true", js: "0" },
            { title: "规格型号", sqlName: "INV_STD", width: "200px", type: "Text", align: "left", display: "true", readOnly: "true", js: "0" },
            { title: "税率", sqlName: "TAX_RATE", type: "Text", width: "0px", align: "left", display: "false", readOnly: "true", js: "0" },
            { title: "主计量单位", sqlName: "UNIT", width: "80px", type: "Text", align: "center", display: "true", readOnly: "true", js: "0" },
            { title: "主计量编码", sqlName: "UNIT_CODE", width: "180px", type: "Text", align: "left", display: "false", readOnly: "true", js: "0" },
            { title: "换算率", sqlName: "CON_RATE", type: "Text", align: "right", display: "false", readOnly: "true", js: "0" },
            { title: "数量", sqlName: "NUM", type: "CountF", width: "105px", align: "right", display: "true", readOnly: "false", js: "35", color: "red" },
            { title: "件数", sqlName: "COUNT", type: "Text", align: "right", display: "true", readOnly: "true", js: "0" },
            { title: "含税单价", sqlName: "PRICE", type: "Price", width: "80px", align: "right", display: "true", readOnly: "false", js: "35" },
            { title: "价税合计", sqlName: "TOTAL", type: "Text", align: "right", display: "true", readOnly: "true", js: "35" }

        ]
    }];

    //转成json数组（此写法适用于ie8以上）
    jsonArray = JSON.stringify(tableInfo);
}
//审批时用
//配置项
//属性数组
var jsonArray;
//初始化配置项
function loadTableArraySPE() {
    //自定义表单列属性变量     类型为：Text、DateTime、Select;  js验证格式:0:不验证、 1:数字、2：不为空 （9不能使用，已将其定义为合计标示）
    var tableInfo = [{       
        saveTable: "yw_SalesOrderL_EX", //提交时存库的表名称   
        keyName: 4,
        delBtn: "false",
        selSql: "select ROW_NUMBER() over( order by ID asc) as rownum, GUID, ParentGuid, INV_CODE, INV_NAME, INV_STD, TAX_RATE, UNIT,UNIT_CODE, CON_RATE, NUM, PRICE, TOTAL, COUNT, APP_STATUS, APP_OPINION, ERP_STATUS, ERP_OPINION, WAIVER_APP, WAIVER_OPINION, OUT_STATUS, WAYBILL_NUM,BUS_TYPE from yw_SalesOrderL_EX where ParentGuid='" + guid + "'",
        colum: [//第一列必须为唯一标示列(不能为自增长ID)
            { title: "Guid", sqlName: "Guid", type: "Text", align: "center", display: "false", readOnly: "true", js: "0" },
            { title: "ParentGuid", sqlName: "ParentGuid", type: "Text", align: "center", display: "false", readOnly: "true", js: "0" },
            { title: "序号", sqlName: "rownum", type: "Text", width: "40px", align: "center", display: "false", readOnly: "true", js: "0" },
            { title: "存货编码", sqlName: "INV_CODE", type: "Text", width: "95px", align: "left", display: "true", readOnly: "true", js: "0" },
            { title: "存货名称", sqlName: "INV_NAME", type: "Text", width: "300px", align: "left", display: "true", readOnly: "true", js: "0" },
            { title: "规格型号", sqlName: "INV_STD", width: "200px", type: "Text", align: "left", display: "true", readOnly: "true", js: "0" },
            { title: "税率", sqlName: "TAX_RATE", type: "Text", width: "0px", align: "left", display: "false", readOnly: "true", js: "0" },
            { title: "主计量单位", sqlName: "UNIT", width: "80px", type: "Text", align: "center", display: "true", readOnly: "true", js: "0" },
            { title: "主计量编码", sqlName: "UNIT_CODE", width: "180px", type: "Text", align: "left", display: "false", readOnly: "true", js: "0" },
            { title: "换算率", sqlName: "CON_RATE", type: "Text", align: "right", display: "false", readOnly: "true", js: "0" },
            { title: "数量", sqlName: "NUM", type: "CountF", width: "105px", align: "right", display: "true", readOnly: "true", js: "0" },
            { title: "件数", sqlName: "COUNT", type: "Text", width: "80px", align: "right", display: "true", readOnly: "true", js: "0", isTotal: "float" },
            { title: "含税单价", sqlName: "PRICE", type: "Price", width: "80px", align: "right", display: "true", readOnly: "true", js: "0" },
            { title: "价税合计", sqlName: "TOTAL", type: "Text", width: "80px", align: "right", display: "true", readOnly: "true", js: "0", isTotal: "float" },
            { title: "业务类型", sqlName: "BUS_TYPE", type: "SelectBType", width: "80px", align: "left", display: "true", readOnly: "false", js: "0" },
            { title: "审核结果", sqlName: "APP_STATUS", type: "Select", width: "80px", val: "通过|不通过", align: "center", display: "true", readOnly: "false", js: "0" },
            { title: "审核意见", sqlName: "APP_OPINION", type: "Text", width: "150px", align: "left", display: "true", readOnly: "false", js: "0" }
        ]
    }];

    //转成json数组（此写法适用于ie8以上）
    jsonArray = JSON.stringify(tableInfo);
}

//已申请或已审批用
function loadTableArraySPR() {

    //自定义表单列属性变量     类型为：Text、DateTime、Select;  js验证格式:0:不验证、 1:数字、2：不为空 （9不能使用，已将其定义为合计标示）
    var tableInfo = [{        
        saveTable: "yw_SalesOrderL_EX", //提交时存库的表名称   
        keyName: 4,
        delBtn: "false",
        selSql: "select ROW_NUMBER() over( order by ID asc) as rownum, GUID, ParentGuid, INV_CODE, INV_NAME, INV_STD, TAX_RATE, UNIT,UNIT_CODE, CON_RATE, NUM, PRICE, TOTAL, COUNT, APP_STATUS, APP_OPINION, ERP_STATUS, ERP_OPINION, WAIVER_APP, WAIVER_OPINION, OUT_STATUS, WAYBILL_NUM,BUS_TYPE from yw_SalesOrderL_EX where ParentGuid='" + guid + "'",
        colum: [//第一列必须为唯一标示列(不能为自增长ID)
            { title: "Guid", sqlName: "Guid", type: "Text", align: "center", display: "false", readOnly: "true", js: "0" },
            { title: "ParentGuid", sqlName: "ParentGuid", type: "Text", align: "center", display: "false", readOnly: "true", js: "0" },
            { title: "序号", sqlName: "rownum", type: "Text", width: "40px", align: "center", display: "false", readOnly: "true", js: "0" },
            { title: "存货编码", sqlName: "INV_CODE", type: "Text", width: "95px", align: "left", display: "true", readOnly: "true", js: "0" },
            { title: "存货名称", sqlName: "INV_NAME", type: "Text", width: "300px", align: "left", display: "true", readOnly: "true", js: "0" },
            { title: "规格型号", sqlName: "INV_STD", width: "200px", type: "Text", align: "left", display: "true", readOnly: "true", js: "0" },
            { title: "税率", sqlName: "TAX_RATE", type: "Text", width: "0px", align: "left", display: "false", readOnly: "true", js: "0" },
            { title: "主计量单位", sqlName: "UNIT", width: "80px", type: "Text", align: "center", display: "true", readOnly: "true", js: "0" },
            { title: "主计量编码", sqlName: "UNIT_CODE", width: "180px", type: "Text", align: "center", display: "false", readOnly: "true", js: "0" },
            { title: "换算率", sqlName: "CON_RATE", type: "Text", align: "right", display: "false", readOnly: "true", js: "0" },
            { title: "数量", sqlName: "NUM", type: "CountF", width: "105px", align: "right", display: "true", readOnly: "true", js: "0" },
            { title: "件数", sqlName: "COUNT", type: "Text", width: "100px", align: "center", display: "true", readOnly: "true", js: "0" },
            { title: "含税单价", sqlName: "PRICE", type: "Price", width: "80px", align: "right", display: "true", readOnly: "true", js: "0" },
            { title: "价税合计", sqlName: "TOTAL", type: "Text", width: "80px", align: "right", display: "true", readOnly: "true", js: "0" },
            { title: "业务类型", sqlName: "BUS_TYPE", type: "SelectBType", width: "80px", align: "left", display: "true", readOnly: "true", js: "0" },
            { title: "审核结果", sqlName: "APP_STATUS", type: "Select", width: "100px", val: "通过|不通过", align: "center", display: "true", readOnly: "true", js: "0" },
            { title: "审核意见", sqlName: "APP_OPINION", type: "Text", width: "150px", align: "left", display: "true", readOnly: "true", js: "0" },
            { title: "ERP审核结果", sqlName: "ERP_STATUS", type: "Text", width: "150px", align: "left", display: "true", readOnly: "true", js: "0" },
            { title: "ERP审批意见", sqlName: "ERP_OPINION", type: "Text", width: "150px", align: "left", display: "true", readOnly: "true", js: "0" },
            { title: "ERP弃审状态", sqlName: "WAIVER_APP", type: "Text", width: "150px", align: "left", display: "true", readOnly: "true", js: "0" },
            { title: "ERP弃审意见", sqlName: "WAIVER_OPINION", type: "Text", width: "150px", align: "left", display: "true", readOnly: "true", js: "0" },
            { title: "ERP出库状态", sqlName: "OUT_STATUS", type: "Text", width: "150px", align: "left", display: "true", readOnly: "true", js: "0" },
            { title: "运单号", sqlName: "WAYBILL_NUM", type: "Text", width: "150px", align: "left", display: "true", readOnly: "true", js: "0" }

        ]
    }];

    //转成json数组（此写法适用于ie8以上）
    jsonArray = JSON.stringify(tableInfo);
}

function chooseItem() {
    var url = "/WebMobile/FormSales/SalesOrderL/SalesOrderLPage/CheckInventory.aspx?IframeFun=addChooseItem&rnum=" + Math.random();
    openLayer(url);
}

//添加选中的物料信息
function addChooseItem(data) {
    var arr = data.split("^");
    var row = null;
    GetTableList(); //重新保存数据

    row = ["", "", "", arr[0].toString(), arr[1].toString(), arr[2].toString(), arr[3].toString(), arr[4].toString(), arr[5].toString(), arr[6].toString(), '', '', '', ''];

    customTableList.push(row);

    getCustomTable();
}

//弹出上传附件窗口
function uploadAttach(selfTr) {
    GetTableList(); //重新保存数据源
    var rowIndex = selRow.attr("id").split('-')[0]; //修改行ID
    var row = customTableList[rowIndex]; //修改行内容
    var url = "/Web/Form/ContactSingleDHTC/ContactSinglePage/CheckPage.htm?SingleSelect=true"; //只允许单行选择
    var setStr = "dialogWidth:535px;dialogHeight:500px;scroll:no;status:no";
    var val = showModalDialog(url, "true", setStr);
}


//选择供应商
function chooseSupplier(selRow) {
    try {
        GetTableList(); //重新保存数据源
        var rowIndex = selRow.attr("id").split('-')[0]; //修改行ID
        var row = customTableList[rowIndex]; //修改行内容
        var url = "/Web/Form/PurchaseNeedApply/PurchaseNeedApplyPage/CheckSupplier.aspx?uCode=" + row[3]; //物料编码
        var setStr = "dialogWidth:1000px;dialogHeight:450px;scroll:no;status:no";
        var val = showModalDialog(url, "true", setStr);
        if (!val) {
            return;
        }
        else {

            //添加多行数据
            var arr = val[0];
            //for (var i = 0; i < val.length; i++) {
            arr = val.split("^");
            row[10] = arr[1].toString();//供应商名称
            row[11] = arr[0].toString();//供应商编号

            //}
            getPageCustomTable(curPage); //刷新当前页
        }
    }
    catch (e) {
        alert("加载信息出错!");
    }
}

