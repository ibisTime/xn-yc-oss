$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '编号',
        field: 'code',
    }, {
        title: '数量',
        field: 'fromAmount',
        "Z+": true
    }, {
        field: "toAmount",
        title: "价格"
    }, {
        title: '状态',
        field: "status",
        type: 'select',
        key: "card_status",
        formatter: Dict.getNameForList("card_status"),
        // search:true
    }, {
        field: 'toUserId',
        title: '运营商',
        type: 'select',
        pageCode1: "805054",
        params: {
            kind: '05',
            updater: '',
        },
        keyName: 'userId',
        valueName: 'mobile',
        searchName: 'mobile',
        search: true
    }, {
        field: 'receiver',
        title: '收款人',
        type: 'select',
        required: true,
        pageCode1: "805054",
        params: {
            kind: "01",
            updater: '',
            // status:""
        },
        keyName: 'loginName',
        valueName: 'loginName',
        searchName: 'loginName',
        search: true
    }, {
        title: "是否归档",
        field: "isFiled",
        type: "select",
        data: {
            "1": "已归档",
            "0": "未归档"
        }
    }, {
        field: 'remark',
        title: '用途说明',
        maxlength: 255,
        type: "textarea",
        normalArea: true
    }];
    buildList({

        columns: columns,
        pageCode: "802415",
        searchParams: {
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
        if (selRecords[0].isFiled == 1) {
            toastr.warning("该记录已经归档");
            return;
        }
        confirm("确认归档？").then(function() {
            reqApi({
                code: '802418',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });

    });

});