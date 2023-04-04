/** @param {NS} ns */
export async function main(ns) {
    if(ns.args.includes("-m")){
        ns.tail();
    }

    let target = ns.args[0];
    let hackScriptCost = ns.getScriptRam("hack.js");

    //Pull from serverlist
    let serversToHack = ns.read("serverlist.txt").split("\n");
    if (ns.args.includes("-h")) {
        for (let i = 0; i < ns.getPurchasedServers().length; ++i) {
            serversToHack.push("hellfyre-" + i);
        }
    }

    for (let server in serversToHack) {
        let serverName = serversToHack[server];
        await ns.killall(serverName);
        await ns.scp("hack.js", serverName);
        let threads = Math.floor((ns.getServerMaxRam(serverName) - ns.getServerUsedRam(serverName)) / hackScriptCost);
        if (threads > 0) {
            await ns.exec("hack.js", serverName, threads, target);
        }

        await ns.sleep(50);
    }
}