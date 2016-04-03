'use strict';
var Promise = require('bluebird');
function promise() {
    return function (next) { return function (action) {
        if (typeof action.payload !== 'object' ||
            !(action.payload.promise instanceof Promise)) {
            return next(action);
        }
        var type = action.type;
        var payload = action.payload;
        var meta = { status: 'pending' };
        next({
            type: type,
            payload: payload.data,
            meta: meta
        });
        return payload.promise
            .tap(function (payload) {
            meta.status = 'fulfilled';
            next({ type: type, payload: payload, meta: meta });
        })
            .catch(function (error) {
            meta.status = 'rejected';
            next({ type: type, error: error, meta: meta });
            throw error;
        });
    }; };
}
exports.promise = promise;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbWlkZGxld2FyZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBTyxPQUFPLFdBQVcsVUFBVSxDQUFDLENBQUM7QUFVckM7SUFDSSxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxVQUFDLE1BQTBCO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLE9BQU8sS0FBSyxRQUFRO1lBQ2xDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sWUFBWSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBRUQsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN6QixJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQU0sSUFBSSxHQUFHLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxDQUFDO1FBRW5DLElBQUksQ0FBQztZQUNELE1BQUEsSUFBSTtZQUNKLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSTtZQUNyQixNQUFBLElBQUk7U0FDUCxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU87YUFDakIsR0FBRyxDQUFDLFVBQUEsT0FBTztZQUNSLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1lBQzFCLElBQUksQ0FBQyxFQUFDLE1BQUEsSUFBSSxFQUFFLFNBQUEsT0FBTyxFQUFFLE1BQUEsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLO1lBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7WUFDekIsSUFBSSxDQUFDLEVBQUMsTUFBQSxJQUFJLEVBQUUsT0FBQSxLQUFLLEVBQUUsTUFBQSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sS0FBSyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxFQTFCYyxDQTBCZCxDQUFDO0FBQ04sQ0FBQztBQTVCZSxlQUFPLFVBNEJ0QixDQUFBIn0=