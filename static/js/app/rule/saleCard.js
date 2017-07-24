$(function() {
var userType = {
        "05": "运营商",
        "taster": "试吃员",
    };

reqApi({
        code: "805054",
        json: {
            kind:"05taster",
            start:1,
            limit:10,
            updater:""
        }
    }).done(function(d) {
        var data2={};
        d.list.forEach(function(v,i){
            data2[v.userId] = v.realName +'-'+userType[v.kind];

        })
        $("#toUserId").renderDropdown2(data2);
    })      

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '编号',
        field: 'code',
    }, {
        title: '数量',
        field: 'fromAmount',
        "Z+": true,
        formatter: moneyFormat
    }
    // , {
    //     field: "toAmount",
    //     title: "价格",
    //     formatter: moneyFormat
    // }
    ,{
        title: '状态',
        field: "status",
        type: 'select',
        data: {
            "1": "已授信",
            "0": "未授信"
        },
        search: true,
    },  {
            title: "归档状态",
            field: "isFiled",
            type: "select",
            data: {
                "1": "已归档",
                "0": "未归档"
            }
         },  {
        field: 'kind',
        title: '角色',
        formatter: function(v, data) {
             
             return userType[data.toUser.kind]
        }        
    },{
        field: 'realName',
        title: '姓名',
        formatter: function(v, data) {
             return data.toUser.realName
        },   
    },{
        field: 'toUserId',
        title: '姓名',
        type:"select",
        // pageCode1:"805054",
        // params:{
        //     kind:"05taster",
        //     updater:""
        // },
        // keyName:"userId",
        // valueName:"realName",
        search:true,
        visible:false,
        afterSet: function(v, data){
                      
        }
    }, {
        field: 'remark',
        title: '用途说明',
        maxlength: 255,
        type: "textarea",
        normalArea: true
    }];
    buildList({
        columns: columns,
        pageCode: "802415",
        searchParams: {
            companyCode: OSS.company,
            type:"0"
        }
    });
    //归档 
    $('#guiDangBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].isFiled == 1) {
            toastr.warning("该记录已经归档");
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
     $('#detaBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }


        window.location.href = "saleCard_detail.html?v=1&Code=" + selRecords[0].code;

    });
});