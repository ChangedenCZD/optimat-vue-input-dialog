import { BaseModule, mapGetters } from './lib/BaseModule';

class Component extends BaseModule {
    constructor () {
        super();
        this.setProps(['options']);
        this.setComponent({});
        this.setMethod({
            setOptions () {
                let options = this.options || {};
                this.isShow = !!options.isShow;
                this.title = options.title || '';
                this.content = options.content || '';
                this.onHide = typeof options.onHide === 'function' ? options.onHide : null;
                this.onCancel = typeof options.onCancel === 'function' ? options.onCancel : null;
                this.onConfirm = typeof options.onConfirm === 'function' ? options.onConfirm : null;
                this.primaryColor = typeof options.primaryColor === 'string' && options.primaryColor.indexOf('#') === 0 ? options.primaryColor : '#00AAEE';
                this.confirmButtonColor = typeof options.confirmButtonColor === 'string' && options.confirmButtonColor.indexOf('#') === 0 ? options.confirmButtonColor : '#00AAEE';
                this.cancelButtonColor = typeof options.cancelButtonColor === 'string' && options.cancelButtonColor.indexOf('#') === 0 ? options.cancelButtonColor : '#00AAEE';
                this.showMask = typeof options.showMask === 'boolean' ? options.showMask : false;
                this.autoDismiss = typeof  options.autoDismiss === 'boolean' ? options.autoDismiss : true;
                this.inputContent = options.defaultValue || '';
                this.inputHint = options.inputHint || '';
                let minLength = Math.max(0, typeof options.minLength === 'number' ? options.minLength : 0);
                let maxLength = Math.min(140, typeof options.maxLength === 'number' ? options.maxLength : 140);
                if (minLength > maxLength) {
                    this.minLength = maxLength;
                    this.maxLength = minLength;
                } else {
                    this.minLength = minLength;
                    this.maxLength = maxLength;
                }
                this.$nextTick(() => {
                    let el = this.$el.querySelector('.dialog-area');
                    if (el) {
                        el.style.marginTop = `${(this.windowHeight - el.offsetHeight) / 2}px`;
                    }
                });
            },
            hide () {
                this.onHide && this.onHide();
            },
            cancel () {
                this.onCancel && this.onCancel();
                this.tryToHide();
            },
            confirm () {
                let maxLength = this.maxLength;
                let minLength = this.minLength;
                let inputContent = this.inputContent || '';
                let inputContentLength = inputContent.length;
                if (inputContentLength < minLength) {
                    this.inputWarnMessage = `内容不得小于${minLength}位`;
                } else if (inputContentLength > maxLength) {
                    this.inputWarnMessage = `内容不得多于${maxLength}位`;
                } else {
                    this.inputWarnMessage = '';
                    this.onConfirm && this.onConfirm(inputContent);
                    this.tryToHide();
                }
                this.$nextTick(() => {
                    if (this.inputWarnMessage) {
                        this.warnMessageShake = true;
                    }
                });
            },
            tryToHide () {
                if (this.autoDismiss) {
                    this.hide();
                }
            }
        });
        this.setCompute({
            ...mapGetters({
                windowHeight: 'windowHeight',
                windowWidth: 'windowWidth',
                appConfig: 'appConfig'
            })
        });
        this.setWatch({
            options () {
                this.setOptions();
            },
            shake (value) {
                if (value) {
                    let self = this;
                    if (self.autoDismiss) {
                        self.shake = false;
                        self.hide();
                    } else {
                        setTimeout(() => {
                            self.shake = false;
                        }, 300);
                    }
                }
            },
            warnMessageShake (value) {
                if (value) {
                    let self = this;
                    setTimeout(() => {
                        self.warnMessageShake = false;
                    }, 300);
                }
            }
        });
    }

    getData () {
        return {
            isShow: false,
            title: '',
            content: '',
            autoDismiss: true,
            defaultWidth: '',
            defaultHeight: '',
            showMask: false,
            shake: false,
            maxLength: 140,
            minLength: 0,
            inputHint: '',
            inputContent: '',
            inputWarnMessage: '',
            primaryColor: '#00AAEE',
            confirmButtonColor: '#00AAEE',
            cancelButtonColor: '#00AAEE',
            warnMessageShake: false
        };
    }

    onCreate () {
        let app = this.app;
        app.setOptions();
        app.defaultWidth = window.innerWidth;
        app.defaultHeight = window.innerHeight;
    }

    onMount () {
    }
}

module.exports = Component;
