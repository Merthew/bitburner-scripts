/** @param {NS} ns */
export async function main(ns) {

	//kick off the recursive function with a call to home
	await backdoor("home", "home");

	async function backdoor(parent, server) {
		//connect to the given server
		await ns.singularity.connect(server);
		//run basic hacking scripts if they are found on the home server
		if (ns.fileExists("BruteSSH.exe", "home")) { await ns.brutessh(server); }
		if (ns.fileExists("FTPCrack.exe", "home")) { await ns.ftpcrack(server); }
		if (ns.fileExists("relaySMTP.exe", "home")) { await ns.relaysmtp(server); }
		if (ns.fileExists("HTTPWorm.exe", "home")) { await ns.httpworm(server); }
		if (ns.fileExists("SQLInject.exe", "home")) { await ns.sqlinject(server); }
		//try catch to stop error messages when nuke fails
		try { await ns.nuke(server); } catch { }

		//if you can backdoor, there isn't already a backdoor, 
		//and you opened all the ports, install a backdoor.
		//COMMENT THIS WHOLE STATEMENT OUT IF YOU DO NOT HAVE SINGULARITY FUNCTIONS UNLOCKED
		if (ns.getServer(server).requiredHackingSkill < await ns.getHackingLevel() &&
			ns.getServer(server).backdoorInstalled == false &&
			ns.getServer(server).hasAdminRights == true) {
			await ns.singularity.installBackdoor();
		}
		//scan the current server for the next recursion
		let tree = await ns.scan(server);
		//for all subsequent servers that aren't the parent, recurse
		for (let sub of tree) {
			if (sub != parent) {
				await backdoor(server, sub);
				await ns.singularity.connect(server);
			}
		}
		return;
	}
}