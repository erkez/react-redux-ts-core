'use strict';
var identity = function (x) { return x; };
function asyncActionReducer(type, defaultState, reducers) {
    var pending = reducers.pending || identity;
    var fulfilled = reducers.fulfilled || identity;
    var rejected = reducers.rejected || identity;
    return function (state, action) {
        if (state === void 0) { state = defaultState; }
        if (action.type !== type) {
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
                throw new Error("Unexpected meta.status '" + status + "'");
        }
    };
}
exports.asyncActionReducer = asyncActionReducer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVkdWNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBZWIsSUFBTSxRQUFRLEdBQUcsVUFBQyxDQUFNLElBQUssT0FBQSxDQUFDLEVBQUQsQ0FBQyxDQUFDO0FBRS9CLDRCQUNJLElBQWdCLEVBQ2hCLFlBQWUsRUFDZixRQUFrQztJQUVsQyxJQUFJLE9BQU8sR0FBd0IsUUFBUSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUM7SUFDaEUsSUFBSSxTQUFTLEdBQXdCLFFBQVEsQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDO0lBQ3BFLElBQUksUUFBUSxHQUE0QixRQUFRLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQztJQUV0RSxNQUFNLENBQUMsVUFBQyxLQUF1QixFQUFFLE1BQW1CO1FBQTVDLHFCQUF1QixHQUF2QixvQkFBdUI7UUFDM0IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDYixLQUFLLFNBQVM7Z0JBQ1YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFDLEtBQUssV0FBVztnQkFDWixNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUMsS0FBSyxVQUFVO2dCQUNYLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QztnQkFDSSxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUEyQixNQUFNLE1BQUcsQ0FBQyxDQUFDO1FBQzlELENBQUM7SUFDTCxDQUFDLENBQUM7QUFDTixDQUFDO0FBMUJlLDBCQUFrQixxQkEwQmpDLENBQUEifQ==