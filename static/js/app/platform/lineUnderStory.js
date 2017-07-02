$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '编号',
    }, {
        field: 'accountName',
        title: '户名',
        search: true
    }, {
        field: 'amount',
        title: '金额',
        formatter: moneyFormat
    }, 
    // {
    //     field: 'channelType',
    //     title: '支付渠道',
    //     type: 'select',
    //     key: 'channel_type',
    //     keyCode: '802006',
    //     formatter: Dict.getNameForList('channel_type', '802006'),
    //     search: true
    // }, 
    {
        field: 'payCardInfo',
        title: '开户行'
    }, {
        field: 'payCardNo',
        title: '银行卡号',
    }, {
        field: 'applyUser',
        title: '申请人',
        formatter: function(v, data) {
            if (data.user.kind == '01') {
                return data.user.loginName;
            } else {
                return data.user.mobile;
            }
        }
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        formatter: dateTimeFormat,
        field1: 'applyDateStart',
        title1: '申请时间',
        type1: 'date',
        field2: 'applyDateEnd',
        type2: 'date',
        search: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'withdraw_status',
        keyCode: '802006',
        formatter: Dict.getNameForList('withdraw_status', '802006'),
        search: true
    }, {
        field1: 'approveDateStart',
        title1: '审核时间',
        type1: 'date',
        field2: 'approveDateEnd',
        type2: 'date',
        search: true,
        visible: false
    }, {
        field: 'approveUser',
        title: '审核人'
    }, {
        field: 'approveDatetime',
        title: '审核时间',
        formatter: dateTimeFormat
    }, {
        field: 'payUser',
        title: '回录人'
    }, {
        field: 'payDatetime',
        title: '回录时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: '802755',
        // singleSelect: false,
        searchParams: {
            channelType: '90',
            companyCode: OSS.company
        }
    });

    $("#detaBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        location.href = "lineUnder_check.html?code=" + selRecords[0].code + "&detail=1";
    });

   

  
});