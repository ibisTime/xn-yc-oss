$(function() {

    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
            field: 'kind',
            type: 'hidden',
            value: '1'
        },
        // {
        //     field: 'code',
        //     title: '订单编号',
        //     readonly: view,
        //     formatter: function(v, data) {
        //         return data.code
        //     }
        // }, 
        {
            field: 'status',
            title: '订单状态',
            key: "order_status",
            formatter: Dict.getNameForList("order_status", "808907"),
            readonly: view,
        }, {
            field: 'applyUser',
            title: '下单用户',
            readonly: view,
            formatter: function(v, data) {
                return data.user.mobile
            }
        }, {
            field: 'applyNote',
            title: '下单说明',
            readonly: view,
        }, {
            field: 'applyDatetime',
            title: '下单时间',
            formatter: dateTimeFormat,
            readonly: view,
        }, {
            field: 'payAmount1',
            title: '支付总额',
            formatter: function(v, data) {
                if (v != 0) {
                    return moneyFormat(data.payAmount1)
                } else {
                    return moneyFormat(data.payAmount2)
                }
            },
            readonly: view,
        },
        {
            field: 'receiver',
            title: '收货人姓名',
            readonly: view,
        }, {
            field: 'reMobile',
            title: '收件人电话',
            readonly: view,
        }, {
            field: 'reAddress',
            title: '收货地址',
            readonly: view,
        },
        {
            field: 'name',
            title: '商品名称',
            formatter: function(v, data) {
                return data.productName
            },
            readonly: view,
        }, {
            field: 'quantity',
            title: '商品数量',
            formatter: function(v, data) {
                return data.quantity
            },
            readonly: view,
        }, {
            field: 'price1',
            title: '人民币价格',
            formatter: function(v, data) {
                return moneyFormat(data.product.price1);
            },
            readonly: view,
        }, {
            field: 'price2',
            title: '橙券价格',
            formatter: function(v, data) {
                return moneyFormat(data.product.price2);
            },
            readonly: view,
        },
        // {
        //     field: 'product',
        //     title: '商品信息',
        //     type: 'o2m',
        //     columns: [{
        //         field: 'name',
        //         title: '商品名称',
        //         formatter: function(v, data) {
        //             return data.product.productName
        //         }
        //     }, {
        //         field: 'quantity',
        //         title: '商品数量',
        //         formatter: function(v, data) {
        //             return data.quantity
        //         }
        //     }, {
        //         field: 'price1',
        //         title: '人民币价格',
        //         formatter: function(v, data) {
        //             return moneyFormat(data.product.price1);
        //         }
        //     }, {
        //         field: 'price2',
        //         title: '橙券价格',
        //         formatter: function(v, data) {
        //             return moneyFormat(data.product.price2);
        //         }
        //     }]
        // },
        {
            field: 'logisticsCode',
            title: '物流编号',
            readonly: view,
        }, {
            field: 'logisticsCompany',
            title: '物流公司',
            key: "kd_company",
            formatter: Dict.getNameForList("kd_company", "808907"),
            keyCode: "808907",
            readonly: view,
        }, {
            field: 'deliverer',
            title: '发货人',

        }, {
            field: 'deliveryDatetime',
            title: '发货时间',
            formatter: dateTimeFormat,
        }, {
            field: 'pdf',
            title: '物流单',
            type: 'img',
        }, {
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