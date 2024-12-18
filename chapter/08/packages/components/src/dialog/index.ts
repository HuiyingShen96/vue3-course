import { createApp, h } from 'vue';
import { DialogComponent } from './dialog';

type IDialogParams = {
  text: string;
  onOk: () => void;
}

function createDialog(params: IDialogParams) {
  const dom = document.createElement('div');
  const body = document.querySelector('body') as HTMLBodyElement;
  body.append(dom);

  const app = createApp({
    render() {
      return h(DialogComponent, {
        text: params.text,
        onOnOk: params.onOk
      })
    }
  })
  app.mount(dom);

  return {
    close: () => {
      app.unmount();
      dom.remove();
    }
  };
}

const Dialog = {
  createDialog,
}

export default Dialog;