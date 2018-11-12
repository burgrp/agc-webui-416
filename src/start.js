require("@device.farm/appglue")({require, file: __dirname + "/../config.json", root: require("@device.farm/webglue")}).main(async config => {
    console.info("AGC UI ready");
});