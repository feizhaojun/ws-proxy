# Websocket Proxy

1. 在 config.js 填写需要代理的目标机器的 ip 地址
2. 执行：
```
npm i
npm start <string>
```

npm start 后面跟需要代理的组件名称，用逗号分隔，如：

```
npm start cainiao,pinduoduo,doudian,kuaishou
```

如果需要代理所有，参数留空：

```
npm start
```

# 注意

如果要代理某个打印组件，当然要现在目标主机上启动！