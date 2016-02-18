'use strict';
var identity = function (x) { return x; };
function asyncActionReducer(type, defaultState, reducers) {
    var pending = reducers.pending || identity;
    var fulfilled = reducers.fulfilled || identity;
    var rejected = reducers.rejected || identity;
    return function (state, action) {
        if (state === void 0) { state = defaultState; }
        if (action.type !== type && type != null) {
            return state;
        }
        var status = action.meta && action.meta.status || null;
        switch (status) {
            case 'pending':
                return pending(state, action.payload);
            case 'fulfilled':
                return fulfilled(state, action.payload);
            case 'rejected':
                return rejected(state, action.error);
            default:
                if (type == null) {
                    return state;
                }
                throw new Error("Unexpected meta.status '" + status + "'");
        }
    };
}
exports.asyncActionReducer = asyncActionReducer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVkdWNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBZWIsSUFBTSxRQUFRLEdBQUcsVUFBQyxDQUFNLElBQUssT0FBQSxDQUFDLEVBQUQsQ0FBQyxDQUFDO0FBRS9CLDRCQUNJLElBQWdCLEVBQ2hCLFlBQWUsRUFDZixRQUFrQztJQUVsQyxJQUFJLE9BQU8sR0FBd0IsUUFBUSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUM7SUFDaEUsSUFBSSxTQUFTLEdBQXdCLFFBQVEsQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDO0lBQ3BFLElBQUksUUFBUSxHQUE0QixRQUFRLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQztJQUV0RSxNQUFNLENBQUMsVUFBQyxLQUF1QixFQUFFLE1BQW1CO1FBQTVDLHFCQUF1QixHQUF2QixvQkFBdUI7UUFDM0IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUM7UUFDdkQsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNiLEtBQUssU0FBUztnQkFDVixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUMsS0FBSyxXQUFXO2dCQUNaLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QyxLQUFLLFVBQVU7Z0JBQ1gsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDO2dCQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2pCLENBQUM7Z0JBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBMkIsTUFBTSxNQUFHLENBQUMsQ0FBQztRQUM5RCxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQTdCZSwwQkFBa0IscUJBNkJqQyxDQUFBIn0=