'use strict';
var identity = function (x) { return x; };
function createReducer(initialState, configuration) {
    return function (state, action) {
        if (state === void 0) { state = initialState; }
        var reducer = configuration[action.type];
        if (reducer == null) {
            return state;
        }
        else if (typeof reducer === 'function') {
            return reducer(state, action.payload);
        }
        else if (typeof reducer === 'object') {
            var status_1 = action.meta && action.meta.status || null;
            var pending = reducer.pending || identity;
            var fulfilled = reducer.fulfilled || identity;
            var rejected = reducer.rejected || identity;
            switch (status_1) {
                case 'pending':
                    return pending(state, action.payload);
                case 'fulfilled':
                    return fulfilled(state, action.payload);
                case 'rejected':
                    return rejected(state, action.error);
                default:
                    return state;
            }
        }
        else {
            throw new Error('Invalid `createReducer` configuration.');
        }
    };
}
exports.createReducer = createReducer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVkdWNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBbUJiLElBQU0sUUFBUSxHQUFHLFVBQUMsQ0FBTSxJQUFLLE9BQUEsQ0FBQyxFQUFELENBQUMsQ0FBQztBQUUvQix1QkFBaUMsWUFBZSxFQUFFLGFBQXNDO0lBQ3BGLE1BQU0sQ0FBQyxVQUFDLEtBQW9CLEVBQUUsTUFBbUI7UUFBekMscUJBQW9CLEdBQXBCLG9CQUFvQjtRQUN4QixJQUFJLE9BQU8sR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxRQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUM7WUFDdkQsSUFBSSxPQUFPLEdBQTJCLE9BQXdDLENBQUMsT0FBTyxJQUFJLFFBQVEsQ0FBQztZQUNuRyxJQUFJLFNBQVMsR0FBMkIsT0FBd0MsQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDO1lBQ3ZHLElBQUksUUFBUSxHQUE2QixPQUF3QyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUM7WUFFdkcsTUFBTSxDQUFDLENBQUMsUUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDYixLQUFLLFNBQVM7b0JBQ1YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMxQyxLQUFLLFdBQVc7b0JBQ1osTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QyxLQUFLLFVBQVU7b0JBQ1gsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QztvQkFDSSxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ3JCLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7UUFDOUQsQ0FBQztJQUNMLENBQUMsQ0FBQztBQUNOLENBQUM7QUE1QmUscUJBQWEsZ0JBNEI1QixDQUFBIn0=