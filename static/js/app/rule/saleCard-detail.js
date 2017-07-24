$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');
    var userType = {
        "05": "运营商",
        "taster": "试吃员",
    };
    var fields = [{
            field: 'code',
            title: '编号',
            formatter:function(v,data){
                $("#code[name='code']").html(data.code)
            }            
        },{
            field: 'role',
            title: '被授信用户角色',
            required: true,
            type: 'select',
            pageCode: "805054",
            data: {
                "05": "运营商",
                "taster": "试吃员"
            },
            formatter:function(v,data){
                return userType[data.toUser.kind]
            }
        },{
            field: 'realName',
            title: '被授信人',
            type: 'select',
            required: true,
            formatter:function(v,data){
                return data.toUser.realName +'-'+data.toUser.mobile
            }            
        },{
            title: '授信数量',
            field: 'fromAmount',
            "Z+": true,
            required: true,
            amount: true
        },{
            title: "是否归档",
            field: "isFiled",
            type: "select",
            data: {
                "1": "已归档",
                "0": "未归档"
            }
        },{
            title: '创建时间',
            field: 'createDatetime',
            readonly:view,
            formatter: dateTimeFormat
        },{
            field: 'remark',
            title: '用途说明',
            required: true,
            maxlength: 255
        }
        
    ];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: "802416",
       
    });


});