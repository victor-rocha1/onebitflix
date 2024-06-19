import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';
import { database } from '../database';
import { EpisodeInstance } from './Episode';

type CheckPasswordCallback = (err?: Error, isSame?: boolean) => void;

export interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    birth: Date;
    email: string;
    password: string;
    role: 'admin' | 'user';
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export class UserInstance extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    Episodes?: EpisodeInstance[];
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public phone!: string;
    public birth!: Date;
    public email!: string;
    public password!: string;
    public role!: 'admin' | 'user';

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public checkPassword(password: string, callbackfn: CheckPasswordCallback): void {
        bcrypt.compare(password, this.password, (err, isSame) => {
            if (err) {
                callbackfn(err, false);
            } else {
                callbackfn(undefined, isSame);
            }
        });
    }
}

UserInstance.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        firstName: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        lastName: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        phone: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        birth: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        email: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            },
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        role: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                isIn: [['admin', 'user']],
            },
        },
    },
    {
        sequelize: database,
        modelName: 'User',
        tableName: 'users',
        hooks: {
            beforeSave: async (user) => {
                if (user.isNewRecord || user.changed('password')) {
                    user.password = await bcrypt.hash(user.password.toString(), 10);
                }
            },
        },
    }
);

export default UserInstance;
