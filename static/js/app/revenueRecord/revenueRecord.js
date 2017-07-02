$(function() {
    var code = getQueryString('code');
    var payType = getQueryString('payType') || "";

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "店铺名称",
        field: "storeCode2",
        formatter: function(v, data) {
            return data.store.name;
        }
    }, {
        title: "店铺名称",
        field: "name",
        search: true,
        visible: false
    }, {
        field: 'price',
        title: '消费金额',
        formatter: moneyFormat
    }, {
        field: 'backAmount',
        title: '返现金额',
        formatter: moneyFormat
    }, {
        field: 'backCurrency',
        title: '返现币种',
        key: 'currency',
        keyCode: "802006",
        formatter: Dict.getNameForList("currency", '802006'),
    }, {
        field: 'payType',
        title: '买单方式',
        key: 'store_pay_type',
        type: "select",
        search: true,
        keyCode: "808907",
        formatter: Dict.getNameForList("store_pay_type", '808907'),
    }, 
    // {
    //     field: 'payAmount',
    //     title: '支付人民币',
    //     formatter: moneyFormat
    // }, 
    {
        field: 'status',
        title: '状态',
        type: 'select',
        key: "store_purchase_status",
        keyCode: '808907',
        formatter: Dict.getNameForList("store_purchase_status", "808907"),
        search: true,
    }, {
        field: 'createDatetime',
        title: '创建时间',
        formatter: dateTimeFormat,
    }, {
        title: '是否归档',
        field: "isFiled",
        type: "select",
        data: {
            "1": "已归档",
            "0": "未归档"
        }
    }, {
        field: 'remark',
        title: '备注'
    }];

    buildList({
        columns: columns,
        pageCode: '808245',
        searchParams: {
            storeCode: code,
            status: '1',
            payType: payType,
            companyCode: OSS.company
        }
    });
    //归档
    $('#guiDangBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].isField == 1) {
            toastr.info("该记录已经归档");
            return;
        }

        confirm("确认归档？").then(function() {
            reqApi({
                code: '808249',
                json: {
                    "code": selRecords[0].code
                }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });

    });
});