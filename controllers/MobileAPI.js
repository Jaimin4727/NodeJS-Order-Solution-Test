//Tables
var express = require('express');
var router = express.Router();
var Sequelize = require("sequelize");
var Op = Sequelize.Op;
require('dotenv').config()
var fs = require('fs');
var User = models.tbluser;
var Order = models.tblorder;
var OrderDetail = models.tblorderitem;
var seq = models.sequelize;
//End of Tables


/**
    * Create the Order status of the specified customer
     *
     * @param order  {}
     * @param orderitem 
     * For Ex.:
     *
     * "order": {
    	"CustomerId":1,
    	"BillingAddress":"",
    	"ShippFirstName":"",
    	"ShippLastName":"",
    	"ShippAddress1":"",
    	"ShippAddress2":"",
    	"ShippCountry":"",
    	"ShippState":"",
    	"ShippCity":"",
    	"ShippPostCode":"",
    	"OrderStatus":"",
    	"PaymentStatusId":"",
    	"PaymentMethodSystemName":"razor pay",
    	"CustomerCurrencyCode":"RS",
    	"CurrencyRate":"1",
    	"OrderTotal":"1000"
    },
    "orderitem": {
    	"ProductName":"",
    	"Quantity":12,
    	"OriginalProductCost":500.15,
    	"AttributeDescription":""
    }

    * Notes: If others needed,please refere tblorder and tblorderitem models inside the model folder

     * @return instances of Order in a {} with the success and message as the key respectively; success:false is returned if there were no updated
*/


router.post('/CreateOrder', jsonParser, function (req, res) {
    objOrder = req.body;
    if (objOrder.order != null && objOrder.order != undefined && objOrder.order != '') {

        if (objOrder.orderitem != null && objOrder.orderitem != undefined && objOrder.orderitem != '') {

            var PurchaseOrderNumber = new Date();
            objOrder.order.PurchaseOrderNumber = "BILLNO" + Date.parse(PurchaseOrderNumber); //+ PurchaseOrderNumber.getMilliseconds();
            if (objOrder.order.OrderStatus == 'declined') {
                objOrder.order.OrderStatus = 'canceled'
            }
            objOrder.order.CreatedOnUtc = new Date();
            Order.create(objOrder.order).then((response) => {
                objOrder.orderitem.OrderId = response.id;
                objOrder.orderitem.OrderStatus = '';
                objOrder.orderitem.OrderStatus = objOrder.order.OrderStatus;
                OrderDetail.create(objOrder.orderitem).then((resItem) => {

                    if (objOrder.order.OrderStatus == 'confirmed') {

                        Order.update({
                            OrderStatus: 'delivered',
                            ModifiedDate: moment()
                        }, {
                                where: {
                                    id: response.id
                                }
                            }).then((rowsUpdatedOrder) => {

                                OrderDetail.update({
                                    OrderStatus: 'delivered',
                                    ModifiedDate: moment()
                                }, {
                                        where: {
                                            OrderId: response.id
                                        }
                                    }).then((rowsUpdatedOrderItem) => {

                                        res.json({
                                            success: true,
                                            message: "Your order has been delivered"
                                        });

                                    }).catch((error) => {
                                        res.json({
                                            success: false,
                                            message: error.message
                                        });
                                    });

                            }).catch((error) => {
                                res.json({
                                    success: false,
                                    message: error.message
                                });
                            });

                    } else {
                        res.json({
                            success: true,
                            message: "Your order has been canceled",
                            data: {
                                "order": response,
                                "orderitem": resitem
                            }
                        });
                    }

                }).catch((error) => {
                    res.json({
                        success: false,
                        message: error.message.message
                    });
                });
            }).catch((error) => {
                res.json({
                    success: false,
                    message: error.message
                });
            });

        } else {
            res.json({
                "success": false,
                "message": "Order items parameters not found"
            });
        }

    } else {
        res.json({
            "success": false,
            "message": "Invalid parameters"
        });
    }

});

/**
    * Update the Order status of the specified customer
     *
     * @param orderid  the order id
     * @param orderstatus status like 'canceled' or 'delivered'
     * @param customerid  the customer user id
     *
     * @return instances of Order in a {} with the success and message as the key respectively; success:false is returned if there were no updated
*/

router.post('/UpdateOrderStatus', jsonParser, function (req, res) {

    ObjOrderUpdate = req.body;
    if (ObjOrderUpdate.orderid != null && ObjOrderUpdate.orderid != undefined && ObjOrderUpdate.orderid != '') {

        if (ObjOrderUpdate.orderstatus != null && ObjOrderUpdate.orderstatus != undefined && ObjOrderUpdate.orderstatus != '') {

            Order.findOne({
                where: {
                    id: ObjOrderUpdate.orderid
                },
            }).then((objOrder) => {

                if (objOrder != null) {

                    objOrder.updateAttributes({
                        OrderStatus: ObjOrderUpdate.orderstatus
                    }).then((responseorder) => {

                        OrderDetail.update({
                            OrderStatus: ObjOrderUpdate.orderstatus,
                            ModifiedDate: moment()
                        }, {
                                where: {
                                    OrderId: ObjOrderUpdate.orderid
                                }
                            }).then((rowsUpdated) => {

                                res.json({
                                    success: true,
                                    message: "Your Order status updated successfully",
                                });

                            }).catch((error) => {
                                res.json({
                                    success: false,
                                    message: error.message
                                });
                            });

                    }).catch((error) => {
                        res.json({
                            success: false,
                            message: error.message
                        });
                    });

                } else {
                    res.json({
                        success: false,
                        message: "Order not Found..."
                    });
                }
            });

        } else {
            res.json({
                "success": false,
                "message": "Order status not found"
            });
        }

    } else {
        res.json({
            "success": false,
            "message": "Order Id not found"
        });
    }



});

/**
    * Finds Order of the specified customer
     *
     * @param pageNo  page no
     * @param size page size ex. 10 or 20 so on
     * @param customerid  the customer user id
     *
     * @return instances of Order in a [{}] with the tbluser and tblorderitem as the key user and item respectively; success:false is returned if there were no matching order
*/

router.get('/GetAllOrderByCustomerId', function (req, res) {

    if (req.query.pageNo != null && req.query.pageNo != undefined && req.query.pageNo != '') {

        if (req.query.size != null && req.query.size != undefined && req.query.size != '') {

            if (req.query.customerid != null && req.query.customerid != '' && req.query.customerid != undefined) {

                var pageNo = parseInt(req.query.pageNo)
                var size = parseInt(req.query.size)
                var query = {}
                if (pageNo < 0 || pageNo === 0) {
                    response = {
                        "error": true,
                        "message": "Invalid page number, should start with 1"
                    };
                    return res.json(response)
                }
                query.skip = size * (pageNo - 1);
                query.limit = size;

                Order.belongsTo(User, {
                    foreignKey: {
                        name: 'CustomerId',
                        allowNull: false
                    }

                });

                Order.hasMany(OrderDetail, {
                    foreignKey: {
                        name: 'OrderId',
                        allowNull: false
                    }
                });

                Order.findAll({
                    where: {
                        CustomerId: req.query.customerid
                    },
                    offset: query.skip,
                    limit: query.limit,
                    order: [
                        ['CreatedOnUtc', 'DESC'],
                    ],
                    include: [{
                        model: User
                    }, {
                        model: OrderDetail,
                        required: false
                    }]

                }).then((response) => {

                    if (response != null && response.length > 0) {
                        Order.count({
                            where: {
                                CustomerId: req.query.customerid
                            }
                        }).then((count) => {
                            var totalPages = Math.ceil(count / size);
                            res.json({
                                success: true,
                                message: "Record found",
                                data: response,
                                page: totalPages
                            });
                        });
                    } else {
                        res.json({
                            success: false,
                            message: "No Record found",
                        });
                    }

                });

            } else {
                res.json({
                    success: false,
                    message: "Customer id not found..."
                });
            }

        } else {
            res.json({
                "success": false,
                "message": "size not available..."
            });
        }
    } else {
        res.json({
            "success": false,
            "message": "pageNo not available..."
        });
    }

});

module.exports = router