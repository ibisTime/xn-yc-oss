$(function() {
	
	var columns = [{
		field : '',
		title : '',
		checkbox : true
    }, {
		title: 'banner名称',
		field: 'name',
        search:true
	},{
		title: '位置',
		field: 'location',
		key: "banner_location",
        formatter: Dict.getNameForList("banner_location", "807706"),
        search: true,		
  //       formatter: function(v){
		// 	if(v == "index_banner"){
		// 		return '发现';
		// 	}		   
		// },  
        
	}, {
		title: '顺序',
		field: 'orderNo',
        
	},  {
		title: '备注',
		field: 'remark',
	}];
	buildList({
		router: 'banner',
		columns: columns,
		pageCode: '806050',
		deleteCode: '806041',
		searchParams:{
			companyCode: OSS.company,
			type:2
		}
	});
         
    

});