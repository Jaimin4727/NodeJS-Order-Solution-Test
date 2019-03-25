# NodeJS Order Solution Test

## MySQL database

DROP TABLE IF EXISTS `tblorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblorder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerId` int(11) DEFAULT NULL,
  `BillingAddress` varchar(200) DEFAULT NULL,
  `ShippFirstName` varchar(50) DEFAULT NULL,
  `ShippLastName` varchar(50) DEFAULT NULL,
  `ShippAddress1` varchar(100) DEFAULT NULL,
  `ShippAddress2` varchar(100) DEFAULT NULL,
  `ShippCountry` varchar(100) DEFAULT NULL,
  `ShippState` varchar(50) DEFAULT NULL,
  `ShippCity` varchar(50) DEFAULT NULL,
  `ShippPostCode` varchar(50) DEFAULT NULL,
  `ShippPhoneNo` varchar(50) DEFAULT NULL,
  `OrderNotes` varchar(100) DEFAULT NULL,
  `OrderStatus` varchar(45) DEFAULT NULL,
  `PaymentStatusId` varchar(50) DEFAULT NULL,
  `PaymentMethodSystemName` varchar(50) DEFAULT NULL,
  `CustomerCurrencyCode` varchar(50) DEFAULT NULL,
  `CurrencyRate` varchar(45) DEFAULT NULL,
  `VatNumber` varchar(50) DEFAULT NULL,
  `OrderSubtotalInclTax` decimal(10,2) DEFAULT NULL,
  `OrderSubtotalExclTax` decimal(10,2) DEFAULT NULL,
  `OrderSubTotalDiscountInclTax` decimal(10,2) DEFAULT NULL,
  `OrderSubTotalDiscountExclTax` decimal(10,2) DEFAULT NULL,
  `OrderShippingInclTax` decimal(10,2) DEFAULT NULL,
  `OrderShippingExclTax` decimal(10,2) DEFAULT NULL,
  `PaymentMethodAdditionalFeeInclTax` decimal(10,2) DEFAULT NULL,
  `PaymentMethodAdditionalFeeExclTax` decimal(10,2) DEFAULT NULL,
  `TaxRates` decimal(10,2) DEFAULT NULL,
  `OrderTax` decimal(10,2) DEFAULT NULL,
  `OrderDiscount` decimal(10,2) DEFAULT NULL,
  `OrderTotal` decimal(10,2) DEFAULT NULL,
  `RefundedAmount` decimal(10,2) DEFAULT NULL,
  `RewardPointsWereAdded` int(11) DEFAULT NULL,
  `AffiliateId` int(11) DEFAULT NULL,
  `CustomerIp` varchar(45) DEFAULT NULL,
  `AllowStoringCreditCardNumber` tinyint(1) DEFAULT '0',
  `CardType` varchar(45) DEFAULT NULL,
  `CardName` varchar(50) DEFAULT NULL,
  `CardNumber` varchar(50) DEFAULT NULL,
  `MaskedCreditCardNumber` varchar(50) DEFAULT NULL,
  `CardCvv2` int(11) DEFAULT NULL,
  `CardExpirationMonth` int(11) DEFAULT NULL,
  `AuthorizationTransactionId` int(11) DEFAULT NULL,
  `AuthorizationTransactionCode` varchar(45) DEFAULT NULL,
  `AuthorizationTransactionResult` varchar(100) DEFAULT NULL,
  `CaptureTransactionId` int(11) DEFAULT NULL,
  `CaptureTransactionResult` varchar(50) DEFAULT NULL,
  `SubscriptionTransactionId` int(11) DEFAULT NULL,
  `PurchaseOrderNumber` varchar(100) DEFAULT NULL,
  `PaidDateUtc` datetime DEFAULT NULL,
  `ShippingMethod` varchar(100) DEFAULT NULL,
  `ShippingRateComputationMethodSystemName` varchar(100) DEFAULT NULL,
  `Courier` varchar(100) DEFAULT NULL,
  `TrackingNumber` varchar(100) DEFAULT NULL,
  `Terms` longtext,
  `CreatedOnUtc` datetime DEFAULT NULL,
  `ModifiedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tblorder_tbluser_idx` (`CustomerId`),
  CONSTRAINT `tblorder_tbluser` FOREIGN KEY (`CustomerId`) REFERENCES `tbluser` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tblorderitem`
--

DROP TABLE IF EXISTS `tblorderitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblorderitem` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `OrderId` int(11) DEFAULT NULL,
  `ProductName` varchar(100) DEFAULT NULL,
  `OrderStatus` varchar(45) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `UnitPriceInclTax` decimal(10,2) DEFAULT NULL,
  `UnitPriceExclTax` decimal(10,2) DEFAULT NULL,
  `PriceInclTax` decimal(10,2) DEFAULT NULL,
  `PriceExclTax` decimal(10,2) DEFAULT NULL,
  `DiscountAmountInclTax` decimal(10,2) DEFAULT NULL,
  `DiscountAmountExclTax` varchar(2) DEFAULT NULL,
  `OriginalProductCost` decimal(10,2) DEFAULT NULL,
  `AttributeDescription` varchar(50) DEFAULT NULL,
  `ItemWeight` varchar(45) DEFAULT NULL,
  `UOM` varchar(50) DEFAULT NULL,
  `sku` varchar(50) DEFAULT NULL,
  `ModifiedDate` datetime DEFAULT NULL,
  `Attribute` varchar(50) DEFAULT NULL,
  `AttributeValue` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tblorderitem_tblorder_idx` (`OrderId`),
  CONSTRAINT `tblorderitem_tblorder` FOREIGN KEY (`OrderId`) REFERENCES `tblorder` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbluser`
--

DROP TABLE IF EXISTS `tbluser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbluser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `createddate` datetime DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `IsMobileVerify` tinyint(1) DEFAULT '0',
  `PrivacyPolicy` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

## .env file configuraction

setup your database credentials into .env file


## npm 

run following command into root of the project in command prompt (e.g D:\NodeJS-Order-Solution-Test> )

1) npm install

After installing run below command : 

4) node server.js

Note: the server running on 8080 port e.g localhost:8080


## API'S documentation (POSTMAN Collection HTTP code)

1) Create Order With After X amount of seconds confirmed orders should automatically be moved to the delivered state

POST /MobileAPI/CreateOrder HTTP/1.1
Host: localhost:8080
Content-Type: application/json
cache-control: no-cache
Postman-Token: 03e4486f-7c29-4b29-b0f8-15e4ffadba80
{
    "order": {
        "CustomerId": 1,
        "BillingAddress": "werertretysgsd SFSFG sdg",
        "ShippFirstName": "sdfdfsdf",
        "ShippLastName": "sdfdfsdf",
        "ShippAddress1": "cvbn",
        "ShippAddress2": "vcbvcbcvbvcbc",
        "ShippCountry": "India",
        "ShippState": "Guj",
        "ShippCity": "Surat",
        "ShippPostCode": "394017",
        "OrderStatus": "confirmed",
        "PaymentStatusId": "fgfdgfhgfhfgxgdfgdghfh",
        "PaymentMethodSystemName": "razor pay",
        "CustomerCurrencyCode": "RS",
        "CurrencyRate": "1",
        "OrderTotal": "1000"
    },
    "orderitem": {
        "ProductName": "qwe",
        "Quantity": 12,
        "OriginalProductCost": 500.15,
        "AttributeDescription": "fdgdfghfh"
    }
}------WebKitFormBoundary7MA4YWxkTrZu0gW--


2) Update Order Status

POST /MobileAPI/UpdateOrderStatus HTTP/1.1
Host: localhost:8080
Content-Type: application/x-www-form-urlencoded
cache-control: no-cache
Postman-Token: 85957d5f-7673-430c-bb17-e50588c7e651
orderid=18orderstatus=canceled


3) Get All Order records by customer id with pagination

GET /MobileAPI/GetAllOrderByCustomerId?pageNo=1&size=10&customerid=1 HTTP/1.1
Host: localhost:8080
cache-control: no-cache
Postman-Token: 60a42f50-fbd7-44c9-a5f5-6cc30743f654




