$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
            title: "店铺名称",
            field: "name",
            readonly: view
                // formatter: function(v, data) {
                //     return data.store.name;
                // }
        }, {
            field: 'price',
            title: '消费金额',
            formatter: moneyFormat,
            readonly: view
        }, {
            field: 'backCurrency',
            title: '返现币种',
            key: 'currency',
            keyCode: "802006",
            formatter: Dict.getNameForList("currency", '802006'),
            readonly: view
        },{
            field: 'backAmount',
            title: '返现金额',
            formatter: moneyFormat,
            readonly: view
        },  {
            field: 'payType',
            title: '买单方式',
            key: 'store_pay_type',
            type: "select",
            search: true,
            keyCode: "808907",
            formatter: Dict.getNameForList("store_pay_type", '808907'),
            readonly: view
        },
        // {
        //     field: 'payAmount',
        //     title: '支付人民币',
        //     formatter: moneyFormat
        // }, 
        {
            field: 'status',
            title: '状态',
            type: 'select',
            key: "store_purchase_status",
            keyCode: '808907',
            formatter: Dict.getNameForList("store_purchase_status", "808907"),
            readonly: view
        }, {
            field: 'createDatetime',
            title: '创建时间',
            formatter: dateTimeFormat,
            readonly: view
        }, {
            title: '是否归档',
            field: "isFiled",
            type: "select",
            data: {
                "1": "已归档",
                "0": "未归档"
            },
            readonly: view
        }, {
            field: 'remark',
            title: '备注',
            readonly: view
        }
    ];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        // addCode: "806040",
        // editCode: "806042",
        detailCode: '808246'
    });

});