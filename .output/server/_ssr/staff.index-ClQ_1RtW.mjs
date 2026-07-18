import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { n as objectType, r as stringType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staff.index-ClQ_1RtW.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var activateStudentAccount_createServerFn_handler = createServerRpc({
	id: "ffc20378f5eb091fd032d20ee416a314002c6194bd88eda6e8ff3a98241806cd",
	name: "activateStudentAccount",
	filename: "src/routes/staff.index.tsx"
}, (opts) => activateStudentAccount.__executeServer(opts));
var activateStudentAccount = createServerFn({ method: "POST" }).validator(objectType({ registrationId: stringType() })).handler(activateStudentAccount_createServerFn_handler, async ({ data }) => {
	const { activateStudent } = await import("./admin-actions-Dr_S6PX-.mjs");
	return activateStudent(data.registrationId);
});
var sendReminderEmails_createServerFn_handler = createServerRpc({
	id: "9b3631870f244f1cf831731ac37bf3d80405d4f4d767853b2d6e37e76ef37c75",
	name: "sendReminderEmails",
	filename: "src/routes/staff.index.tsx"
}, (opts) => sendReminderEmails.__executeServer(opts));
var sendReminderEmails = createServerFn({ method: "POST" }).validator(objectType({
	recipients: arrayType(objectType({
		email: stringType(),
		name: stringType(),
		amount: stringType()
	})),
	messageTemplate: stringType()
})).handler(sendReminderEmails_createServerFn_handler, async ({ data }) => {
	const { sendPaymentReminders } = await import("./admin-actions-Dr_S6PX-.mjs");
	return sendPaymentReminders(data.recipients, data.messageTemplate);
});
//#endregion
export { activateStudentAccount_createServerFn_handler, sendReminderEmails_createServerFn_handler };
