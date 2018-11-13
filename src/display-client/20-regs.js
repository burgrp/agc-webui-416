display.regMode = "list";

wg.pages.regs = {
    async render(container) {

        let regListDiv = DIV("matrix-lcd reg-list");
        let regUpdates = {};
        let deviceDivs = {};

        function clear() {
            regListDiv.empty();
            regUpdates = {};
            deviceDivs = {};
        }

        function refresh(mode) {
            display.regMode = mode;
            $(".push.mode").toggleClass("yellow", false);
            $(".push.mode." + mode).toggleClass("yellow", true);
            clear();
            Object.entries(display.registers).forEach(([name, reg]) => updateReg(name, reg));
        }

        (await display.header(container, "regs")).append(
            SPAN("panel", [
                regListDiv,
                DIV("group", [
                    DIV("title").text("Display"),
                    DIV("content", [
                        DIV([
                            BUTTON("push").text("Clear").click(clear),
                            BUTTON("push mode list").text("List").click(() => refresh("list")),
                            BUTTON("push mode device").text("Device").click(() => refresh("device")),
                        ])
                    ])
                ])
            ])
        );

        function updateReg(name, reg) {
            if (!regUpdates[name]) {
                
                let elValue = DIV("reg-val");
                regUpdates[name] = reg => {
                    elValue.text((reg.value === undefined? "?": reg.value).toString().padStart(8, "."));
                };                
                
                let elReg = SPAN("reg", [
                    SPAN("reg-name").text(name.padEnd(40, ".")),
                    elValue
                ]);

                if (display.regMode === "device") {
                    let device = (reg.meta && reg.meta.device) || "Others";
                    if (!deviceDivs[device]) {
                        deviceDivs[device] = DIV([
                            SPAN().text(device + ":")
                        ]).appendTo(regListDiv);
                    }
                    deviceDivs[device].append(elReg);
                } else {
                    regListDiv.append(elReg);    
                }
                
            }
            regUpdates[name](reg);
        }

        refresh(display.regMode);
        regListDiv.onRegisterChanged(updateReg);

    }    
}
