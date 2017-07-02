$(function() {
    

     var fields = [{
                 title: '数量',
                field: 'amount',
                "Z+": true,
                required: true
             },
            {
                field:"tranAmount",
                title:"价格",
                formatter:moneyFormat,
                // amonut:true,
                required: true
            },{
                field: 'toUserId',
                title: '运营商',
                required: true,
                type: 'select',
                pageCode: "805054",
                params: {
                    kind: '05',
                    updater: ''
                },
                keyName: 'userId',
                valueName: 'mobile',
                searchName: 'mobile'
            }, 
            {
                field: 'receiver',
                title: '收款人',
                type:'select',
                required: true,
                pageCode: "805054",
                params: {
                    kind:"01",
                    updater: ''
                },
                keyName: 'loginName',
                valueName: 'loginName',
                searchName: 'loginName',
            }, {
                field: 'remark',
                title: '用途说明',
                required: true,
                maxlength:255
            }, 
            {
                title: '',
                field: 'fromUserId',
                type: "hidden",
                value: sessionStorage.getItem('userId'),
                required: true
            }];

    buildDetail({
        fields: fields,
        // code: code,
        // view: view,
        addCode: "802417",
        beforeSubmit:function(data){
            // var data=$("#jsForm").serilalizeObject();
            data.fromCurrency = "CNY";
            data.toCurrency = "CB";
            return data
        }
    });
    
   
});