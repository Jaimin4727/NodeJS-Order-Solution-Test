/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tblorder', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    CustomerId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'tbluser',
        key: 'id'
      }
    },
    BillingAddress: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    ShippFirstName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ShippLastName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ShippAddress1: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ShippAddress2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ShippCountry: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ShippState: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ShippCity: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ShippPostCode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ShippPhoneNo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    OrderNotes: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    OrderStatus: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    PaymentStatusId: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PaymentMethodSystemName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CustomerCurrencyCode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CurrencyRate: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    VatNumber: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    OrderSubtotalInclTax: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    OrderSubtotalExclTax: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    OrderSubTotalDiscountInclTax: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    OrderSubTotalDiscountExclTax: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    OrderShippingInclTax: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    OrderShippingExclTax: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    PaymentMethodAdditionalFeeInclTax: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    PaymentMethodAdditionalFeeExclTax: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    TaxRates: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    OrderTax: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    OrderDiscount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    OrderTotal: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    RefundedAmount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    RewardPointsWereAdded: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    AffiliateId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    CustomerIp: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    AllowStoringCreditCardNumber: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    CardType: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    CardName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CardNumber: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    MaskedCreditCardNumber: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CardCvv2: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    CardExpirationMonth: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    AuthorizationTransactionId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    AuthorizationTransactionCode: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    AuthorizationTransactionResult: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    CaptureTransactionId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    CaptureTransactionResult: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    SubscriptionTransactionId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    PurchaseOrderNumber: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    PaidDateUtc: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ShippingMethod: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ShippingRateComputationMethodSystemName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Courier: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    TrackingNumber: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Terms: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    CreatedOnUtc: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ModifiedDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'tblorder'
  });
};
