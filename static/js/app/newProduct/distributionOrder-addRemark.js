$(function() {

    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
            field: 'kind',
            type: 'hidden',
            value: '1'
        }, {
            field: 'code1',
            title: '订单编号',
            readonly:view,
            formatter: function(v, data) {
                 $("#code1").text(data.code)    
            }            
        }, {
            title: "商品名称",
            field: "productName",
            readonly:view,
        }
        // , {
        //     title: "商品品种",
        //     field: "productStrain",
        //     readonly:view,
        // }
        , {
            title: "商品规格",
            field: "productSpecsName",
            readonly:view,
        }, {
            field: 'status',
            title: '订单状态',
            type: "select",
            key: "order_status",
            keyCode: '808907',
            readonly:view,
            formatter: Dict.getNameForList("order_status", "808907"),
            search: true,
        }, {
            field: 'payAmount1',
            title: '支付总额',
            readonly:view,
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
            readonly:view,
            // formatter: function(v, data) {
            //     return data.user.mobile;
            // }
        }, {
            field: 'reAddress',
            title: '收件地址',
            readonly:view,
        },{
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
            formatter: dateTimeFormat,
            readonly:view,
        }, {
            field: 'prompt',
            title: '已配送',
            readonly:view,
            formatter: function(v, data) {
                return data.logisticsRemain + "/" + data.logisticsSum
            }
        }, {
            field: 'remark',
            title: '备注',
        }
    ];
    var options = {
        fields: fields,
        code: code,
        detailCode: '808066',
        buttons: {},    
    }

    options.buttons= [{
            title: '确认',
            handler: function() {
                var data = $('#jsForm').serializeObject();
                reqApi({
                code: '808062',
                json: data
                }).then(function() {
                    sucDetail()
                });
             }                
        }, {
            title: '返回',
            handler: function() {
                goBack();
            }
        }]   

    buildDetail(options); 

});