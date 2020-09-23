import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
      },
      passwordHash: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {}
  );
  User.associate = models => {
    // associations can be defined here
  };

  /**
   * This is a class method, it is not called on an individual
   * user object, but rather the class as a whole.
   * e.g. User.generatePasswordHash('password1234')
   * @param {string} password a supplied plain text password
   * @returns {Promise} a promise that will resolve a bcrypt hash value
   */
  User.generatePasswordHash = password => {
    return bcrypt.hash(password, 10);
  };

  /**
   * This is a class method, it is not called on an individual
   * user object, but rather the class as a whole.
   * e.g. User.authenticate('user1', 'password1234')
   * @param {string} email user's email
   * @param {string} password user's password
   * @returns {User | null} the authenticated user or null
   */
  User.authenticate = (email, password) => {
    // bcrypt is a one-way hashing algorithm that allows us to
    // store strings on the database rather than the raw
    // passwords. Check out the docs for more detail
    return User.findOne({ where: { email } })
      .then(user => {
        if (user) {
          return bcrypt
            .compare(password, user.passwordHash)
            .then(result => (result ? user : null));
        }

        return null;
      })
      .catch(err => err);
  };
  return User;
};
