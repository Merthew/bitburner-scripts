export async function main(ns) {

	ns.disableLog('ALL');
	let index = 0;
	let serverLimit = ns.getPurchasedServerLimit();
	let currentServers = ns.getPurchasedServers().length;
	let prefix = "hellfyre-"

	for (let i = 0; i < currentServers; ++i) {
		if (ns.getServerMaxRam(prefix + i) < ns.getServerMaxRam(prefix + index)) {
			index = i;
		}
	}

	while (true) {
		if (currentServers < serverLimit) {
			await purchase(8);
			currentServers = ns.getPurchasedServers().length;
		}
		else {
			let increment = await upgrade(ns, index);
			if (increment) {
				++index;
			}
			if (index >= serverLimit) {
				index = 0;
			}
		}
		await ns.sleep(1000);
	}

	async function purchase(ram) {
		let prefix = "hellfyre-"
		let cost = 55000 * ram;
		let currentFunds = ns.getServerMoneyAvailable("home");
		if (currentFunds > cost * 2) {
			let newServer = prefix + "" + currentServers;
			await ns.purchaseServer(newServer, ram);
			await ns.scp("share.js", newServer);
			await ns.scp("hack.js", newServer);
			ns.print("Started Server: " + newServer);
			return true;
		}
		return false;
	}

	async function upgrade(ns, i) {
		let prefix = "hellfyre-";
		let server = prefix + "" + i;
		let currentRam = ns.getServerMaxRam(server);
		let targetRam = currentRam * 2;
		let cost = ns.getPurchasedServerCost(currentRam);
		let currentFunds = ns.getServerMoneyAvailable("home");
		if (currentFunds >= 2 * cost && targetRam <= ns.getPurchasedServerMaxRam()) {
			ns.upgradePurchasedServer(server, targetRam);
			let runningScripts = ns.ps(server);
			ns.killall(server);
			if (runningScripts.length > 0) {
				let scriptArgs = runningScripts[0].args;
				if (scriptArgs.length > 0) {
					await ns.exec(runningScripts[0].filename, server, Math.floor(targetRam / ns.getScriptRam(runningScripts[0].filename)), scriptArgs[0]);
				}
				else{
					await ns.exec(runningScripts[0].filename, server, Math.floor(targetRam / ns.getScriptRam(runningScripts[0].filename)));
				}
			}
			ns.print("Upgraded Server: " + server + " to " + targetRam, "success")
			return true;
		}
		return false;
	}
}

