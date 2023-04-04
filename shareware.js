/** @param {NS} ns */
export async function main(ns) {

	ns.disableLog('ALL');
	let currentServers = ns.getPurchasedServers().length;
	let prefix = "hellfyre-"

	for (let i = 0; i < currentServers; ++i) {
		let server = prefix + "" + i;
		ns.killall(server);
		await ns.exec("share.js", server, Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / ns.getScriptRam("share.js")));
		ns.print("Started Server: " + server);
	}
}