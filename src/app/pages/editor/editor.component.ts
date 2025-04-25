import { Component, ViewChild, type AfterViewInit, type ElementRef } from '@angular/core';
import { marked } from 'marked';

@Component({
  selector: 'app-editor',
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements AfterViewInit {
  @ViewChild('markdown_input') editor!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('preview') preview!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
    this.editor.nativeElement.addEventListener('input', async () => {
      this.preview.nativeElement.innerHTML = await marked.parse(this.editor.nativeElement.value);
    });
  }
  // 复制功能
  async copyPreviewContent() {
    try {
      // 获取带样式的HTML内容
      const content = `
          <!DOCTYPE html>
          <html>
          <head>
              <style>
                  body { font-family: sans-serif; line-height: 1.6; }
                  pre { background: #f8f8f8; padding: 15px; }
                  table { border-collapse: collapse; }
                  td, th { padding: 8px; border: 1px solid #ddd; }
              </style>
          </head>
          <body>
              ${this.preview.nativeElement.innerHTML}
          </body>
          </html>
      `;

      // 复制文本
      const blob = new Blob([content], { type: 'text/html' });
      const data = [new ClipboardItem({ 'text/html': blob })];

      await navigator.clipboard.write(data);
      this.showToast('内容已复制到剪贴板！');
    } catch (err) {
      this.showToast('复制失败，请尝试手动选择复制');
      console.error('复制错误:', err);
    }
  }

  // 提示效果
  showToast(message: string) {
    const toast = document.createElement('div');
    toast.style = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.85);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      animation: fadeInOut 2s;
  `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 2000);
  }
}
