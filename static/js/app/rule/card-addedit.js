$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');


    var fields = [{
        title: '单号',
        '[value]': 'code',
        readonly: true,
        hidden: !view
    }, {
        title: '橙币面值',
        field: 'amount',
        readonly: !!view,
        required: true,
        amount: true
    }, {
        title: '人民币价格',
        field: 'cnyPrice',
        readonly: !!view,
        required: true,
        amount: true
    }, {
        title: '创建时间',
        field: 'createDatetime',
        readonly: true,
        hidden: !view,
        required: true,
        formatter: dateTimeFormat
    }, {
        title: '使用者手机号',
        field: 'scannerMobile',
        readonly: true,
        hidden: !view
    }, {
        title: '使用/作废时间',
        field: 'scanDatetime',
        readonly: true,
        hidden: !view,
        required: true,
        formatter: dateTimeFormat
    }, {
        field: 'companyCode',
        type: 'hidden',
        value: OSS.company
    }, {
        field: 'useTimes',
        type: 'hidden',
        value: '1'
    }, {
        title: '创建人编号',
        field: "creator",
        value: sessionStorage.getItem('userId'),
        type: "hidden",
        required: true,
    }];

    var options = {
        fields: fields,
        code: code,
        view: view,
        detailCode: '805332',
        // editCode: '802020',
        addCode: '805320'
    };
    if (view) {
        options.buttons = [{
            'title': '返回',
            handler: function() {
                goBack();
            }
        }];
    }

    buildDetail(options);
});