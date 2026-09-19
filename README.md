# bingaochen.github.io

个人学术主页。纯静态，没有构建步骤 —— 改 HTML、push、刷新即可。

版式改编自 [Anqi Li 的主页](https://aq-li.github.io/)，其本身源自 [Jon Barron 的学术主页模板](https://jonbarron.info/)。

## 文件结构

```
index.html            # 全部内容
stylesheet.css        # 样式（含移动端响应式；文件末尾是本站新增的规则）
images/
  profile/photo.jpg   # 头像
  logos/*.png         # 四个机构 logo，统一 300x300 透明 PNG
  tau0/teaser.png     # 论文配图
  wechat/qr.png       # 微信二维码
.nojekyll             # 让 GitHub Pages 跳过 Jekyll，直接发布原始文件
```

## 本地预览

```bash
cd my-homepage
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 首次部署

个人主页仓库必须命名为 `bingaochen.github.io`（要求 GitHub 用户名就是 `bingaochen`）。

1. 在 GitHub 新建 **public** 仓库 `bingaochen.github.io`，不要勾选任何初始化文件。
2. 在本文件夹执行：

```bash
git init -b main
git add .
git commit -m "Initial homepage"
git remote add origin https://github.com/bingaochen/bingaochen.github.io.git
git push -u origin main
```

3. 仓库 → Settings → Pages → Source 选 **Deploy from a branch**，分支 `main`、目录 `/ (root)`，保存。
4. 一两分钟后访问 https://bingaochen.github.io 。

以后更新：`git add . && git commit -m "update" && git push`。

## 日常维护

**加一条 News** —— 复制 `<ul class="news-list">` 里任意一个 `<li>`，放到最上面（倒序排列）：

```html
<li><span class="news-date">2026.11</span><span class="news-dot">•</span>🎉 内容</li>
```

**加一篇论文** —— 整段复制 Research 里的 `<tbody class="research-item highlight">`。
配图放 `images/<项目名>/`。注意图框的长宽比由 CSS 控制：

- 默认 `230/165`（约 4:3）
- 宽幅图加 `class="release-teaser"`，其比例在 `stylesheet.css` 里定义，目前是 `1400/667`，换图时同步改

**加悬停动图** —— 在 `<div class="static-img">` 后面加：

```html
<div class="animated-img"><img src="images/xxx/demo.gif" alt="..."></div>
```

没有 `.animated-img` 时悬停不会有任何变化（CSS 用 `:has()` 做了保护，否则图会淡出成白底）。

**加回 GitHub / Scholar / CV 链接** —— `.social-links` 上方的注释里有现成格式。

**换微信码** —— 替换 `images/wechat/qr.png`。存 PNG 不要存 JPEG（JPEG 压缩会让黑白边缘产生噪点，影响识别），四周要留白边。

**找工作那句橙色提示** —— `<span class="highlight-note">`，定下来之后删掉整段。

## 几个容易踩的坑

- **图片别太大**。原模板作者的仓库 126MB，几乎全是 demo GIF。单个控制在 5MB 以内，GitHub 拒绝超过 100MB 的文件。
- **logo 要裁紧、转透明**。页面底色是 `#fafafa`，白底方图会露出一圈白边；四周留空白则会显得比别的 logo 小。
- **访客地图已移除**。原模板的 mapmyvisitors 脚本绑定的是原作者的域名。要用就去 mapmyvisitors.com 注册自己的，`index.html` 里有注释掉的位置。
- **保留 footer 的模板出处**，这是学术主页的惯例。
- Font Awesome 图标从 CDN 加载，断网时图标不显示，页面本身不受影响。
