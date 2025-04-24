/**
 * School model schema defining field types and constraints
 * @typedef {Object} SchoolModel
 * @property {Object} id - Primary key configuration
 * @property {Object} name - School name configuration
 * @property {Object} address - School address configuration
 * @property {Object} latitude - School latitude coordinate configuration
 * @property {Object} longitude - School longitude coordinate configuration
 */
const schoolModel = {
  id: { 
    type: 'INT', 
    primaryKey: true, 
    autoIncrement: true,
    description: 'Unique identifier for the school'
  },
  name: { 
    type: 'VARCHAR(255)', 
    notNull: true,
    description: 'Name of the school'
  },
  address: { 
    type: 'VARCHAR(255)', 
    notNull: true,
    description: 'Physical address of the school'
  },
  latitude: { 
    type: 'FLOAT', 
    notNull: true,
    description: 'Geographical latitude coordinate'
  },
  longitude: { 
    type: 'FLOAT', 
    notNull: true,
    description: 'Geographical longitude coordinate'
  }
};

export default schoolModel;