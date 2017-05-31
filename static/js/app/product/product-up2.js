$(function() {
    var code = getQueryString('code');
    var rateCB = 1;
    reqApi({
        code: '002051',
        json: {
            fromCurrency: 'CNY',
            toCurrency: 'CB'
        },
        sync: true
    }).done(function(data) {
        rateCB = data.rate
    });


    var fields = [{
        field: 'kind',
        type: 'hidden',
        value: '1'
    }, {
        field: 'originalPrice',
        title: '原价/市场价',
        required: true,
        amount: true,
        afterSet: function(value) {
            isNaN(value) && $("#originalPrice").val("");
        }
    }, {
        field: 'price1',
        title: '人民币价',
        amount: true,
        required: true,
        onKeyup: function(value) {
            var val = parseInt(value);
            $("#price2").val((val * rateCB).toFixed(2));
        },
        afterSet: function(value) {
            isNaN(value) && $("#price1").val("");
        }
    }, {
        field: 'price2',
        title: '橙券价',
        amount: true,
        required: true,
        afterSet: function(value) {
            isNaN(value) && $("#price2").val("");
        }
    }, {
        field: 'price3',
        title: '积分价',
        type: "hidden",
        value: "0",
        required: true,
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        key: "product_location",
        keyCode: '808907',
        required: true,
    }, {
        field: 'orderNo',
        title: '序号',
        required: true,
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '808026',
        // addCode: '808010',
        // editCode: '808012',
    });

    $("#subBtn").off("click").click(function() {
        if ($('#jsForm').valid()) {
            confirm("确认上架？").then(function() {
                var data = $('#jsForm').serializeObject();
                data.code = code;

                reqApi({
                    code: '808013',
                    json: data
                }).then(function() {
                    sucDetail();
                });

            });
        }
    });
});