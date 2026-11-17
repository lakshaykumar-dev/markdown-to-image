import { toPng, toJpeg, toSvg, toBlob } from 'html-to-image';
import confetti from 'canvas-confetti';

export type ExportFormat = 'png' | 'jpeg' | 'svg';

interface ExportOptions {
  scale?: number;
  quality?: number;
  filename?: string;
  format?: ExportFormat;
}

export async function exportCanvasAsImage(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<string> {
  const { scale = 2, quality = 0.95, filename = 'marksnap-render', format = 'png' } = options;

  const htmlToImageOptions = {
    pixelRatio: scale,
    quality,
    cacheBust: true,
    filter: (node: Node) => {
      // Exclude elements with 'no-export' class
      if (node instanceof HTMLElement && node.classList.contains('no-export')) {
        return false;
      }
      return true;
    },
  };

  let dataUrl = '';

  if (format === 'svg') {
    dataUrl = await toSvg(element, htmlToImageOptions);
  } else if (format === 'jpeg') {
    dataUrl = await toJpeg(element, htmlToImageOptions);
  } else {
    dataUrl = await toPng(element, htmlToImageOptions);
  }

  // Trigger download in browser
  const link = document.createElement('a');
  link.download = `${filename}.${format}`;
  link.href = dataUrl;
  link.click();

  triggerConfetti();
  return dataUrl;
}

export async function copyCanvasToClipboard(
  element: HTMLElement,
  scale: number = 2
): Promise<boolean> {
  try {
    const blob = await toBlob(element, {
      pixelRatio: scale,
      cacheBust: true,
      filter: (node: Node) => {
        if (node instanceof HTMLElement && node.classList.contains('no-export')) {
          return false;
        }
        return true;
      },
    });

    if (!blob) {
      throw new Error('Failed to generate image blob');
    }

    // Try modern Clipboard API
    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ]);
      triggerConfetti();
      return true;
    } else {
      throw new Error('ClipboardItem API not supported in this browser');
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    throw error;
  }
}

function triggerConfetti() {
  try {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#a855f7', '#3b82f6', '#ec4899', '#10b981'],
    });
  } catch {
    // Ignore confetti errors if blocked
  }
}
