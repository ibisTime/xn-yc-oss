$(function() {

    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
            field: 'kind',
            type: 'hidden',
            value: '1'
        },
        {
            title: "果树信息",
            type: "title"
        },
        {
            field: 'name',
            title: '果树名称',
            formatter: function(v, data) {
                return data.productName
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
        }, {
            field: 'price111',
            title: '库存量',
            formatter: function(v, data) {
                return data.productSpecs.quantity;
            },
            readonly: view,
        }, {
            title: "订单信息",
            type: "title"
        }, {
            title: '规格名称',
            field: "productSpecs",
            formatter: function(v, data) {
                return data.productSpecs.name;
            },
            readonly: view,
        }, {
            field: 'price11',
            title: '人民币价格',
            formatter: function(v, data) {
                return moneyFormat(data.productSpecs.price1);
            },
            readonly: view,
        }, {
            field: 'price22',
            title: '橙券价格',
            formatter: function(v, data) {
                return moneyFormat(data.productSpecs.price2);
            },
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
        }, {
            field: 'price222',
            title: '发货地',
            formatter: function(v, data) {
                return data.productSpecs.province;
            },
            readonly: view,
        },
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