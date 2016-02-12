'use strict';
var Promise = require('bluebird');
function createAction(type, mapper) {
    return function (data) {
        return {
            type: type,
            payload: mapper(data)
        };
    };
}
exports.createAction = createAction;
function createAsyncAction(type, mapper) {
    return createAction(type, function (data) {
        return {
            data: data,
            promise: Promise.resolve(mapper(data))
        };
    });
}
exports.createAsyncAction = createAsyncAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQU8sT0FBTyxXQUFXLFVBQVUsQ0FBQyxDQUFDO0FBc0JyQyxzQkFBbUMsSUFBZ0IsRUFBRSxNQUFvQjtJQUNyRSxNQUFNLENBQUMsVUFBQyxJQUFPO1FBQ1gsTUFBTSxDQUFDO1lBQ0gsTUFBQSxJQUFJO1lBQ0osT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDeEIsQ0FBQztJQUNOLENBQUMsQ0FBQztBQUNOLENBQUM7QUFQZSxvQkFBWSxlQU8zQixDQUFBO0FBRUQsMkJBQ0ksSUFBZ0IsRUFDaEIsTUFBNkI7SUFFN0IsTUFBTSxDQUFDLFlBQVksQ0FBOEIsSUFBSSxFQUFFLFVBQUEsSUFBSTtRQUN2RCxNQUFNLENBQUM7WUFDSCxNQUFBLElBQUk7WUFDSixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekMsQ0FBQTtJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVZlLHlCQUFpQixvQkFVaEMsQ0FBQSJ9