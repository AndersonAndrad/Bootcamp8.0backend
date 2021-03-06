// dependencies
import Sequelize from 'sequelize';
import Mongoose from 'mongoose';

// database config
import config from '../config/database';

// models
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appoitment';

const models = [User, File, Appointment];

class Database {
  constructor(){
    this.init();
    this.mongo();
  }

  init(){
    this.connection = new Sequelize(config);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo(){
    this.mongoConnection = Mongoose.connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true
      }
    )
  }
}

export default new Database();