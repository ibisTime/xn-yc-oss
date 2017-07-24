$(function() {

    var fields = [ {
            field: 'role',
            title: '被授信用户角色',
            required: true,
            type: 'select',
            pageCode: "805054",
            data: {
                "05": "运营商",
                "taster": "试吃员"
            },
            onChange:function(data){  
                reqApi({
                    code: '805054',
                    json: {
                        kind:data,
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
                    $("#toUserId").renderDropdown2(data1);

                });                               
            }
        },{
            field: 'toUserId',
            title: '被授信人',
            type: 'select',
            required: true,
            // listCode: "805054",
            // params: {
            //     kind: kind,
            //     start:"1",
            //     limit:"10",
            //     updater: ''
            // },
            // keyName: 'userId',
            // valueName: 'mobile',
            // searchName: 'loginName',
        },
        {
            title: '授信数量',
            field: 'amount',
            "Z+": true,
            required: true,
            amount: true
        }, {
            field: 'remark',
            title: '用途说明',
            required: true,
            maxlength: 255
        },{
            title: '',
            field: 'fromUserId',
            type: "hidden",
            value: sessionStorage.getItem('userId'),
            required: true
        }
    ];

    buildDetail({
        fields: fields,
        // code: code,
        // view: view,
        addCode: "802417",
        beforeSubmit: function(data) {
            // var data=$("#jsForm").serilalizeObject();
            data.fromCurrency = "CNY";
            data.toCurrency = "CB";
            return data
        }
    });


});