/** @param {NS} ns */
export async function main(ns) {
    let target = ns.args[0];
    let securityLevelMin;
    let currentSecurityLevel;
    let serverMaxMoney;
    let serverMoneyAvailable;

    while (true) {
        securityLevelMin = ns.getServerMinSecurityLevel(target);
        currentSecurityLevel = ns.getServerSecurityLevel(target);

        serverMoneyAvailable = ns.getServerMoneyAvailable(target);
        serverMaxMoney = ns.getServerMaxMoney(target);

        if (currentSecurityLevel > securityLevelMin + 5) {
            await ns.weaken(target);
            currentSecurityLevel = ns.getServerSecurityLevel(target)
        }

        else if (serverMoneyAvailable < (serverMaxMoney * 0.75)) {
            await ns.grow(target);
            serverMoneyAvailable = ns.getServerMoneyAvailable(target);
            serverMaxMoney = ns.getServerMaxMoney(target);
        }
        else {
            await ns.hack(target);
            serverMoneyAvailable = ns.getServerMoneyAvailable(target)
            serverMaxMoney = ns.getServerMaxMoney(target);
        }
    }
}