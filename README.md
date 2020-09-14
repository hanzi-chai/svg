# hanzi-chai/svg

`hanzi-chai/svg` 是一个用于高效校对「文」数据库中笔画数据信息的工具。

# 安装

首先确保安装好 Node.js 并克隆本仓库。

1. 将 `glyphs.ttf` 复制到 `/assets/` 下；
2. `npm install` 安装依赖；
3. `npm run glyphs` 生成字体文件缓存；
4. `npm run build` 生成前端页面；
5. （开发环境）`npm test` 试运行；
6. （生产环境）`npm start` 运行；
7. （生产环境）`npm stop` 停止。

# 运行

1. 访问 4000 端口；
2. 在左侧列表中选取要修改的字；
3. 调整右方表单；
4. 将该字标记为已完成；
5. 点击保存，上传到服务器。
