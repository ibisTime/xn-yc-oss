$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var accountNumber = getQueryString('accountNumber');


    var fields = [ {
        field: 'accountNumber',
        title: '用户账户',
        required: true,
        type: 'hidden',
        value: accountNumber
    }, {
        field: 'amount',
        title: '取现金额',
        required: true,
        amount: true,
        formatter: moneyFormat
    }, {
        title:"支付时间",
        field:"payDatetime",
        type:"date",
        formatter:dateFormat,
        required: true,
    },{
        field: 'payCardInfo',
        title: '开户行',
        // type: "select",
        // listCode: "802116",
        // keyName: 'bankCode',
        // valueName: 'bankName',
        required: true,
        maxlength: 255
    }, {
        field: 'payCardNo',
        title: '银行卡号',
        required: true,
        bankCard: true,
    }, {
        field: 'applyNote',
        title: '备注',
        // required: true,
        maxlength:255,
        type:"textarea",
        normalArea:true
    }];

    var options = {
        fields: fields,
        // code: code,
        addCode: '802754',
        // detailCode: '802756',
        view: view,
        beforeSubmit: function(data) {
            data.applyUser = getUserId();
            return data;
        }
    };

    buildDetail(options);

});