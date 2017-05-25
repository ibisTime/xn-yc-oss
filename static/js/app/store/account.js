$(function() {
    var view = 1;
    var rateCGB = 1;
    var rateJF = 1;

    var accountNumberCNY;
    var accountNumberCB;
    reqApi({
        code: '802503',
        json: {
            userId: getUserId()
        }
    }).done(function(data) {
        $("#amount-CNY").text("￥" + data[0].amount / 1000);
        accountNumberCNY = data[0].accountNumber;
        $("#amount-CB").text(data[1].amount / 1000);
        accountNumberCB = data[1].accountNumber;
    });
    reqApi({
        code: '002051',
        json: {
            fromCurrency: 'CNY',
            toCurrency: 'CB'
        },
        sync: true
    }).done(function(data) {
        rateCGB = data.rate
    });

    $("#CNYls-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberCNY;
    })
    $("#CGBls-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberCB;
    })
    $("#accouBtn").click(
        function() {
            window.location.href = '../platform/account_quxian.html?accountNumber=' + accountNumberCNY;
        }
    );

    $('#saleBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"></ul>' +
                '</form>'
        });

        dw.showModal();
        buildDetail({
            fields: [{
                field: 'fromUserId',
                title: '售卖商家',
                required: true,
                type: 'select',
                pageCode: 805054,
                params: {
                    userReferee: getUserId(),
                    updater: ''
                },
                keyName: 'userId',
                valueName: 'mobile',
                searchName: 'mobile',
            }, {
                title: '数量',
                field: 'amount',
                amount: true,
                "Z+": true,
                formatter: moneyFormat,
                required: true
            }, {
                title: '类型',
                field: 'payType',
                type: 'hidden',
                value: '6',
                required: true
            }],
            container: $('#formContainer'),
            buttons: [{
                title: '售卖',
                handler: function() {

                    if ($('#fromUserId').val() == "") {
                        toastr.error("售卖用户不能为空");
                    } else if ($('#amount').val() == "") {
                        toastr.error("数量不能为空");
                    } else if ($('#popForm').valid()) {

                        var data = $('#popForm').serializeObject();
                        data.toUserId = getUserId();
                        data.currency = "CB";
                        reqApi({
                            code: '802420',
                            json: data
                        }).done(function(data) {
                            sucList();

                            dw.close().remove();
                            var dw1 = dialog({
                                title: '扫描微信二维码付款',
                                content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                                    '<div id="qrcode"></div></form>',
                                quickClose: true,
                            });

                            dw1.showModal();

                            var qrcode = new QRCode('qrcode', data);
                            qrcode.makeCode(data);
                        });
                    }
                }
            }, {
                title: '取消',
                handler: function() {
                    dw.close().remove();
                }
            }]
        });
        dw.__center();
    });




    $('#purchaseBtn-CGB').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"></ul>' +
                '</form>'
        });

        dw.showModal();
        buildDetail({
            fields: [{
                title: '购买数量',
                field: 'amount',
                formatter: moneyFormat,
                required: true,
                amount: true,
                "Z+": true,
                min: 100,
                onKeyup: function(v) {
                    $("#price").html(moneyFormatdecimal(v / rateCGB));
                }
            }, {
                title: '金额',
                field: 'price',
                amount: true,
                formatter: moneyFormat,
                readonly: view
            }],
            container: $('#formContainer'),
            buttons: [{
                title: '购买',
                handler: function() {
                    if ($('#popForm').valid()) {

                        var data = $('#popForm').serializeObject();

                        if (data.length <= 0) {
                            toastr.info("请选择记录");
                            return;
                        }
                        data.fromUserId = getUserId();
                        data.toUserId = OSS.SYS_USER;
                        //						data.amount = moneyFormatByEnLarge($("#price").html());
                        //						data.amount = 100;
                        data.currency = "CB";
                        data.payType = "6";
                        reqApi({
                            code: '802420',
                            json: data
                        }).done(function(data) {
                            sucList();

                            dw.close().remove();
                            var dw1 = dialog({
                                title: '扫描微信二维码付款',
                                content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                                    '<div id="qrcode"></div></form>',
                                quickClose: true,
                            });

                            dw1.showModal();

                            var qrcode = new QRCode('qrcode', data);
                            qrcode.makeCode(data);

                        });

                    }
                }
            }, {
                title: '取消',
                handler: function() {
                    dw.close().remove();
                }
            }]
        });
        dw.__center();
        h = "<br/><p class='huilv'>当前汇率" + rateCGB + ",最少购买100个</p>";
        $(h).insertAfter("#amount");
    });





});