import Clipboard from 'clipboard';

const copyToClipboard = (
  text: string,
  callback: () => void,
) => {
  const dom = document.createElement('div');
  dom.setAttribute('data-clipboard-action', 'copy');
  dom.setAttribute('data-clipboard-text', text);
  const clip = new Clipboard(dom);

  clip.on('success', () => {
    if (callback === undefined || typeof callback !== 'function') {
      return;
    }
    callback();
  });

  dom.click();
  clip.destroy();
};

export default copyToClipboard;
