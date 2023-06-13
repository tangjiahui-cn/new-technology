# webpack5 模块联邦

## 一、运行公共模块
```js
cd appA

pnpm install && pnpm build

cd dist && http-server
```

## 二、测试引入模块
```js
cd appB

pnpm install

pnpm dev
```