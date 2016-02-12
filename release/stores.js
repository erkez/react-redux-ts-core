'use strict';
var redux_1 = require('redux');
var middlewares = require('./middlewares');
function createDefaultStore(reducer, initialState) {
    var extraMiddlewares = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        extraMiddlewares[_i - 2] = arguments[_i];
    }
    return redux_1.applyMiddleware.apply(void 0, [middlewares.promise].concat(extraMiddlewares))(redux_1.createStore)(reducer, initialState);
}
exports.createDefaultStore = createDefaultStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3N0b3Jlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixzQkFBNEUsT0FBTyxDQUFDLENBQUE7QUFDcEYsSUFBWSxXQUFXLFdBQU0sZUFBZSxDQUFDLENBQUE7QUFFN0MsNEJBQ0ksT0FBb0IsRUFDcEIsWUFBZ0I7SUFDaEIsMEJBQXFDO1NBQXJDLFdBQXFDLENBQXJDLHNCQUFxQyxDQUFyQyxJQUFxQztRQUFyQyx5Q0FBcUM7O0lBRXJDLE1BQU0sQ0FBQyx1QkFBZSxnQkFBSSxXQUFXLENBQUMsT0FBTyxTQUFLLGdCQUFnQixFQUFDLENBQzlELG1CQUFXLENBQUMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDN0MsQ0FBQztBQVBlLDBCQUFrQixxQkFPakMsQ0FBQSJ9