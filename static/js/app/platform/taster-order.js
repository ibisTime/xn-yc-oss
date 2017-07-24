$(function() {
	
	var userId = getQueryString('userId');
    var view = getQueryString('v');
	var view = 1;  
	
	var fields = [  {
        field: 'realName',
        title: '真实姓名',
        required: true,
    },{
    	field : 'mobile',
		title : '手机号',
        required: true
    }, {
        field: 'level',
        title: '等级',
        type: 'select',
        key: 'taster_level',
        keyCode: "807706",
        formatter: Dict.getNameForList('taster_level', "807706"),                
    },{
        field : 'province',
        title : '地址',
        type: "citySelect1",
        required: true,
        formatter:function(v,data){
            data = data.addressList[0];
            if(data.province !== data.city){
                return data.province + data.city +data.district
            }else{
                return data.city +data.district
            }            

        }
    },{
        field : 'address',
        title : '详细地址',
        required: true,
        formatter:function(v,data){
            var detailAddress = data.addressList[0].detailAddress;
            return detailAddress

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
        field: 'remark',
        title: '备注',   
    }];
	
	buildDetail({
		fields: fields,
        view: view,
		code:{
			userId: userId
		},
        buttons: {},
		addCode:'805500',
        editCode:'805501',
        detailCode:'805506',
        beforeSubmit:function(data){
            data.userId = userId;
            return data;
        }      
	});

    $('#tableList').bootstrapTable({
        columns: [{
            field: '',
            title: '',
            checkbox: true
        }, {
            field: 'code',
            title: '订单编号',
            required: true,
        }, {
            title: "商品名称",
            field: "productName"
        }, {
            title: "商品规格",
            field: "productSpecsName"
        },  {
            title: "数量",
            field: "quantity"
        }, {
            field: 'payAmount1',
            title: '支付总额',
            formatter: function(v, data) {
                if (v !== 0) {
                    return "人民币：" + moneyFormat(data.payAmount1)
                } else {
                    return "橙券：" + moneyFormat(data.payAmount2)
                }
            }
        }, {
            field: 'receiver',
            title: '收件人',
            required: true,
        }, {
            title: "联系电话",
            field: "reMobile",
        }, {
            field: 'reAddress',
            title: '收件地址',
        }, {
            field: 'status',
            title: '订单状态',
            type: "select",
            key: "order_status",
            keyCode: '808907',
            formatter: Dict.getNameForList("order_status", "808907"),
            search: true,
        }, {
            field: 'remark',
            title: '备注',
        }],
        singleSelect: true, //禁止多选
        clickToSelect: true, //自动选中
        uniqueId: 'id',
        onClickRow: function(row, $element) {
            paramIndex = $element.data('index')
        }
    });

    if (userId) {
        reqApi({
            code: '808065',
            json: { 
                applyUser: userId,
                start: "1",
                limit: "10",
                type: "1,4",
                updater: ""
                 }
        }).done(function(d) {
            // pcode = d.code
            $('#tableList').bootstrapTable('prepend', d.list)
        })

    }

$('#back1Btn').off("click").click(function() {
        goBack();
    });    

});