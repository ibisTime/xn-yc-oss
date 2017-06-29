$(function() {


    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '单号'
    },{
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
    },{
        field: '',
        title: '使用人'
    },{
        field: 'scannerMobile',
        title: '使用者手机号',
        search: true
    }, {
        field: '',
        title: '收款人'
    },{
        field: '',
        title: '用途说明'
    }];

    buildList({
        columns: columns,
        pageCode: "805330",
        searchParams: {
            companyCode: OSS.company
        },
        singleSelect:false
    });
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
    $('#downloadBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        var code = selRecords[0].code;
        qrcode.clear();
        qrcode.makeCode('http://m.yc.hichengdai.com/user/rechargeCard.html?code=' + code);
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
       
        confirm("确认归档？").then(function() {
            reqApi({
                code: ' ',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });

    });
})