$(function() {

    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var userId = getUserId();

    var fields = [{
            field: 'kind',
            type: 'hidden',
            value: '1'
        }, {
            field: 'name',
            title: '商家名称',
            readonly: view,
            required: true,
            maxlength: 32
        }, {
            field: 'type',
            title: '分类',
            type: 'select',
            listCode: '808007',
            readonly: view,
            params: {
                type: 2,
                status: "1",
                parentCode: 0
            },
            keyName: 'code',
            valueName: 'name',
        }, {
            field: 'legalPersonName',
            title: '法人姓名',
            readonly: view,
            required: true,
            maxlength: 32
        }, {
            field: 'mobile',
            title: '登录名(店家手机号)',
            mobile: true,
            readonly: view,
            required: true
        }, {
            field: 'bookMobile',
            title: '联系电话',
            tm: true,
            required: true,
            readonly: view,
        }, {
            field: 'smsMobile',
            title: '短信手机号',
            mobile: true,
            required: true,
            readonly: view,
        },
        {
            title: "地址",
            field: "province1",
            value: "浙江省宁波市余姚区",
            readonly: true
        },
        // {
        //     title: '地址',
        //     field: "province1",
        //     type: 'select',
        //     key: "product_location",
        //     keyCode: '808907',
        //     required: true,
        //     type: 'citySelect',
        //     readonly: view,
        //     // hidden: !view
        // },
        {
            title: '详细地址',
            field: 'address',
            required: true,
            maxlength: 255,
            readonly: view
        }, {
            title: '经度',
            field: 'longitude',
            west: true,
            readonly: view,
            hidden: !view
        }, {
            title: "纬度",
            field: 'latitude',
            north: true,
            readonly: view,
            hidden: !view
        }, {
            field: 'slogan',
            title: '广告语',
            required: true,
            maxlength: 255,
            readonly: view
        }, {
            field: 'advPic',
            title: '店铺缩略图',
            type: 'img',
            required: true,
            readonly: view
        }, {
            field: 'pic',
            title: '商家图片',
            type: 'img',
            required: true,
            readonly: view
        }, {
            field: 'description',
            title: '商家描述',
            required: true,
            minlength: 20,
            readonly: view
        }, {
            field: 'rate1',
            title: '橙币返点比例',
            min: 0,
            max: 1,
            required: true,
        }, {
            field: 'rate2',
            title: '橙币返点比例',
            value: "0",
            type: "hidden",
            required: true,
        }, {
            field: 'rate3',
            title: '橙币返点比例',
            value: "0",
            type: "hidden",
            required: true,
        }, {
            field: 'remark',
            title: '备注',
            readonly: view
        }, {
            field: 'province',
            title: '省',
            value: "浙江省",
            type: 'hidden',
            required: true,
        }, {
            field: 'ccitySelect',
            title: '市',
            value: "宁波市",
            type: 'hidden',
            required: true,
        }, {
            field: 'area',
            title: '区',
            value: "余姚区",
            type: 'hidden',
            required: true,
        },
    ];


    var options = {
        fields: fields,
        view: view,
        code: code,
        detailCode: '808216',
        addCode: '808200',
        beforeSubmit: function(data) {
            // data.province = '浙江省';
            // data.city = '宁波市';
            // data.area = '余姚区'
        }
    };

    buildDetail(options);

    $('#subBtn').off("click").click(function() {
        if ($('#jsForm').valid()) {
            var data = $('#jsForm').serializeObject();
            $('#jsForm').find('.btn-file [type=file]').parent().next().each(function(i, el) {
                var values = [];
                var imgs = $(el).find('.img-ctn');
                imgs.each(function(index, img) {
                    values.push($(img).attr('data-src') || $(img).find('img').attr('src'));
                });
                data[el.id] = values.join('||');
            });
            if ($('#jsForm').find('#province')[0]) {
                var province = $('#province').val();
                var city = $('#city').val();
                var area = $('#area').val();
                if (!city) {
                    data['city'] = province;
                    data['area'] = province;
                } else if (!area) {
                    data['city'] = province;
                    data['area'] = city;
                }
                // var province = '浙江省';
                // var city = '宁波市';
                // var area = '余姚区';
                // data['province'] = province;
                // data
            }
            for (var i = 0, len = fields.length; i < len; i++) {
                var item = fields[i];
                if (item.equal && (!$('#' + item.field).is(':hidden') || !$('#' + item.field + 'Img').is(':hidden'))) {
                    data[item.equal] = $('#' + item.field).val() || $('#' + item.field).attr('src');
                } else if (item.emptyValue && !data[item.field]) {
                    data[item.field] = item.emptyValue;
                } else if (item.readonly && item.pass) {
                    data[item.field] = $('#' + item.field).attr('data-value') || $('#' + item.field).html();
                }
                if (item.type == 'select' && item.passValue) {
                    data[item.field] = $('#' + item.field).find('option:selected').html();
                }
                if (item.type == "checkbox") {
                    data[item.field] = $.isArray(data[item.field]) ? data[item.field].join(",") : data[item.field];
                }
            }
            data['id'] = data['code'];

            var addr = data.province + data.city + data.area + data.detail;
            var myGeo = new BMap.Geocoder();
            myGeo.getPoint(addr, function(point) {
                if (point) {
                    data.userReferee = userId;
                    data.level = "1";
                    data.longitude = point.lng;
                    data.latitude = point.lat;

                    reqApi({
                        code: code ? options.editCode : options.addCode,
                        json: data
                    }).done(function(data) {
                        sucDetail();
                    });
                } else {
                    alert("无法解析当前地址的经纬度!");
                }
            });

        }
    });

});