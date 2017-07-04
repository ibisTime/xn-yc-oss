$(function() {

    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
            field: 'kind',
            type: 'hidden',
            value: '1'
        },
        {
            title: "配送计划信息",
            type: "title"
        },
        {
            field: 'name',
            title: '商品名称',
            formatter: function(v, data) {
                return data.productName
            },
            readonly: view,
        }, {
            field: 'priceP1',
            title: '人民币价格',
            formatter: function(v, data) {
                return moneyFormat(data.product.price1);
            },
            readonly: view,
        }, {
            field: 'priceP2',
            title: '橙券价格',
            formatter: function(v, data) {
                return moneyFormat(data.product.price2);
            },
            readonly: view,
        },
        // {
        //     field: 'price111',
        //     title: '库存量',
        //     formatter: function(v, data) {
        //         return data.productSpecs.quantity;
        //     },
        //     readonly: view,
        // }, 
        {
            title: "订单信息",
            type: "title"
        }, {
            title: '规格名称',
            field: "productSpecsName",
            // formatter: function(v, data) {
            //     return data.productSpecs.name;
            // },
            readonly: view,
        }, {
            field: 'price1',
            title: '人民币价格',
            // formatter: function(v, data) {
            //     return moneyFormat(data.productSpecs.price1);
            // },
            formatter: moneyFormat,
            readonly: view,
        }, {
            field: 'price2',
            title: '橙券价格',
            // formatter: function(v, data) {
            //     return moneyFormat(data.productSpecs.price2);
            // },
            formatter: moneyFormat,
            readonly: view,
        }, {
            field: 'payAmount1',
            title: '支付总额',
            formatter: function(v, data) {
                if (v != 0) {
                    return "人民币：" + moneyFormat(data.payAmount1)
                } else {
                    return "橙券：" + moneyFormat(data.payAmount2)
                }
            },
            readonly: view,
        },
        // {
        //     field: 'price222',
        //     title: '发货地',
        //     formatter: function(v, data) {
        //         return data.productSpecs.province;
        //     },
        //     readonly: view,
        // },
        {
            field: 'status',
            title: '订单状态',
            key: "order_status",
            formatter: Dict.getNameForList("order_status", "808907"),
            readonly: view,
        },
        {
            field: 'applyUser',
            title: '下单用户',
            readonly: view,
            formatter: function(v, data) {
                return data.user.mobile
            }
        },
        {
            field: 'applyNote',
            title: '下单说明',
            readonly: view,
        },
        {
            field: 'applyDatetime',
            title: '下单时间',
            formatter: dateTimeFormat,
            readonly: view,
        },
        {
            field: 'logisticsDate',
            title: '配送时间',
            readonly: view,
            // formatter: dateTimeFormat
        },
        {
            field: 'prompt',
            title: '配送次数',
            formatter: function(v, data) {
                return data.logisticsRemain + "/" + data.logisticsSum
            },
            readonly: view,
        },
        {
            field: 'receiver',
            title: '收货人姓名',
            readonly: view,
        },
        {
            field: 'reMobile',
            title: '收件人电话',
            readonly: view,
        },
        {
            field: 'reAddress',
            title: '收货地址',
            readonly: view,
        },
        {
            field: 'remark',
            title: '备注',
            readonly: view,
        }
    ];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '808066'
    });

});