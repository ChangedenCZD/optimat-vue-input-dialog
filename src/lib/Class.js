import Utils from 'optimat-vue-utils';

const BrowserUtils = Utils.BrowserUtils;
const ObjectSupport = Utils.ObjectSupport;

class Class {
    static to (url) {
        BrowserUtils.to(url);
    }

    static open (url) {
        BrowserUtils.open(url);
    }

    static back () {
        BrowserUtils.back();
    }

    static canBack () {
        return BrowserUtils.canBack();
    }

    static getValidParam (param) {
        return BrowserUtils.getValidParam(param);
    }

    static reload () {
        BrowserUtils.reload();
    }

    static setTitle (title) {
        BrowserUtils.setTitle(title);
    }

    static isSupportCss () {
        return BrowserUtils.cssSupports;
    }

    static clone (object) {
        return ObjectSupport.clone(object);
    }

    static stdout (message) {
        BrowserUtils.stdout(message);
    }

    static computeRemScale () {
        BrowserUtils.computeRemScale();
    }
}

module.exports = Class;
