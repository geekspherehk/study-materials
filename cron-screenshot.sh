#!/usr/bin/env python3
"""Weekly screenshot script for study-materials website."""
import subprocess, sys, os

REPO = "/root/study-materials"
OUTPUT = os.path.join(REPO, "screenshots")

def run(cmd, cwd=None):
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=cwd or REPO)
    if r.returncode:
        print(f"ERROR: {cmd}\n{r.stderr}", file=sys.stderr)
        sys.exit(1)
    return r.stdout

os.makedirs(OUTPUT, exist_ok=True)

# 1. git pull latest
run("git pull origin main")

# 2. Start a temporary server and take screenshots
server = subprocess.Popen(
    ["python3", "-m", "http.server", "8080"],
    cwd=REPO, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
)

# 3. Run screenshot script
screenshot_script = os.path.join(REPO, "screenshot2.js")
run(f"node {screenshot_script}")

# 4. Kill the server
server.terminate()
server.wait()

print("Weekly screenshots complete!")
