$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        title: '数量',
        field: 'fromAmount',
        formatter: moneyFormat,
         readonly:view,
    }, {
        field: "toAmount",
        title: "价格",
        formatter: moneyFormat,
         readonly:view,
    }, {
            field: 'toUserId',
            title: '运营商',
            readonly:view,
            type: 'select',
            pageCode: "805054",
            params: {
                kind: '05',
                updater: ''
            },
            keyName: 'userId',
            valueName: 'mobile',
            searchName: 'mobile'
        },
        {
            field: 'receiver',
            title: '收款人',
            type: 'select',
             readonly:view,
            pageCode: "805054",
            params: {
                kind: "01",
                updater: ''
            },
            keyName: 'loginName',
            valueName: 'loginName',
            searchName: 'loginName',
        },{
            title: '状态',
            field: "status",
            type: 'select',
            data: {
                "1": "已发放",
                // "0": "待支付"
            },
        // search: true
        // key: "card_status",
        // formatter: Dict.getNameForList("card_status"),
        // search:true
    },  {
            title: "是否归档",
            field: "isFiled",
            type: "select",
            data: {
                "1": "已归档",
                "0": "未归档"
            }
         }, {
            title: '创建时间',
            field: 'createDatetime',
            readonly:view,
            formatter: dateTimeFormat
        },{
            field: 'remark',
            title: '用途说明',
             readonly:view,
            maxlength: 255
        },
        
    ];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: "802416",
       
    });


});