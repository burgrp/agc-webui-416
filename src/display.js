const mqttReg = require("@device.farm/mqtt-reg");

module.exports = config => {

    let registers = {};
    let events = {
        registerChanged: undefined
    };

    mqttReg.mqttAdvertise(config.mqttBroker, (name, meta) => {
        
        let now = new Date();
        let reg = registers[name];
        
        if (!reg) {
            reg = {};
            registers[name] = reg;

            reg.mqtt = mqttReg.mqttReg(config.mqttBroker, name, (newValue, oldValue) => {
                reg.value = newValue;
                reg.previousValue = oldValue;
                reg.lastSeen = new Date();
                events.registerChanged(name, reg);
            });

            events.registerChanged(name, reg);
        }

        reg.lastSeen = new Date();
        reg.meta = meta;
    });

    return {
        client: __dirname + "/display-client",
        api: {
            display: {
                async getRegisters() {
                    return registers;
                },
                async setRegister(name, value) {
                    let reg = registers[name];
                    if (!reg) {
                        throw "Unknown register " + name;
                    }
                    reg.mqtt.set(value);
                }
            }
        },
        events
    }
}