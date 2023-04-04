# Scripts for use with Bitburner  
## spider.js  
Spider is used to crawl every server, run the basic hacking scripts, attempt to run nuke, and has an optional portion that will automatically install a backdoor if you have singularity functions installed.  
## autohack.js  
`run autohack.js [target] [tags]`  
Autohack is an early game hack manager that pulls the servernames from serverlist.txt, attempts to install hack.js and run it while pointing at a designated target server.  
Additions flags include:
* -h : use hellfyre servers
* -m : open the console to track autohack.js  
## hack.js  
Hack is a super basic hacking script that checks if the target needs to be weakened, then grown, then finally hacked. Loops forever. For use with autohack.js.  
## hellfyreManager.js  
Hellfyre Manger is a script that will automatically purchase, upgrade and maintain purchased serves, known as the Hellfyre Array.  
## shareware.js  
Shareware will use the hellfyre array to increase share power using share.js.  
## share.js  
Share will just loop running share(), increases the reputation gained through faction work.
