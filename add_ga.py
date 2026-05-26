#!/usr/bin/env python3
import sys
import os

GA_CODE = '''\n<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-9VYY1QD34J"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-9VYY1QD34J');
</script>'''

studies_dir = '/root/study-materials'
files = sorted([f for f in os.listdir(studies_dir) if f.endswith('.html')])

for fname in files:
    path = os.path.join(studies_dir, fname)
    with open(path) as f:
        content = f.read()
    
    original = content
    
    if '</head>' in content:
        # Insert just before </head>
        content = content.replace('</head>', GA_CODE + '\n</head>', 1)
    else:
        # index.html case - insert before </style> on its own line
        content = content.replace('</style>\n', '</style>\n' + GA_CODE + '\n', 1)
    
    if content == original:
        print(f"⚠️  NO CHANGE: {fname}")
    else:
        with open(path, 'w') as f:
            f.write(content)
        print(f"✅ Added GA: {fname}")

print(f"\nDone! Processed {len(files)} files.")
