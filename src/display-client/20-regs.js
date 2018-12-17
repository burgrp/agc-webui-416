wg.pages.regs = {
    async render(container) {

        let nameToClass = name => name.replace(/[ .]/g, "-");

        let groups = DIV("panel raw-regs");
        (await display.header(container, "regs")).append(groups);

        function updateRegister(name, reg) {
                let device = (reg.meta && reg.meta.device) || "Others";

                let regsDiv = $(".content.device." + nameToClass(device));
                
                if (!regsDiv.length) {
                        let title = [...device].map(ch => (ch === ch.toUpperCase() && ch !== ch.toLowerCase()? " ": "") + ch.toLowerCase()).join("");
                        groups.append(DIV("group", [
                                DIV("title").text(title),
                                DIV("content device " + nameToClass(device), div => regsDiv = div)

                        ]));
                }

                    
                let valueDiv = regsDiv.find(".value." + nameToClass(name));
                if (!valueDiv.length) {
                        regsDiv.append(DIV("reg", [
                                DIV("name").text(name),
                                DIV("value " + nameToClass(name), div => valueDiv = div)
                        ]));                        
                }

                valueDiv.text(
                        reg.value === true || reg.value === false || reg.value === undefined? "": 
                        typeof reg.value === "number"? reg.value.toFixed(/^zone\..*\.valve\./.test(name)?0: 1):
                        reg.value
                );
                valueDiv.toggleClass("on", reg.value === true);
                valueDiv.toggleClass("off", reg.value === false);
                valueDiv.toggleClass("undefined", reg.value === undefined);
                valueDiv.toggleClass("seg7", typeof reg.value === "number");

        }

        groups.onRegisterChanged(updateRegister);
        Object.entries((await wg.display.getRegisters())).forEach(([name, reg]) => updateRegister(name, reg));
    }    
}
