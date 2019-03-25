/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tblorderitem', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    OrderId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'tblorder',
        key: 'id'
      }
    },
    ProductName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    OrderStatus: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    UnitPriceInclTax: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    UnitPriceExclTax: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    PriceInclTax: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    PriceExclTax: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    DiscountAmountInclTax: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    DiscountAmountExclTax: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    OriginalProductCost: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AttributeDescription: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ItemWeight: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    UOM: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sku: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ModifiedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Attribute: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    AttributeValue: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'tblorderitem'
  });
};
