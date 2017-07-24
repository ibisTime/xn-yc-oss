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
        $("#userId").renderDropdown2(data2);
    })
        
        
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '编号',
        field: 'code',
    }, {
        title: '归账数量',
        field: 'cbAmount',
        "Z+": true,
        formatter: moneyFormat
    }, {
        field: "cnyAmount",
        title: "归账金额",
        formatter: moneyFormat
    },{
        title: '状态',
        field: "status",
        type: 'select',
        listCode: "802006",
        params:{
            parentKey:'repay_status'
        },
        keyName: 'dkey',
        valueName: 'dvalue',
        search: true,        
    },  {
        field: 'kind',
        title: '角色',
        type: 'select',        
        formatter: function(v, data) {             
            return userType[data.user.kind]                
        },        
    },{
        field: 'realName',
        title: '姓名',
        type: 'select',  
        formatter: function(v, data) {            
             return data.user.realName
        },              
    },{
        field: 'userId',
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
        visible:false
    },{
        title: "是否归档",
        field: "isFiled",
        type: "select",
        data: {
            "1": "已归档",
            "0": "未归档"
        }
    }, {
            title: '创建时间',
            field: 'createDatetime',
            formatter: dateTimeFormat
        }, {
        field: 'remark',
        title: '用途说明',
        maxlength: 255,
        type: "textarea",
        normalArea: true
    }];

    buildList({
            columns: columns,
            pageCode: "802435",
            searchParams: {
                companyCode: OSS.company,
                // type:"0"
            }                
        });            

    //归档 
    $('#guidangBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].isFiled == 1) {
            toastr.warning("该记录已经归档");
            return;
        }
        window.location.href = "cardAcount_filed.html?v=1&Code=" + selRecords[0].code;       

    });
     $('#detailBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }


        window.location.href = "cardAcount_addedit.html?v=1&Code=" + selRecords[0].code;

    });
    $('#checkBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status !== '0') {
            toastr.warning("该用户不处于待审核状态");
            return;
        }        


        window.location.href = "cardAcount_check.html?v=1&Code=" + selRecords[0].code;

    }); 

    // $('#searchBtn').off('click').click(function() {
    //     updateListSearch();
    //     $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
    // });        
        
});