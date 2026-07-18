//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-BWInSfTu.js
var manifest = {
	"9b3631870f244f1cf831731ac37bf3d80405d4f4d767853b2d6e37e76ef37c75": {
		functionName: "sendReminderEmails_createServerFn_handler",
		importer: () => import("./_ssr/staff.index-ClQ_1RtW.mjs")
	},
	"ffc20378f5eb091fd032d20ee416a314002c6194bd88eda6e8ff3a98241806cd": {
		functionName: "activateStudentAccount_createServerFn_handler",
		importer: () => import("./_ssr/staff.index-ClQ_1RtW.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
