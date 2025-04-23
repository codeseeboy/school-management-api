// School model definition - represents the schools table structure
const SchoolModel = {
  id: {
    type: 'int',
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: 'varchar',
    required: true
  },
  address: {
    type: 'varchar',
    required: true
  },
  latitude: {
    type: 'float',
    required: true
  },
  longitude: {
    type: 'float',
    required: true
  },
  created_at: {
    type: 'timestamp',
    defaultValue: 'CURRENT_TIMESTAMP'
  },
  updated_at: {
    type: 'timestamp',
    defaultValue: 'CURRENT_TIMESTAMP'
  }
};

module.exports = SchoolModel;
