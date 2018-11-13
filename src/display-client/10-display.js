let display = {

    sections: {
        "home": "Zones",
        "heating": "Heating",
        "pump": "Pump",
        "regs": "Regs"
    },

    registers: {},

    async header(container, section) {

        document.title = this.sections[section];

        let contentDiv = DIV("display-content");

        let displayDiv = DIV([
            SPAN("display-header", Object.entries(display.sections).map(([sectionKey, sectionTitle]) => AHREF({href: sectionKey}, sectionKey === section? "selected": undefined).text(sectionTitle))),
            contentDiv
        ]).appendTo(container);

        if (!Object.keys(this.registers).length) {
            console.info("Loading registers...");
            this.registers = await wg.display.getRegisters();
        }        

        displayDiv.onRegisterChanged((name, reg) => {
            this.registers[name] = reg;
        });

        return contentDiv;
    }
};

