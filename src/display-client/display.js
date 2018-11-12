function renderDisplay(container, content) {
    DIV([
        SPAN("display-header", [
            DIV().text("Zones"),
            DIV("selected").text("Heating"),
            DIV().text("Pump"),
            DIV().text("Water"),
            DIV().text("Regs")           
        ]),
        DIV("display-content", content)
    ]).appendTo(container);
}


wg.pages.home = {
    async render(container) {
        renderDisplay(container, [
            SPAN("panel", [
                DIV("group", [
                    DIV("title").text("Panel 1"),
                    DIV("content", [
                        DIV().text("AGC")
                    ])
                ]),
                DIV("group", [
                    DIV("title").text("Time"),
                    SPAN("content", [                        
                        DIV("seg7", div => {
                            function align(n) {
                                return n.toString().padStart(2, "0");
                            }
                            function update() {
                                let d = new Date();
                                div.text(align(d.getHours()) + ":" + align(d.getMinutes()) + ":" + align(d.getSeconds()))
                                setTimeout(update, 1000);
                            }
                            update();
                        })
                    ])
                ])
            ]),
            DIV("panel", [
                DIV("group", [
                    DIV("title").text("Panel 2"),
                    SPAN("content", [
                        BUTTON("push").text("ABC"),
                        BUTTON("push yellow").text("Don't Panic"),
                        BUTTON("push").text("ABC"),
                        BUTTON("push blue").text("ABC"),
                        BUTTON("push").text("ABC"),
                        DIV("seg7").text("123"),
                        BUTTON("push").text("DEF"),
                        BUTTON("push red").text("Master Alarm").click(e => $(e.target).toggleClass("red"))
                    ])
                ])
            ])            
        ]);        
    }
}