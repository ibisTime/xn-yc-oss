$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        field: 'mobile',
        title: '发放用户',
        formatter: function(v, data) {
            return data.toUser.mobile
        },
        readonly: view
    }, {
        field: 'toAmount',
        title: '发放金额',
        formatter: moneyFormat,
        readonly: view
    }, {
        field: 'toCurrency',
        title: '币种',
        type: 'select',
        key: 'currency',
        keyCode: "802006",
        formatter: Dict.getNameForList("currency", '802006'),
        readonly: view
    }, {
        title: "收款人",
        field: "receiver",
        readonly: view
    }, {
        field: 'createDatetime',
        title: '发放时间',
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
        title: "备注",
        field: 'remark',
        readonly: view
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        // addCode: "806040",
        // editCode: "806042",
        detailCode: '802416'
    });

});