import { SaveDBCommand } from '@commands/saveDBCommand';
import { addLazyCommand } from '@engine/Commands/Command';
import { loadDatabaseList, saveDatabaseList } from '@engine/tasks';
import { User } from '@models';
import { List } from 'immutable';
import { AnyAction } from 'redux';
import { UsersActions } from './actions';
import { UsersTools } from './UsersTools';

const INITIAL_STATE: IUsersState = List();
const DATABASE = 'users';

export type IUsersState = List<User>;

export const usersReducers = (state: IUsersState = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {

    case UsersActions.REGISTER:
      const newUser: User = action.user;
      newUser.id = state.size;
      addLazyCommand(new SaveDBCommand());
      return state.push(newUser);

    case UsersActions.LOGIN:
      const userIndexLogin = state.findIndex(user => user.name === action.username);

      return state.update(userIndexLogin, (user: User) => ({ ...user, token: action.token }));

    case UsersActions.LOGOUT:
      const userIndexLogout = state.findIndex(user => user.token === action.token);

      return state.update(userIndexLogout, (user: User) => ({ ...user, token: undefined }));

    case UsersActions.LOAD_DATABASE:
      const load = loadDatabaseList({ databaseName: DATABASE, modelHydrater: UsersTools.hydrater }) as IUsersState;
      return load;

    case UsersActions.SAVE_DATABASE:
      saveDatabaseList(DATABASE, state, UsersTools.serializer);
      return state;
    default:
      return state;
  }
};
