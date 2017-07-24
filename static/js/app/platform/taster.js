$(function() {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'realName',
        title: '姓名',
    }, {
        field: 'mobile',
        title: '手机号',   
        search: true
    }, {
        field: 'level',
        title: '等级',
        type: 'select',
        search: true,
        listCode: "807706",
        params:{
            parentKey:'taster_level'
        },
        keyName: 'dkey',
        valueName: 'dvalue',        
    }, {
        title: "收货地址",
        field: "reAddress",
        formatter:function(v,data){
            data = data.addressList[0];
            if(data.province !== data.city){
                return data.province + data.city +data.district +data.detailAddress
            }else{
                return data.city +data.district+data.detailAddress
            }
       }
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        search: true,
        key: 'user_status',
        keyCode: "807706",
        formatter: Dict.getNameForList('user_status', "807706"),
    }, {
        field: 'updateDatetime',
        title: '注册时间',
        formatter: dateTimeFormat
    }, {
        field: 'remark',
        title: '备注',   
    }];

    buildList({
        columns: columns,
        pageCode: '805505',
        searchParams: {
            kind: 'f2'
        }
    });



    $('#editBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "taster_addedit.html?userId=" + selRecords[0].userId;
    });   

    $('#logoutactiveBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
    window.location.href = "taster_loginActive.html?userId=" + selRecords[0].userId;      
    }); 

    $('#saleBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "taster_daixiao.html?userId=" + selRecords[0].userId +"&v=1";
    });        

    $('#guestBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "taster_guest.html?userId=" + selRecords[0].userId +"&v=1";
    });

    $('#orderBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "taster_order.html?userId=" + selRecords[0].userId +"&v=1";
    });         
});