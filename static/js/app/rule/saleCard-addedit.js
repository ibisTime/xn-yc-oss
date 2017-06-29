$(function() {
    


    // var fields = [{
    //              title: '数量',
    //             field: 'amount',
    //             "Z+": true,
    //             required: true
    //         },{
    //             field:"price",
    //             title:"价格",
    //             formatter:moneyFormat,
    //             amonut:true,
    //             required: true
    //         },{
    //             field: 'toUserId',
    //             title: '运营商',
    //             required: true,
    //             type: 'select',
    //             pageCode: "805054",
    //             params: {
    //                 kind: '05',
    //                 updater: ''
    //             },
    //             keyName: 'userId',
    //             valueName: 'mobile',
    //             searchName: 'mobile',
    //             onChange:function(v){
    //                 $("#ddd").renderDropdown({
    //                     listCode: "805055",
    //                     params: {
    //                         userReferee: v,
    //                         updater: ''
    //                     },
    //                     keyName: 'userId',
    //                     valueName: 'mobile',
    //                     searchName: 'mobile',
    //                 }) 
    //             }
    //         }, {
    //             field: 'ddd',
    //             title: '收款人',
    //             type:'select',
    //             required: true,
    //         },{
    //             field: '',
    //             title: '用途说明',
    //             required: true,
    //             maxlength:255,
    //             type:"textarea",
    //             normalArea:true
    //         }, {
    //             title: '',
    //             field: 'fromUserId',
    //             type: "hidden",
    //             value: sessionStorage.getItem('userId'),
    //             required: true
    //         }];

    // var options = {
    //     fields: fields,
    //     // code:code,
    //     addCode: '802413',
    //     beforeSubmit:function(data){
    //         // var data=$("#jsForm").serilalizeObject();
    //         data.fromCurrency = "CB";
    //         data.toCurrency = "CB";
    //         return data
    //     }
    // };
 

    // buildDetail(options);


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
                amonut:true,
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
                searchName: 'mobile',
                onChange:function(v){
                    $("#ddd").renderDropdown({
                        listCode: "805055",
                        params: {
                            userReferee: v,
                            updater: ''
                        },
                        keyName: 'userId',
                        valueName: 'mobile',
                        searchName: 'mobile',
                    }) 
                }
            }, 
            // {
            //     field: 'ddd',
            //     title: '收款人',
            //     type:'select',
            //     required: true,
            // },
            {
                field: 'remark',
                title: '用途说明',
                required: true,
                maxlength:255,
                // type:"textarea",
                // normalArea:true
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