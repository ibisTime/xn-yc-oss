$(function() {
	
	var userId = getQueryString('userId');
	var view = 1;
	
	var fields = [  {
        field: 'realName',
        title: '真实姓名',
        required: true,
    },{
    	field : 'mobile',
		title : '手机号',
        required: true
    },{
        field : 'province',
        title : '地址',
        type: "citySelect1",
        required: true,
        afterSet:function(v,data){
            data = data.addressList[0];
            if (data.province == data.city && data.city == data.district) {
                data.city = "";
                data.district = "";
            } else if (data.province == data.city && data.city != data.district) {
                data.city = data.district;
            }
            $('#province').val(data.province);
            $('#province').trigger('change');
            data.city && $('#city').val(data.city);
            data.district && $('#area').val(data.district);
            data.city ? $('#city').trigger('change') : $('#province').trigger('change');
            data.district && $('#area').val(data.district);
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
        field: 'remark',
        title: '备注',   
    }];
	
	buildDetail({
		fields: fields,
		code:{
			userId: userId
		},
		addCode:'805500',
        editCode:'805501',
        detailCode:'805506',
        beforeSubmit:function(data){
            data.userId = userId;
            return data;
        }      
	});
	
	
});