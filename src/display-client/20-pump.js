wg.pages.pump = {
    async render(container) {
        let panel = DIV("panel regs");
        (await display.header(container, "pump")).append(panel);

        let regLists = {};

        function updateRegister(name, reg) {
            let device = (reg.meta && reg.meta.device) || "Others";
            let regList = regLists[device];
            if (!regList) {
                regList = DIV("matrix-lcd reg-list");
                regLists[device] = regList;
                DIV("group", [
                    DIV("title").text(device),
                    DIV("content",[regList])                    
                ]).appendTo(panel);
            }
            DIV().appendTo(regList).text(
                name.padEnd(30, ".") + 
                (reg.value === undefined? "?": reg.value).toString().padStart(8, "."));
        }

        Object.entries((await wg.display.getRegisters())).forEach(([name, reg]) => updateRegister(name, reg));
    }
}