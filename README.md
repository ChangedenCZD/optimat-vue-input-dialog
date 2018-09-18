# 文本输入对话框
## 使用方式（Usage）
### 安装（Install）
``
npm install optimat-vue-input-dialog -save
``

### 导入（Import）
#### *.js
```javascript
import InputDialog from 'optimat-vue-input-dialog'
```
#### *.vue
```vue
<script>
    import InputDialog from 'optimat-vue-input-dialog'
</script>
```
### 标签（Target）
#### *vue
```html
<InputDialog :options="inputDialogOptions"></InputDialog>
```

### 功能（Api）

| Options         | Type     | Description                 | Default | Result   |
|-----------------|:--------:|:---------------------------:|:--------:|:--------:|
| title  | string | 对话框标题 | "" | |
| content  | string | 对话框内容 | "" | |
| inputHint  | string | 输入框占位内容 | "" | |
| defaultValue  | string | 对话框默认内容 | "" | |
| isShow  | boolean | 是否显示对话框图层 | false | |
| showMask  | boolean | 是否显示半透明蒙版 | false | |
| autoDismiss  | boolean | 点击对话框外部是否自动隐藏 | true | |
| onHide  | function | 对话框隐藏事件 | undefined | |
| onCancel  | function | 点击取消按钮时执行 | undefined | |
| onConfirm  | function | 点击确认按钮时执行 | undefined | (inputText) |
| primaryColor  | string | 主颜色（HEX） | #00AAEE | |
| confirmButtonColor  | string | 确认按钮颜色（HEX） | #00AAEE | |
| cancelButtonColor  | string | 取消按钮颜色（HEX） | #00AAEE | |