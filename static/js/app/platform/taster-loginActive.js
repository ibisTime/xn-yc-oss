$(function() {
    
    var userId = getQueryString('userId');
    var view = 1;
    var toStatus = "";
    var status;
    
    var fields = [  {
        field: 'realName',
        title: '真实姓名',
        required: true,
        readonly: true
    },{
        field : 'mobile',
        title : '手机号',
        required: true,
        readonly: true
    },{
        field : 'province',
        title : '地址',
        type: "citySelect1",
        required: true,
        readonly: true,
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
        readonly: true,
        formatter:function(v,data){
            var detailAddress = data.addressList[0].detailAddress;
            return detailAddress

        }        
    },{
        field : 'remark',
        title : '备注',
    },{
        field : 'status',
        title : '状态',
        type: 'hidden',
        formatter:function(v,data){
           status = data.status;
           if(status == "0"){
               return toStatus = "2";
           }else if(status == "2"){
               return toStatus = "0";
           }
        }
    }];
    
    var options = {
        fields: fields,
        code:{
            userId: userId
        },
        detailCode:'805506',      
    };

 options.buttons = [{
        title: '注销/激活',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = {};
                data['userId'] = userId;
                data['toStatus'] = toStatus;
                data["remark"] = $("#remark").val();
                 console.log(data)
                reqApi({
                    code: "805052",
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
    
    buildDetail(options)
    
});