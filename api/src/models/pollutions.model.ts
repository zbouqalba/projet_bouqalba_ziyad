import { Sequelize, DataTypes, Model, Optional, ModelStatic } from "sequelize";

export interface PollutionAttributes {
  id: number;
  title: string;
  typePollution: string;
  description: string;
  date: string;
  lieu: string;
  latitude: number;
  longitude: number;
  photo?: string | null;
}

export interface PollutionCreationAttributes
  extends Optional<PollutionAttributes, "id" | "photo"> {}

export interface PollutionInstance
  extends Model<PollutionAttributes, PollutionCreationAttributes>,
    PollutionAttributes {}

export type PollutionModel = ModelStatic<PollutionInstance>;

export default function definePollutions(
  sequelize: Sequelize,
  _seq?: typeof Sequelize
): PollutionModel {
  const Pollutions = sequelize.define<PollutionInstance>(
    "pollution",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      typePollution: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lieu: {
        type: DataTypes.STRING,
        allowNull: false
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      }
    },
    {
      tableName: "pollutions",
      freezeTableName: true,
      timestamps: false
    }
  );

  return Pollutions;
}

