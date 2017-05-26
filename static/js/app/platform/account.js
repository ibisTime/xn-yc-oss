$(function() {
    var view = 1;
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
        code: '802503',
        json: {
            userId: "SYS_USER_YAOCHENG_TG"
        }
    }).then(function(data) {
        $("#amount-TG").text("￥" + data[0].amount / 1000);
        accountNumber = data[0].accountNumber;
    });

    $("#CNYls-Btn").click(function() {
        location.href = "../store/ledger.html?accountNumber=" + accountNumberCNY;
    })
    $("#CGBls-Btn").click(function() {
        location.href = "../store/ledger.html?accountNumber=" + accountNumberCB;
    })

    $("#accoutGrantBtn").click(function() {
        location.href = "../store/ledger.html?accountNumber=" + accountNumber;
    })
    $("#accouBtn").click(
        function() {
            window.location.href = 'account_quxian.html?accountNumber=' + accountNumberCNY;
        }
    );
    $('#accoutSaleBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"></ul>' +
                '</form>'
        });

        dw.showModal();
        buildDetail({
            fields: [{
                field: 'toUserId',
                title: '售卖加盟商',
                required: true,
                type: 'select',
                pageCode: 805054,
                params: {
                    kind: '05',
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
                title: '',
                field: 'fromUserId',
                type: "hidden",
                value: sessionStorage.getItem('userId'),
                required: true
            }],
            container: $('#formContainer'),
            buttons: [{
                title: '售卖',
                handler: function() {

                    if ($('#toUserId').val() == "") {
                        toastr.error("售卖用户不能为空");
                    } else if ($('#amount').val() == "") {
                        toastr.error("数量不能为空");
                    } else if ($('#popForm').valid()) {

                        var data = $('#popForm').serializeObject();
                        // data.toUserId = getUserId();
                        data.fromCurrency = "CB";
                        data.toCurrency = "CB";
                        // data.payType = "6";
                        reqApi({
                            code: '802413',
                            json: data
                        }).done(function(data) {
                            sucList();
                            toastr.info("操作成功");
                            // dw.close().remove();
                            // var dw1 = dialog({
                            //     title: '扫描微信二维码付款',
                            //     content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                            //         '<div id="qrcode"></div></form>',
                            //     quickClose: true,
                            // });

                            // dw1.showModal();

                            // var qrcode = new QRCode('qrcode', data);
                            // qrcode.makeCode(data);
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



});