import { Component, signal, ViewChild, ViewEncapsulation, type AfterViewInit, type ElementRef } from '@angular/core';
import { marked } from 'marked';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-editor',
  imports: [
    MarkdownComponent
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements AfterViewInit {
  private isSyncing = signal(false);
  @ViewChild('markdown_input') editor!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('preview') preview!: ElementRef<HTMLElement>;

  previewHtmlStr = '<h1>hello</h1>';

  ngAfterViewInit(): void {
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
  }

  onScroll(source: 'editor' | 'viewer'): void {
    if (this.isSyncing()) return; // 防止递归调用

    this.isSyncing.set(true);

    const editor = this.editor.nativeElement;
    const viewer = this.preview.nativeElement;

    const sourceElement = source === 'editor' ? editor : viewer;
    const targetElement = source === 'editor' ? viewer : editor;

    // 计算滚动比例
    const scrollRatio =
      sourceElement.scrollTop /
      (sourceElement.scrollHeight - sourceElement.clientHeight);

    // 应用滚动比例到目标元素
    targetElement.scrollTop =
      scrollRatio * (targetElement.scrollHeight - targetElement.clientHeight);

    this.isSyncing.set(false);
  }

  async parseMarkdown(src: string) {
    this.previewHtmlStr = `
      <div class="markdown-body"> ${await marked.parse(src)} </div>
    `;
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
