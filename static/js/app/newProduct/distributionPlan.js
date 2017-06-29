$(function() {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'name',
        title: '商品名称',
        search: true,
    }, {
        field: 'price',
        title: '售价（RMB/CQ）',
        formatter: function(v,data){
            return   "￥"+moneyFormat(data.price1)+"/"+moneyFormat(data.price2)
        }
    }, 
    // {
    //     field: 'price2',
    //     title: '橙券价',
    //     formatter: moneyFormat,
    // },
    {
        field: 'category',
        title: '大类',
        // search: true,
        type: 'select',
        listCode: '808007',
        params: {
            type: '1',
            parentCode: 0
        },
        keyName: 'code',
        valueName: 'name'
    }, {
        field: 'type',
        title: '小类',
        type: 'select',
        listCode: '808007',
        keyName: 'code',
        valueName: 'name',
    }, 
    // {
    //     field: 'originalPrice',
    //     title: '原价/市场价',
    //     formatter: moneyFormat,
    // },
     {
        field: 'status',
        title: '状态',
        type: "select",
        key: "product_status",
        keyCode: "808907",
        formatter: Dict.getNameForList("product_status", "808907"),
        // search: true
    },  {
        field: 'location',
        title: '位置',
        type: 'select',
        key: "product_location",
        keyCode: '808907',
        formatter: Dict.getNameForList("product_location", "808907"),
        search: true,
    }, {
        field: 'orderNo',
        title: '次序',
    }, {
        field: 'remark',
        title: '备注',
    }];

    buildList({
        columns: columns,
        pageCode: '808025',
        deleteCode: '808011',
        searchParams: {
            companyCode: OSS.company,
            category:"FL2017062716471159133341"
        }
    });
//上架
    $('#up2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 3) {
            toastr.info("已上架");
            return;
        }

        window.location.href = "distributionPlan_up2.html?Code=" + selRecords[0].code;

    });
//下架
   $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 3) {
            toastr.info("还未上架");
            return;
        }
        confirm("确认下架？").then(function() {
            reqApi({
                code: '808014',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });

    });
//修改
    $('#edit2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 3) {
            toastr.info("已上架，不可以修改信息");
            return;
        }

        window.location.href = "distributionPlan_addedit.html?Code=" + selRecords[0].code;
    });
//详情
    $('#detail2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "distributionPlan_addedit.html?Code=" + selRecords[0].code + "&v=1";
    });
//产品参数
    // $('#productParamBtn').click(function() {
    //     var selRecords = $('#tableList').bootstrapTable('getSelections');
    //     if (selRecords.length <= 0) {
    //         toastr.info("请选择记录");
    //         return;
    //     }

    //     window.location.href = "../product/productParam.html?Code=" + selRecords[0].code + "&pName=" + selRecords[0].name;
    // });


});