const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    // check if there isa current userId
    // GOTCHA: Be sure to spell out 'request', do not shorten it to req
    if ( !ctx.request.userId ) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  async users( parent, args, ctx, info ) {
    // Check if logged in.
    if( !ctx.request.userId ) { // TODO: helper: can make this a function that isLoggedIn()
      throw new Error('Please log in.');
    }
    // 2. Check if the useer has the permissions to query all the users.
    hasPermission( ctx.request.user, ['ADMIN', 'PERMISSIONSUPDATE'] );
    // 3. Query all users
    return ctx.db.query.users( {}, info );
  }
};

module.exports = Query;
