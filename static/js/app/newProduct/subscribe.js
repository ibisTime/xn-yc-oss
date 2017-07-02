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
        field: 'payAmount1',
        title: '支付总额',
        formatter: function(v,data){
           if(v != 0){
            return  moneyFormat(data.payAmount1)
           }else{
            return  moneyFormat(data.payAmount2)
           }
        }
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
    },{
        title:"是否归档",
        field:"isFiled",
        type:"select",
        data:{
            "1":"已归档",
            "0":"未归档"
        }
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
            type:"2"
        }
    });


    $('#sendOutGoodsBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 2) {
            toastr.info("当前订单状态不能发货!");
            return;
        }


        if (selRecords[0].reMobile) { //如果有收货人手机号才能物流发货
            window.location.href = "order-sendOutGood.html?Code=" + selRecords[0].code;
        } else {
            toastr.info("当前订单不是物流发货的订单!");
            return;
        }

    });

    $('#spotDeliveryBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status != 2) {
            toastr.info("当前订单状态不能发货!");
            return;
        }

        if (selRecords[0].reMobile) { //如果有收货人手机号不能现场发货
            toastr.info("当前订单不是现场发货的订单!");
        } else {
            confirm("确认已现场发货？").then(function() {
                reqApi({
                    code: '808055',
                    json: { "code": selRecords[0].code }
                }).then(function() {
                    toastr.info("操作成功");
                    $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                });
            }, function() {});
        }


    });

//取消
    $('#cancleBtn').click(function() {
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
  
   //归档 
    $('#guiDangBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].isFiled == 1) {
            toastr.info("该记录已归档");
            return;
        }
       
        confirm("确认归档？").then(function() {
            reqApi({
                code: '808058',
                json: { "code": selRecords[0].code,
                       "updater": sessionStorage.getItem('userName')
                 }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });

    });
 //兑换
         $('#exchangeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 2) {
            toastr.info("该记录的状态还不可以兑换");
            return;
        }
       
        confirm("确定改订单已经兑换？").then(function() {
                reqApi({
                    code: '808055',
                    json: { "code": selRecords[0].code,
                        "updater": sessionStorage.getItem('userName'),

                     }
                }).then(function() {
                    toastr.info("操作成功");
                    $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                });
            });

    });
 

});