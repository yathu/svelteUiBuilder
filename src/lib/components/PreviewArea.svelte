<script>
  import { generatedCode } from '../stores.js';
  
  function createPreviewHtml(code) {
    const doctype = '<!DOCTYPE html>';
    const htmlOpen = '<html>';
    const headOpen = '<head>';
    const metaCharset = '<meta charset="utf-8">';
    const metaViewport = '<meta name="viewport" content="width=device-width, initial-scale=1">';
    const tailwindScript = '<script src="https://cdn.tailwindcss.com"><\/script>';
    const headClose = '</head>';
    const bodyOpen = '<body class="p-4 bg-white">';
    const bodyClose = '</body>';
    const htmlClose = '</html>';
    
    return doctype + htmlOpen + headOpen + metaCharset + metaViewport + tailwindScript + headClose + bodyOpen + code + bodyClose + htmlClose;
  }
  
  const previewContent = $derived.by(() => createPreviewHtml($generatedCode));
</script>

<div class="flex flex-col h-full">
  <!-- Code Panel -->
  <div class="flex-1 border-b border-gray-500">
    <div class="h-full flex flex-col">
      <div class="px-4 py-2 bg-white/5 border-b border-gray-500">
        <h3 class="text-sm font-medium">Generated Code</h3>
      </div>
      <div class="flex-1 overflow-auto">
        <pre class="p-4 text-sm font-mono h-full"><code>{$generatedCode}</code></pre>
      </div>
    </div>
  </div>
  
  <!-- Preview Panel -->
  <div class="flex-1">
    <div class="h-full flex flex-col">
      <div class="px-4 py-2 bg-white/5 border-b border-gray-500">
        <h3 class="text-sm font-medium">Live Preview</h3>
      </div>
      <div class="flex-1">
        <iframe 
          srcdoc={previewContent}
          class="w-full h-full border-0"
          title="Live Preview"
        ></iframe>
      </div>
    </div>
  </div>
</div>
