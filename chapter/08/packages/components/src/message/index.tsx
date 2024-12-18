/**
 * Vue.js 3.x 动态渲染组件本质就是渲染一个独立的 Vue.js 3.x 的应用
 */

import { createApp, h } from 'vue';
import { IMessageParams } from './src/type';
import MessageComponent from './src/message.vue';

const Message = {
  open(params: IMessageParams) {
    const dom = document.createElement('div');
    const body = document.querySelector('body') as HTMLBodyElement;
    let duration: number | undefined = params.duration;
    if (duration === undefined) {
      duration = 3000;
    }
    body.appendChild(dom);
    const msg = h(MessageComponent, {
      text: params.text,
      type: params.type
    });
    const app = createApp({
      render() {
        return msg;
      }
    });
    app.mount(dom);

    // 封装内部关闭函数
    const internalClose = () => {
      // 隐藏 dom
      msg.component?.exposed?.['closeMessage']?.();
      // 卸载 app
      app.unmount();
      // 移除 dom
      dom.remove();
    };

    let timer: number | null = null;
    if (duration > 0) {
      timer = setTimeout(() => {
        internalClose();
      }, duration);
    }

    // 最后返回可控制 Message 关闭的 close 函数
    return {
      close: () => {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        internalClose();
      }
    };
  }
};

export default Message;
