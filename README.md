# Raspi installation

```
docker run --name agc-webui --restart=always -d -p 80:8080 -v /data/agc-webui:/opt/app -e APP_DIR=/opt/app/app -e APP_START="node src/start.js" -e DATA_DIR=/opt/app/data -e MQTT=10.1.0.12 -e REPOSITORY=https://github.com/burgrp/agc-webui-416 burgrp/npg-rpi
```