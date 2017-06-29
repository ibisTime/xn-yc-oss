$(function() {

    var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            title: '编号',
            field: 'code',
        }, {
            title: '数量',
            field: 'toAmount',
            // amount: true,
            "Z+": true,
            // formatter: moneyFormat,
        },{
            field:"fromAmount",
            title:"价格",
            formatter:moneyFormat,
            amonut:true
        },{
            title:'状态',
            field:"status",
            type:'select',
            // keyCode:"808907",
            key:"card_status",
            formatter:Dict.getNameForList("card_status"),
            search:true
        },{
            field: 'toUserId',
            title: '运营商',
            type: 'select',
            listCode: "805055",
            params: {
                kind: '05',
                updater: '',
            },
            keyName: 'userId',
            valueName: 'mobile',
            searchName: 'mobile',
            search:true
        }, {
            field: 'remark',
            title: '用途说明',
            maxlength:255,
            type:"textarea",
            normalArea:true
        }];
    buildList({
       
        columns: columns,
        pageCode: "802415",
        searchParams: {
           companyCode:OSS.company
        }
    });
//归档 
    $('#guiDangBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
       
        confirm("确认归档？").then(function() {
            reqApi({
                code: '802418',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });

    });

});