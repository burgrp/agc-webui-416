wg.pages.home = {
    async render(container) {

        function createToggle(name, title, color, values = [false, true]) {
            
            let button = BUTTON("push").text(title);
            let state;

            function updateByReg(reg) {
                state = reg && (reg.value === undefined? undefined: (reg.value === values[1]));
                button.toggleClass("red", state === undefined);
                button.toggleClass(color, state == true);
            }

            button.onRegisterChanged((n, r) => {
                if (n === name) {
                    updateByReg(r);
                }
            });

            button.click(e => {
                if (state !== undefined) {
                    state = !state;
                    wg.display.setRegister(name, state);
                }
            });
    
            updateByReg(display.registers[name]);

            return button;
        }

        (await display.header(container, "home")).append([
            DIV("panel", [
                DIV("group", [
                    DIV("title").text("ON / OFF"),
                    SPAN("content", [
                        TABLE([
                            TR([
                                TD({colspan: 5}, [
                                    DIV("group-vdiv").text("1st rad")
                                ])
                            ]),
                            TR([
                                TD([createToggle("zone.lounge.manual.rad", "Oby", "yellow")]),
                                TD([createToggle("zone.bathRoomF1.manual.rad", "Ko1", "yellow")]),
                                TD([createToggle("zone.guestRoom.manual.rad", "Hst", "yellow")]),
                                TD([createToggle("zone.bedRoom.manual.rad", "Lo1", "yellow")]),
                                TD([createToggle("zone.hall.manual.rad", "Hal", "yellow")])
                            ]),
                            TR([
                                TD({colspan: 5}, [
                                    DIV("group-vdiv").text("Floor")
                                ])
                            ]),
                            TR([
                                TD([createToggle("zone.lounge.manual.floor", "Oby", "yellow")]),
                                TD([createToggle("zone.bathRoomF1.manual.floor", "Ko1", "yellow")]),
                                TD([createToggle("zone.bathRoomF2.manual.floor", "Ko2", "yellow")]),
                                TD([]),
                                TD([createToggle("zone.hall.manual.floor", "Hal", "yellow")]),
                            ]),
                            TR([
                                TD({colspan: 5}, [
                                    DIV("group-vdiv").text("2nd rad")
                                ])
                            ]),
                            TR([
                                TD([createToggle("zone.chRoomWest.manual.rad", "Eda", "yellow")]),
                                TD([createToggle("zone.atelier.manual.rad", "Atl", "yellow")]),
                                TD([createToggle("zone.bathRoomF2.manual.rad", "Ko2", "yellow")]),
                                TD([createToggle("zone.lab.manual.rad", "Lab", "yellow")]),
                                TD([createToggle("zone.chRoomEast.manual.rad", "Lo2", "yellow")])
                            ])
                        ])
                    ])
                ])
            ])
        ]);
    }
}