$(function() {
    var code = getQueryString('code');
    var c = getQueryString('c');
    var owner = getQueryString('owner');

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'mobile',
        title: '发放用户',
        formatter: function(v, data) {
            return data.toUser.mobile;
        }
    }, {
        field: 'toAmount',
        title: '发放金额',
        formatter: moneyFormat
    }, {
        field: 'toCurrency',
        title: '币种',
        type: 'select',
        key: 'currency',
        keyCode: "802006",
        formatter: Dict.getNameForList("currency", '802006'),
    }, {
        field: 'createDatetime',
        title: '发放时间',
        formatter: dateTimeFormat,
    }, {
        title: '是否归档',
        field: "isFiled",
        type: "select",
        data: {
            "1": "已归档",
            "0": "未归档"
        }
    }];

    buildList({
        columns: columns,
        pageCode: '802415',
        searchParams: {
            fromUserId: owner,
            fromCurrency: c,
            toCurrency: c,
            status: 1,
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
            toastr.info("该记录已经归档");
            return;
        }
        confirm("确认归档？").then(function() {
            reqApi({
                code: '802418',
                json: {
                    "code": selRecords[0].code,
                    "updater": sessionStorage.getItem('userName')
                }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });

    });

});