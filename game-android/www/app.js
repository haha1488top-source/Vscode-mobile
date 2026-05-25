let fileSystem = {
    "index.html": `<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Привіт Світ!</h1>\n  <button onclick="test()">Тисни мене</button>\n  <script src="app.js"></script>\n</body>\n</html>`,
    "style.css": `body {\n  background: #1e1e24;\n  color: #fff;\n  text-align: center;\n  padding-top: 50px;\n}\nh1 { color: #61afef; }\nbutton { padding: 10px; background: #98c379; border: none; border-radius: 5px; cursor: pointer; }`,
    "app.js": `function test() {\n  alert("Працює прямо з мобільного VS Code!");\n}`
};
let activeFile = "index.html"; let openTabs = ["index.html", "style.css", "app.js"];
const editor = document.getElementById('codeEditor');
function renderFileTree() {
    const tree = document.getElementById('fileTree'); tree.innerHTML = '';
    Object.keys(fileSystem).forEach(file => {
        const div = document.createElement('div'); div.className = `file-item \${file === activeFile ? 'active' : ''}`;
        div.innerText = `📄 \${file}`; div.onclick = () => switchFile(file); tree.appendChild(div);
    });
}
function renderTabs() {
    const container = document.getElementById('tabsContainer'); container.innerHTML = '';
    openTabs.forEach(file => {
        const div = document.createElement('div'); div.className = `tab \${file === activeFile ? 'active' : ''}`;
        div.innerHTML = `<span onclick="switchFile('\${file}')">\${file}</span><button class="close-btn" onclick="closeTab(event, '\${file}')">×</button>`;
        container.appendChild(div);
    });
}
function switchFile(file) {
    if (activeFile && fileSystem[activeFile] !== undefined) fileSystem[activeFile] = editor.value;
    activeFile = file; if (!openTabs.includes(file)) openTabs.push(file);
    editor.value = fileSystem[file] || ''; renderFileTree(); renderTabs();
}
function closeTab(event, file) {
    event.stopPropagation(); if (activeFile === file) fileSystem[file] = editor.value;
    openTabs = openTabs.filter(t => t !== file);
    if (activeFile === file) { activeFile = openTabs.length > 0 ? openTabs[openTabs.length - 1] : null; editor.value = activeFile ? fileSystem[activeFile] : ''; }
    renderFileTree(); renderTabs();
}
function createNewFile() {
    let name = prompt("Ім'я нового файлу:");
    if (name && !fileSystem[name]) { fileSystem[name] = `// Код для \${name}`; switchFile(name); }
}
function togglePreview() {
    const container = document.getElementById('previewContainer'); const iframe = document.getElementById('previewFrame');
    if (container.style.display === 'flex') { container.style.display = 'none'; } else {
        if (activeFile) fileSystem[activeFile] = editor.value;
        let htmlCode = fileSystem["index.html"] || "<body>Немає index.html</body>";
        let cssCode = `<style>\text-align: left; \${fileSystem["style.css"] || ""}</style>`;
        let jsCode = `<script>\n\${fileSystem["app.js"] || ""}\n<\/script>`;
        let finalSource = htmlCode.replace('</head>', `\${cssCode}</head>`).replace('</body>', `\${jsCode}</body>`);
        container.style.display = 'flex';
        const dst = iframe.contentDocument || iframe.contentWindow.document; dst.open(); dst.write(finalSource); dst.close();
    }
}
editor.value = fileSystem[activeFile]; renderFileTree(); renderTabs();
