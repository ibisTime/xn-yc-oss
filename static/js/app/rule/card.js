$(function() {


    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '单号'
    }, {
        field: 'amount',
        title: '橙券面值',
        formatter: moneyFormat
    }, {
        field: 'cnyPrice',
        title: '人民币价格',
        formatter: moneyFormat
    }, {
        field: 'status',
        title: '状态',
        search: true,
        type: 'select',
        formatter: Dict.getNameForList('coupon_status'),
        key: 'coupon_status'
    }, {
        title: '是否归档',
        field: "archive",
        type: "select",
        data: {
            "1": "已归档",
            "0": "未归档"
        }
    }, {
        field: 'scannerMobile',
        title: '使用者手机号',
        search: true
    }, {
        field: 'receiver',
        title: '收款人'
    }, {
        field: 'remark',
        title: '用途说明'
    }];

    buildList({
        columns: columns,
        pageCode: "805330",
        searchParams: {
            companyCode: OSS.company
        },
        singleSelect: false
    });
    //作废
    $('#cancelBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        var dataCode = []

        for (var i = 0; i < selRecords.length; i++) {
            dataCode.push(selRecords[i].code)

            if (selRecords[i].status != 0) {
                toastr.info(selRecords[i].code + "状态不能作废!");
                return;
            }
        }
        confirm("确定作废该卡券？").then(function() {
            reqApi({
                code: '805322',
                json: {
                    codeList: dataCode
                }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });

        });
    });
    var qrcode = new QRCode('qrcode');

    function savePic(code) {
        var img = $("#qrcode").find('img')[0];
        var alink = document.createElement("a");
        alink.href = img.src;
        alink.download = code + ".jpg";
        alink.click();
    }
    //下载二维码
    $('#downloadBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords.length > 1) {
            toastr.info("请选择一条记录");
            return;
        }
        var code = selRecords[0].code;
        qrcode.clear();
        qrcode.makeCode(OSS.domain + '/user/rechargeCard.htm?code=' + code);
        setTimeout(function() {
            savePic(code);
        }, 1);
    });

    //归档 
    $('#guiDangBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].archive == 1) {
            toastr.warning("该记录已经归档");
            return;
        }
        var dataCode = []

        for (var i = 0; i < selRecords.length; i++) {
            dataCode.push(selRecords[i].code)
        }

        confirm("确认归档？").then(function() {
            reqApi({
                code: '805323',
                json: {
                    "codeList": dataCode,
                    "updater": sessionStorage.getItem('userName')
                }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });

    });
})