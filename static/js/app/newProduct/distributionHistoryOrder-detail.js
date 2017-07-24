$(function() {

    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
            field: 'kind',
            type: 'hidden',
            value: '1'
        },{
            field: 'name',
            title: '商品名称',
            formatter: function(v, data) {
                return data.productName
            },
            readonly: view,
        },{
            title: '规格名称',
            field: "productSpecsName",
            readonly: view,
        },{
            field: 'price1',
            title: '商品价格',
            formatter: function(v, data) {
                if (data.price2 !== 0 &&  v !== "") {
                    return "人民币：" + moneyFormat(data.price1)+";橙券：" + moneyFormat(data.price2)
                } 
            },
            readonly: view,
        }, {
            title: "购买数量",
            field: "quantity",
            readonly: view,
        }, 
        {
            field: 'amount1',
            title: '订单总额',
            formatter: function(v, data) {
                if ( v !== "" && data.amount2 !== 0) {
                    return "人民币：" + moneyFormat(data.amount1)+";橙券：" + moneyFormat(data.amount2)
                } 
            },
            readonly: view,
        },{
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
        {
            field: 'applyUser',
            title: '下单用户',
            readonly: view,
            formatter: function(v, data) {
                return data.user.mobile
            }
        }, {
            field: 'status',
            title: '订单状态',
            key: "order_status",
            formatter: Dict.getNameForList("order_status", "808907"),
            readonly: view,
        }, {
            title: "是否归档",
            field: "isFiled",
            type: "select",
            data: {
                "1": "已归档",
                "0": "未归档"
            },
            readonly: view,
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