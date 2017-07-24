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
            readonly: view,
            formatter:function(v,data){
                $("#code[name='code']").html(data.code)
            }            
        },{
            field: 'role',
            title: '归账用户角色',
            required: true,
            type: 'select',
            pageCode: "805054",
            readonly: view,
            formatter:function(v,data){
                return userType[data.user.kind]
            }
        },{
            field: 'userId',
            title: '归账人',
            type: 'select',
            required: true,
            readonly: view,
            formatter:function(v,data){
                return data.user.realName +'-'+data.user.mobile
            }            
        }, {
            title: '归账数量',
            field: 'cbAmount',
            "Z+": true,
            readonly: view,
            formatter: moneyFormat,
        }, {
            field: "cnyAmount",
            title: "归账金额",
            readonly: view,
            formatter: moneyFormat
        },{
            title: "是否归档",
            field: "isFiled",
            type: "select",
            data: {
                "1": "已归档",
                "0": "未归档"
            },
            readonly: view,
        },{
            title: '创建时间',
            field: 'createDatetime',
            readonly:view,
            formatter: dateTimeFormat
        },{
            field: 'remark',
            title: '用途说明',
            required: true,
            readonly:view,            
        },{
            field: 'remark1',
            title: '审核说明',
            required: true,
            maxlength: 255
        }
        
    ];
    var options = {
        fields: fields,
        code: code,
        detailCode: "802436",
       
    }
     options.buttons = [{
        title: '通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = {};
                data['code'] = code;
                data['result'] = '1';
                data['approver'] = sessionStorage.getItem('userName');
                data["approveNote"] = $("#remark1").val();
                reqApi({
                    code: "802431",
                    json: data
                }).done(function() {
                    sucDetail();
                });
            }
        }
    },{
        title: '不通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = {};
                data['code'] = code;
                data['result'] = '0';
                data['approver'] = sessionStorage.getItem('userName');
                data["approveNote"] = $("#remark1").val();
                reqApi({
                    code: "802431",
                    json: data
                }).done(function() {
                    sucDetail();
                });
            }
        }
    },{
        title: '返回',
        handler: function() {
            goBack();
        }
    }]; 

    buildDetail(options);


});