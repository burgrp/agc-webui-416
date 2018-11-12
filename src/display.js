module.exports = config => {
    return {
        client: __dirname + "/display-client",
        api: {
            display: {
                async getRegisters() {
                    return "jo hned";
                },
                async pozdrav(koho) {
                    return "nazdar " + koho;
                }
            }
        }
    }
}