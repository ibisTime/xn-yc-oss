$(function() {
    var view = 1;
    var accountNumberCNY;
    var accountNumberCB;
    var accountNumberTG;
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
        accountNumberTG = data[0].accountNumber;
    });

    $("#CNYls-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberCNY;
    })
    $("#CBls-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberCB;
    })

    $("#accoutGrantBtn").click(function() {
        location.href = "../store/ledger.html?accountNumber=" + accountNumberTG;
    })
    $("#accouBtn").click(
        function() {
            window.location.href = 'account_quxian.html?accountNumber=' + accountNumberTG;
        }
    );
    // $('#accoutSaleBtn').click(function() {
    //     var selRecords = $('#tableList').bootstrapTable('getSelections');
    //     var dw = dialog({
    //         content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
    //             '<ul class="form-info" id="formContainer"></ul>' +
    //             '</form>'
    //     });

    //     dw.showModal();
    //     buildDetail({
    //         fields: [{
    //             field: 'toUserId',
    //             title: '售卖加盟商',
    //             required: true,
    //             type: 'select',
    //             pageCode: 805054,
    //             params: {
    //                 kind: '05',
    //                 updater: ''
    //             },
    //             keyName: 'userId',
    //             valueName: 'mobile',
    //             searchName: 'mobile',
    //         }, {
    //             title: '数量',
    //             field: 'amount',
    //             amount: true,
    //             "Z+": true,
    //             formatter: moneyFormat,
    //             required: true
    //         }, {
    //             title: '',
    //             field: 'fromUserId',
    //             type: "hidden",
    //             value: sessionStorage.getItem('userId'),
    //             required: true
    //         }],
    //         container: $('#formContainer'),
    //         buttons: [{
    //             title: '售卖',
    //             handler: function() {

    //                 if ($('#toUserId').val() == "") {
    //                     toastr.error("售卖用户不能为空");
    //                 } else if ($('#amount').val() == "") {
    //                     toastr.error("数量不能为空");
    //                 } else if ($('#popForm').valid()) {

    //                     var data = $('#popForm').serializeObject();
    //                     data.fromCurrency = "CB";
    //                     data.toCurrency = "CB";
    //                     reqApi({
    //                         code: '802413',
    //                         json: data
    //                     }).done(function(data) {
    //                         sucList();
    //                         dw.close().remove();
    //                     });
    //                 }
    //             }
    //         }, {
    //             title: '取消',
    //             handler: function() {
    //                 dw.close().remove();
    //             }
    //         }]
    //     });
    //     dw.__center();
    // });



});