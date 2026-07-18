globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/badge-D9Kv96JK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fe-pFCVoV/fVxAHEQW7onLeGs+N34I\"",
		"mtime": "2026-07-17T21:36:21.564Z",
		"size": 766,
		"path": "../public/assets/badge-D9Kv96JK.js"
	},
	"/assets/about-DTyg4nUn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c3-SDEVwhx637mik4oXml7foamscUo\"",
		"mtime": "2026-07-17T21:36:21.564Z",
		"size": 963,
		"path": "../public/assets/about-DTyg4nUn.js"
	},
	"/assets/book-open-N3QWHV8E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"117-DnvXe7JKM3EjPvaGrzmctoaKzyY\"",
		"mtime": "2026-07-17T21:36:21.564Z",
		"size": 279,
		"path": "../public/assets/book-open-N3QWHV8E.js"
	},
	"/assets/arrow-right-Gpp5_pJh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-8xr0vPMhNTv+rwqutw+zrech2KE\"",
		"mtime": "2026-07-17T21:36:21.564Z",
		"size": 165,
		"path": "../public/assets/arrow-right-Gpp5_pJh.js"
	},
	"/logo.jpeg": {
		"type": "image/jpeg",
		"etag": "\"194b6-3q+R49JUAceRCYH6rNfTwiZh9Rg\"",
		"mtime": "2026-07-17T11:50:00.195Z",
		"size": 103606,
		"path": "../public/logo.jpeg"
	},
	"/assets/calendar-days-CwrQGXtW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-JNV1NgDKd1gH3rAAgl+IiqtjHvM\"",
		"mtime": "2026-07-17T21:36:21.564Z",
		"size": 494,
		"path": "../public/assets/calendar-days-CwrQGXtW.js"
	},
	"/assets/calendar-plus-BCCvykhj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16a-1sdeheLPp8dEi/U3Vyy3SAm9rbc\"",
		"mtime": "2026-07-17T21:36:21.564Z",
		"size": 362,
		"path": "../public/assets/calendar-plus-BCCvykhj.js"
	},
	"/assets/calendar-B8dSMO8M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-vCcWBCaG6T9ub1clc/ljCH+IB0U\"",
		"mtime": "2026-07-17T21:36:21.564Z",
		"size": 257,
		"path": "../public/assets/calendar-B8dSMO8M.js"
	},
	"/assets/circle-check-BMmbSs6l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-Tr/tvl1HqZ187ylYAWhDdazeiek\"",
		"mtime": "2026-07-17T21:36:21.573Z",
		"size": 178,
		"path": "../public/assets/circle-check-BMmbSs6l.js"
	},
	"/assets/circle-question-mark-BrMXbtBP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-EAfJvLHtXJRj6DuR0vBbiXzS8/o\"",
		"mtime": "2026-07-17T21:36:21.573Z",
		"size": 248,
		"path": "../public/assets/circle-question-mark-BrMXbtBP.js"
	},
	"/assets/button-As5Rag4v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dbf-/eNdT9Gg3bRVRxdc1m92jwKfEeI\"",
		"mtime": "2026-07-17T21:36:21.564Z",
		"size": 3519,
		"path": "../public/assets/button-As5Rag4v.js"
	},
	"/assets/check-Dxeyoov_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-WklQjXSbhA1BHlTlHniMRlQYRmM\"",
		"mtime": "2026-07-17T21:36:21.564Z",
		"size": 124,
		"path": "../public/assets/check-Dxeyoov_.js"
	},
	"/assets/contact-CW77Lh1B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6b0-8zzV92semZ9veRJmMa4KRFrWc9Y\"",
		"mtime": "2026-07-17T21:36:21.575Z",
		"size": 1712,
		"path": "../public/assets/contact-CW77Lh1B.js"
	},
	"/assets/clock-D8_Twrcp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-9n/sGr1GRWpNzul2imEDEGV7pzs\"",
		"mtime": "2026-07-17T21:36:21.575Z",
		"size": 169,
		"path": "../public/assets/clock-D8_Twrcp.js"
	},
	"/assets/credit-card-BVPCV4Zp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-BoiLKqJuLa7NJfhtK0xHWAcdW7g\"",
		"mtime": "2026-07-17T21:36:21.578Z",
		"size": 207,
		"path": "../public/assets/credit-card-BVPCV4Zp.js"
	},
	"/assets/dist-CFrbHPtj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25b-LmS14NeqegdbhTG8cprY8wtde2M\"",
		"mtime": "2026-07-17T21:36:21.581Z",
		"size": 603,
		"path": "../public/assets/dist-CFrbHPtj.js"
	},
	"/assets/dist-COn0wzUy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e5-V9wWKPhUJVITCok6v0D94VhEc8U\"",
		"mtime": "2026-07-17T21:36:21.581Z",
		"size": 741,
		"path": "../public/assets/dist-COn0wzUy.js"
	},
	"/assets/createLucideIcon-DeQrcgrh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ab-cR1PODv03KUfJz4HloEEypYngbs\"",
		"mtime": "2026-07-17T21:36:21.578Z",
		"size": 1195,
		"path": "../public/assets/createLucideIcon-DeQrcgrh.js"
	},
	"/assets/EmptyState-D-w7ZwB2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46a-t74Th38B8XLh4vpg46SngBiTy1A\"",
		"mtime": "2026-07-17T21:36:21.562Z",
		"size": 1130,
		"path": "../public/assets/EmptyState-D-w7ZwB2.js"
	},
	"/assets/dialog-BP3NRCQN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1827-/AWZw6Z062MoDbj/Zpt4HZnKxSg\"",
		"mtime": "2026-07-17T21:36:21.581Z",
		"size": 6183,
		"path": "../public/assets/dialog-BP3NRCQN.js"
	},
	"/assets/dist-IvYBVv6m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6ccf-w4NCEkYR0mB+rRhtfviLN8a3/3A\"",
		"mtime": "2026-07-17T21:36:21.581Z",
		"size": 27855,
		"path": "../public/assets/dist-IvYBVv6m.js"
	},
	"/assets/es2015-D1ZBHyc9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6499-L7NzPNUdwYpALTwBH3et+T7RZI0\"",
		"mtime": "2026-07-17T21:36:21.586Z",
		"size": 25753,
		"path": "../public/assets/es2015-D1ZBHyc9.js"
	},
	"/assets/folder-open-DDRT2Ot1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"124-thrLnghc28oo9dwtvkjhhh+K5cs\"",
		"mtime": "2026-07-17T21:36:21.588Z",
		"size": 292,
		"path": "../public/assets/folder-open-DDRT2Ot1.js"
	},
	"/assets/graduation-cap-B2HH3Oak.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14c-SHvHXntGHgo/GJV1T88Pp+JciLc\"",
		"mtime": "2026-07-17T21:36:21.588Z",
		"size": 332,
		"path": "../public/assets/graduation-cap-B2HH3Oak.js"
	},
	"/assets/hero-students-BN79srCV.jpg": {
		"type": "image/jpeg",
		"etag": "\"23dea-K1vBcBXHtFKeBSAKEfS6TI0bTbE\"",
		"mtime": "2026-07-17T21:36:21.643Z",
		"size": 146922,
		"path": "../public/assets/hero-students-BN79srCV.jpg"
	},
	"/assets/input-LhK6mnjp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26c-kh/nkaGhNid4p9BWc5CCWdzR/G0\"",
		"mtime": "2026-07-17T21:36:21.590Z",
		"size": 620,
		"path": "../public/assets/input-LhK6mnjp.js"
	},
	"/assets/jsx-runtime-bzQ4Vb5N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d8-vMfP+4a4ykIjbw4InHkj3E5HWt0\"",
		"mtime": "2026-07-17T21:36:21.590Z",
		"size": 8408,
		"path": "../public/assets/jsx-runtime-bzQ4Vb5N.js"
	},
	"/assets/label-kGHdjTwF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"270-ZMCsWeWIc50ZZtP21qIw80CZfww\"",
		"mtime": "2026-07-17T21:36:21.590Z",
		"size": 624,
		"path": "../public/assets/label-kGHdjTwF.js"
	},
	"/assets/library-D93X8oKu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-hkaRMZRZx5zd/X3hprAsLkrBC4U\"",
		"mtime": "2026-07-17T21:36:21.594Z",
		"size": 230,
		"path": "../public/assets/library-D93X8oKu.js"
	},
	"/assets/link-Qnv0uJRQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b4c-2jk4GAxUvUOvJ7/JA6PrggzYTMg\"",
		"mtime": "2026-07-17T21:36:21.594Z",
		"size": 23372,
		"path": "../public/assets/link-Qnv0uJRQ.js"
	},
	"/assets/login-Drq5MV7G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c2b-ZZgPG47sHe82M4AADzIPGrcqRV8\"",
		"mtime": "2026-07-17T21:36:21.594Z",
		"size": 3115,
		"path": "../public/assets/login-Drq5MV7G.js"
	},
	"/assets/logo-CXk_pxsf.jpeg": {
		"type": "image/jpeg",
		"etag": "\"194b6-3q+R49JUAceRCYH6rNfTwiZh9Rg\"",
		"mtime": "2026-07-17T21:36:21.644Z",
		"size": 103606,
		"path": "../public/assets/logo-CXk_pxsf.jpeg"
	},
	"/assets/logo-wX154kwb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8-elUqX/68YxsQJx/wN0rgGjLA9L8\"",
		"mtime": "2026-07-17T21:36:21.594Z",
		"size": 232,
		"path": "../public/assets/logo-wX154kwb.js"
	},
	"/assets/mail-D5EjLbs_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-pn1AIVgiM+qm7eSCKJuZc3HExZQ\"",
		"mtime": "2026-07-17T21:36:21.597Z",
		"size": 213,
		"path": "../public/assets/mail-D5EjLbs_.js"
	},
	"/assets/message-square-C_ns0vGW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-QSTWthbi63/cG4opp/7v4AhGMQs\"",
		"mtime": "2026-07-17T21:36:21.597Z",
		"size": 233,
		"path": "../public/assets/message-square-C_ns0vGW.js"
	},
	"/assets/phone-e_0VIek9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"142-5lGnOhoMeXIq6IDtoa8zOjKrtTA\"",
		"mtime": "2026-07-17T21:36:21.597Z",
		"size": 322,
		"path": "../public/assets/phone-e_0VIek9.js"
	},
	"/assets/PortalShell-bS1lvIwd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15fa-Jl5qCeh7bJmkF+qvwHZsPfu+fU4\"",
		"mtime": "2026-07-17T21:36:21.562Z",
		"size": 5626,
		"path": "../public/assets/PortalShell-bS1lvIwd.js"
	},
	"/assets/react-dom-DUKFG4MT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dda-2jwqka4uWIJMCW44vChkyRB+fA4\"",
		"mtime": "2026-07-17T21:36:21.601Z",
		"size": 3546,
		"path": "../public/assets/react-dom-DUKFG4MT.js"
	},
	"/assets/register-B-j3SCNi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2272-4jXItDFinZG+gZYbaQjSrDCJ2cI\"",
		"mtime": "2026-07-17T21:36:21.602Z",
		"size": 8818,
		"path": "../public/assets/register-B-j3SCNi.js"
	},
	"/assets/routes-B118keoy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a1c-AaeLvRqBbbT0UdBLINfYtKzkhZE\"",
		"mtime": "2026-07-17T21:36:21.602Z",
		"size": 10780,
		"path": "../public/assets/routes-B118keoy.js"
	},
	"/assets/select-BdDyzdru.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c20e-NHdqayioaLO3Q0hXA1vLZv+PFiE\"",
		"mtime": "2026-07-17T21:36:21.602Z",
		"size": 49678,
		"path": "../public/assets/select-BdDyzdru.js"
	},
	"/assets/shield-check-DRzoqlHD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-iO/tYQHTO9QhR8R/dBMGVcYHM3w\"",
		"mtime": "2026-07-17T21:36:21.602Z",
		"size": 320,
		"path": "../public/assets/shield-check-DRzoqlHD.js"
	},
	"/assets/SiteFooter-BYEXhl3h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16c1-UvI1k9m3N9BQbhUraoe0I+9ahX8\"",
		"mtime": "2026-07-17T21:36:21.562Z",
		"size": 5825,
		"path": "../public/assets/SiteFooter-BYEXhl3h.js"
	},
	"/assets/staff-login-DKpFuQX1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"985-/4PiFvtc5ZHG1wtoBUyET+9uzks\"",
		"mtime": "2026-07-17T21:36:21.602Z",
		"size": 2437,
		"path": "../public/assets/staff-login-DKpFuQX1.js"
	},
	"/assets/index-36PZ3jE1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8902d-uEOHXUFpP7Hu1CwRkIpPQxzToyo\"",
		"mtime": "2026-07-17T21:36:21.558Z",
		"size": 561197,
		"path": "../public/assets/index-36PZ3jE1.js"
	},
	"/assets/send-CH6TslAQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-RsDvAgnzcl9/ed7VYtxcPx4/bY0\"",
		"mtime": "2026-07-17T21:36:21.602Z",
		"size": 290,
		"path": "../public/assets/send-CH6TslAQ.js"
	},
	"/assets/hero-image2-h6Wu8Ypi.png": {
		"type": "image/png",
		"etag": "\"202b7a-7jlX4PCj5sxZp0foLCNT/WKn12A\"",
		"mtime": "2026-07-17T21:36:21.635Z",
		"size": 2108282,
		"path": "../public/assets/hero-image2-h6Wu8Ypi.png"
	},
	"/assets/hero-image3-BDyarr4v.png": {
		"type": "image/png",
		"etag": "\"1f6754-CSOeeXfkb2NCaitx7OLyTgWd/TI\"",
		"mtime": "2026-07-17T21:36:21.635Z",
		"size": 2058068,
		"path": "../public/assets/hero-image3-BDyarr4v.png"
	},
	"/assets/staff-wXMPJZNY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"495-hYT7xyh/tmohTQchRpVDn3VylkY\"",
		"mtime": "2026-07-17T21:36:21.602Z",
		"size": 1173,
		"path": "../public/assets/staff-wXMPJZNY.js"
	},
	"/assets/staff.bookings-WRfrlH6j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1904-ipOV4S+LTreBf7qfrq5x5cuf4fc\"",
		"mtime": "2026-07-17T21:36:21.602Z",
		"size": 6404,
		"path": "../public/assets/staff.bookings-WRfrlH6j.js"
	},
	"/assets/staff.index-Bpi1DC6s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"60ef-NuDb1S/Ht8Mn4JK/1WczcvcNd9Y\"",
		"mtime": "2026-07-17T21:36:21.610Z",
		"size": 24815,
		"path": "../public/assets/staff.index-Bpi1DC6s.js"
	},
	"/assets/staff.messages-CsVB1fzj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc7-y5S7u1VZBRkWefdGr3TkTnSMKmk\"",
		"mtime": "2026-07-17T21:36:21.610Z",
		"size": 3015,
		"path": "../public/assets/staff.messages-CsVB1fzj.js"
	},
	"/assets/hero-image4-BKGcMY4H.png": {
		"type": "image/png",
		"etag": "\"1ebbb4-U/LFMdSkjNsNXoGR5JSUTfPfGeo\"",
		"mtime": "2026-07-17T21:36:21.635Z",
		"size": 2014132,
		"path": "../public/assets/hero-image4-BKGcMY4H.png"
	},
	"/assets/staff.resources-sDDhKTTK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1718-pP+Z3bvuUY1/0u6Z+E8uOqQgcOU\"",
		"mtime": "2026-07-17T21:36:21.612Z",
		"size": 5912,
		"path": "../public/assets/staff.resources-sDDhKTTK.js"
	},
	"/assets/student-BO_1Q2n5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"850-FjEDp88yWVcVWm1gQj3AeYv0+18\"",
		"mtime": "2026-07-17T21:36:21.612Z",
		"size": 2128,
		"path": "../public/assets/student-BO_1Q2n5.js"
	},
	"/assets/staff.students-DJWJtnb4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"251-vdNf07X+D5YPU8C9PRO3iSjRsYA\"",
		"mtime": "2026-07-17T21:36:21.612Z",
		"size": 593,
		"path": "../public/assets/staff.students-DJWJtnb4.js"
	},
	"/assets/student.book-BEYjlkvS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"80c-IU7FWPt/hMkyHFVLhRAH5peyoLk\"",
		"mtime": "2026-07-17T21:36:21.618Z",
		"size": 2060,
		"path": "../public/assets/student.book-BEYjlkvS.js"
	},
	"/assets/student-login-CE4M1X63.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be7-bB10A+Zm7ko4N028kFedAUmmg0I\"",
		"mtime": "2026-07-17T21:36:21.612Z",
		"size": 3047,
		"path": "../public/assets/student-login-CE4M1X63.js"
	},
	"/assets/staff.verifications-BEBn_yoC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1202-/yMdyQdUzaw9PjicG3lU6OG4b/E\"",
		"mtime": "2026-07-17T21:36:21.612Z",
		"size": 4610,
		"path": "../public/assets/staff.verifications-BEBn_yoC.js"
	},
	"/assets/student.grades-BrMCmalD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19f-UZUg/3ew3nVuGyjG2pzqYDWEKoE\"",
		"mtime": "2026-07-17T21:36:21.618Z",
		"size": 415,
		"path": "../public/assets/student.grades-BrMCmalD.js"
	},
	"/assets/student.index-mGXTkmRl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6d2-ml/T+71C8R+oljKzFcdHWX/vu54\"",
		"mtime": "2026-07-17T21:36:21.618Z",
		"size": 1746,
		"path": "../public/assets/student.index-mGXTkmRl.js"
	},
	"/assets/student-signup-Dzkmp3Bm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b7-mgeKpLQtSlOnJSea95SKaTmFXoo\"",
		"mtime": "2026-07-17T21:36:21.612Z",
		"size": 1463,
		"path": "../public/assets/student-signup-Dzkmp3Bm.js"
	},
	"/assets/student.library-C3Y58wRZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18c-O1kwTqIrmOeUux6nXlixWBGWTXg\"",
		"mtime": "2026-07-17T21:36:21.620Z",
		"size": 396,
		"path": "../public/assets/student.library-C3Y58wRZ.js"
	},
	"/assets/student.messages-DGWjzdLQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"342-G54L/Q6EIX+2szRs3QtsfhZN6dQ\"",
		"mtime": "2026-07-17T21:36:21.620Z",
		"size": 834,
		"path": "../public/assets/student.messages-DGWjzdLQ.js"
	},
	"/assets/student.payment-DxX53nXB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5e2-xpGs6A66PCywLdY2pP89OrGTwCM\"",
		"mtime": "2026-07-17T21:36:21.620Z",
		"size": 1506,
		"path": "../public/assets/student.payment-DxX53nXB.js"
	},
	"/assets/student.plan-DbiaN4Go.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a4-ykhutfiJu69sNco+V852c9IqK/o\"",
		"mtime": "2026-07-17T21:36:21.620Z",
		"size": 420,
		"path": "../public/assets/student.plan-DbiaN4Go.js"
	},
	"/assets/student.profile-DYXY3xQb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa3-jiE3X3kWF3ccIIAigziOuWBltIM\"",
		"mtime": "2026-07-17T21:36:21.620Z",
		"size": 4003,
		"path": "../public/assets/student.profile-DYXY3xQb.js"
	},
	"/assets/student.quizzes-CRTi0_i9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a3-3eVym6qmgdrAVGnC1Tih29MqW/0\"",
		"mtime": "2026-07-17T21:36:21.625Z",
		"size": 419,
		"path": "../public/assets/student.quizzes-CRTi0_i9.js"
	},
	"/assets/student.subjects-D4H3TVK2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"514-9eztb2Cwr0UwdCqTHYEXzZo3kUA\"",
		"mtime": "2026-07-17T21:36:21.625Z",
		"size": 1300,
		"path": "../public/assets/student.subjects-D4H3TVK2.js"
	},
	"/assets/student.timetable-BcE9BmrT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"189-OBAG19GoW8cArLx/7BkzptoOCmg\"",
		"mtime": "2026-07-17T21:36:21.627Z",
		"size": 393,
		"path": "../public/assets/student.timetable-BcE9BmrT.js"
	},
	"/assets/styles-Bfyfj86m.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"176a0-cFmSqr21r6+j8gv43BjsujhUpIc\"",
		"mtime": "2026-07-17T21:36:21.646Z",
		"size": 95904,
		"path": "../public/assets/styles-Bfyfj86m.css"
	},
	"/assets/subscription-DwGj41sl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d9f-eaW2pRSXLKKBX9UyhtAB4GGC1XU\"",
		"mtime": "2026-07-17T21:36:21.629Z",
		"size": 3487,
		"path": "../public/assets/subscription-DwGj41sl.js"
	},
	"/assets/textarea-7Z0QimFw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"206-QOYKJOpt63rkXCLXVmvUZh+zyMw\"",
		"mtime": "2026-07-17T21:36:21.630Z",
		"size": 518,
		"path": "../public/assets/textarea-7Z0QimFw.js"
	},
	"/assets/trash-2-BpLdmyES.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ac-ib3ui0Hk4okYQOUUHHLiqz6voDs\"",
		"mtime": "2026-07-17T21:36:21.630Z",
		"size": 428,
		"path": "../public/assets/trash-2-BpLdmyES.js"
	},
	"/assets/user-check-BO3ajyUx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f3-ErauBwGk8SRx86yc5YiR/p5WnJk\"",
		"mtime": "2026-07-17T21:36:21.630Z",
		"size": 243,
		"path": "../public/assets/user-check-BO3ajyUx.js"
	},
	"/assets/user-plus-BdMruJql.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-VNjkQfvIpQ2VgRPRws2sF0Lohe0\"",
		"mtime": "2026-07-17T21:36:21.630Z",
		"size": 310,
		"path": "../public/assets/user-plus-BdMruJql.js"
	},
	"/assets/upload-DsjEK5H6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-r2McfsMs+85JBYposxMq76ztwRo\"",
		"mtime": "2026-07-17T21:36:21.630Z",
		"size": 230,
		"path": "../public/assets/upload-DsjEK5H6.js"
	},
	"/assets/user-pyZC6JLG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-Gw8LYGVEwXkbdTqIty2ubwPbuU8\"",
		"mtime": "2026-07-17T21:36:21.635Z",
		"size": 196,
		"path": "../public/assets/user-pyZC6JLG.js"
	},
	"/assets/users-CG7u0fQJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-wWfimSN61SYTEe2q/H2sFjGBhIM\"",
		"mtime": "2026-07-17T21:36:21.635Z",
		"size": 306,
		"path": "../public/assets/users-CG7u0fQJ.js"
	},
	"/assets/x-DSHPaOOl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-9TrLs6zesrrKO5/Jp4+l+qQ540I\"",
		"mtime": "2026-07-17T21:36:21.635Z",
		"size": 154,
		"path": "../public/assets/x-DSHPaOOl.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_9EvNOA = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_9EvNOA
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
