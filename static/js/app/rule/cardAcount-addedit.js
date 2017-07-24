$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');    
    var rate,kind;    
    var userType = {
                "05": "运营商",
                "taster": "试吃员",
            };    
    reqApi({
            code:"802026",
            json:{
                code: '4',
                id: '4'
            }
        }).done(function(data){
            rate = data.cvalue;            
            });    
    var fields = [ {
            field: 'code',
            title: '编号',
            hidden:!view,
            formatter:function(v,data){
                $("#code[name='code']").html(data.code)      
            }            
        },{
            field: 'role',
            title: '归账用户角色',
            required: true,
            type: 'select',
            pageCode: "805054",
            data: userType,
            onChange:function(data){  
                kind = data
                reqApi({
                    code: '805054',
                    json: {
                        kind:kind,
                        start:"1",
                        limit:"10",
                        updater: ''                    
                    },
                    sync: true
                }).done(function(d) {
                    var data1 = {};

                    if(d.list.length ){
                        d.list.forEach(function(d,i){
                            data1[d.userId] = d.realName +'-'+ d.mobile ;

                        })
                    }
                    $("#userId").renderDropdown2(data1);

                });                               
            },
            formatter:function(v,data){
                return userType[data.user.kind]
            }            
        },{
            field: 'userId',
            title: '归账人',
            type: 'select',
            required: true,
            formatter:function(v,data){
                return data.user.realName +'-'+data.user.mobile
            }            
            // listCode: "805054",
            // params: {
            //     kind:kind,
            //     start:"1",
            //     limit:"10",
            //     updater: ''
            // },
            // keyName: 'userId',
            // valueName: 'realName',
            // searchName: 'realName',
        },{
            title: '归账数量',
            field: 'cbAmount',
            "Z+": true,
            required: true,
            amount: true,
            onKeyup:function(data){
                var cbAmount = $('.clearfix #cbAmount');
                var cbVal = $('.clearfix #cbAmount').val();
                var cnyAmount = $('.clearfix #cnyAmount'); 
                cbVal = parseInt(cbVal) *rate;               
                if(cbVal){
                    cnyAmount.text(cbVal);                    
                }else{
                    cnyAmount.text("0"); 
                }
                                
            }           
        }, {
            field: "cnyAmount",
            title: "归账金额",
            readonly: true,
            formatter: moneyFormat,
            afterSet:function(v,data){
                 data.cnyAmount
            }         
        },{
            title: "是否归档",
            field: "isFiled",
            type: "select",
            hidden:!view,
            data: {
                "1": "已归档",
                "0": "未归档"
            },
            readonly: view,
        },{
            title: '创建时间',
            field: 'createDatetime',
            readonly:view,
            hidden:!view,
            formatter: dateTimeFormat
        },{
            field: 'remark',
            title: '用途说明',
            required: true,
            readonly:view,            
        },{
            field: 'approveNote',
            title: '审核说明',
            required: true,
            hidden:!view,
            maxlength: 255
        },
        {
            title: '',
            field: 'fromUserId',
            type: "hidden",
            value: sessionStorage.getItem('userId'),
            required: true
        }
    ];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        addCode: "802430",
        detailCode: "802436",
        beforeSubmit: function(data) {
            // var data=$("#jsForm").serilalizeObject();
            data.fromCurrency = "CNY";
            data.toCurrency = "CB";
            return data
        }
    });

        
        

});