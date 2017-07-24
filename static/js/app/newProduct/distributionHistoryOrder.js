$(function() {
    var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            field: 'code',
            title: '订单编号',
        }, {
            title: "商品名称",
            field: "productName",
            search: true,
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
            formatter: function(v, data) {
                if (v !== 0) {
                    return "人民币：" + moneyFormat(data.payAmount1)
                } else {
                    return "橙券：" + moneyFormat(data.payAmount2)
                }
            }
        },{
            title: '收件人',
            field: 'receiver',
            // formatter: function(v, data) {
            //     return data.user.mobile;
            // }
        }, {
            field: 'reAddress',
            title: '收件地址'
        },{
            field: 'applyDatetime',
            title: '下次配送时间',
            type: "datetime",
            field1: 'dateStart',
            title1: '下次配送时间起',
            type1: "date",
            field2: 'dateEnd',
            title2: '下次配送时间止',
            type2: "date",
            formatter: dateTimeFormat
        }, {
            field: 'prompt',
            title: '已配送',
            formatter: function(v, data) {
                return data.logisticsRemain + "/" + data.logisticsSum
            }
        }, {
            field: 'remark',
            title: '备注',
        }
    ];

    buildList({
        columns: columns,
        pageCode: '808065',
        searchParams: {
            toUser: OSS.SYS_USER,
            companyCode: OSS.company,
            type: "3",
            isFiled: "1",
        }
    });


  // 详情
   
    $('#detailBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "distributionHistoryOrder_detail.html?Code=" + selRecords[0].code +"&v=1";

    });    

});