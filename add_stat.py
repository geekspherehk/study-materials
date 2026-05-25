#!/usr/bin/env python3
import os, glob

pages_dir = '/root/study-materials'
stat_script = """
<!-- 不蒜子访问统计 -->
<script async defer src="https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
<div style="text-align:center;font-size:0.75rem;color:#94a3b8;padding:8px 0">
  本站总访问量 <span id="busuanzi_value_site_pv"></span> 次 ·
  访客数 <span id="busuanzi_value_site_uv"></span> 人 ·
  当前页面浏览量 <span id="busuanzi_value_page_pv"></span> 次
</div>"""

def add_stat_to_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 跳过已添加过的文件
    if 'busuanzi' in content:
        return False
    
    # 在 </body> 前插入
    inserted = content.replace('</body>', stat_script + '\n</body>')
    if inserted != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(inserted)
        return True
    return False

# 处理所有 HTML 文件
html_files = glob.glob(os.path.join(pages_dir, '*.html'))
updated = []
for fp in html_files:
    if add_stat_to_file(fp):
        updated.append(os.path.basename(fp))

print(f"已更新 {len(updated)} 个文件:")
for f in updated:
    print(f"  {f}")
