$(function() {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '订单编号',
    }, {
        field: 'status',
        title: '订单状态',
        type: "select",
        key: "order_status",
        keyCode: '808907',
        formatter: Dict.getNameForList("order_status", "808907"),
        search: true,
    }, {
        field: 'amount1',
        title: '人民币总额',
        formatter: moneyFormat,
    }, {
        field: 'amount2',
        title: '售价（橙券）总额',
        formatter: moneyFormat,
    }, {
        field: 'applyUser',
        title: '下单用户',
        formatter: function(v, data) {
            return data.user.mobile;
        }

    }, {
        field: 'applyDatetime',
        title: '下单时间',
        type: "datetime",
        field1: 'dateStart',
        title1: '下单时间起',
        type1: "date",
        field2: 'dateEnd',
        title2: '下单时间止',
        type2: "date",
        search: true,
        formatter: dateTimeFormat
    }, {
        field: 'remark',
        title: '备注',
    }];

    buildList({
        columns: columns,
        pageCode: '808065',
        searchParams: {
            toUser: OSS.SYS_USER,
            companyCode: OSS.company,
            type:"3"
        }
    });


     //配送
    $('#disBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
           reqApi({
                code: '',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        
    });
   

//取消
    $('#cancelBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status != 2 && selRecords[0].status != 3) {
            toastr.info("当前订单状态不能取消订单!");
            return;
        }
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"></ul>' +
                '</form>'
        });

        dw.showModal();
        buildDetail({
            fields: [{
                field: 'remark',
                title: '取消原因',
            }],
            container: $('#formContainer'),
            buttons: [{
                title: '关闭',
                handler: function() {
                    dw.close().remove();
                }
            }, {
                title: '取消订单',
                handler: function() {

                    if ($('#popForm').valid()) {

                        var data = $('#popForm').serializeObject();
                        data.codeList = [selRecords[0].code];
                        reqApi({
                            code: '808056',
                            json: data
                        }).done(function(data) {
                            toastr.success("操作成功");
                            setTimeout(function() {
                                location.reload();
                                dw.close().remove();
                            }, 2000)
                        });
                    }
                }
            }]
        });
        dw.__center();


    });
    //确认收货
    // $('#confirmOrderBtn').click(function() {
    //     var selRecords = $('#tableList').bootstrapTable('getSelections');
    //     if (selRecords.length <= 0) {
    //         toastr.info("请选择记录");
    //         return;
    //     }

    //     if (selRecords[0].status != 3) {
    //         toastr.info("当前订单状态不能确认收货!");
    //         return;
    //     }

    //     confirm("确认收货？").then(function() {
    //         reqApi({
    //             code: '808057',
    //             json: { "code": selRecords[0].code }
    //         }).then(function() {
    //             toastr.info("操作成功");
    //             $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
    //         });
    //     }, function() {});

    // });
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

});