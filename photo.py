# Replaces the template's CEO photos with ceo.webp. Re-run after mirror.mjs.
import base64, io, os, shutil
from PIL import Image

IMG = "site/_fc/images"
SRC = "ceo.webp"
os.makedirs("backup", exist_ok=True)
for f in ("SXSxBewFpUbMT1trajLleO10P3Y.png", "9l4yP2TozMt7PV8IQVfJVwfPXVc.svg"):
    if not os.path.exists(f"backup/{f}"):
        shutil.copy(f"{IMG}/{f}", f"backup/{f}")

im = Image.open(SRC).convert("RGB")
w, h = im.size

# About quote card: 480x750 portrait (black-background CEO photo), cover crop, biased to the top
ab = Image.open("ceo-black.webp").convert("RGB")
aw, ah = ab.size
tw, th = 480, 750
s = max(tw / aw, th / ah)
r = ab.resize((round(aw * s), round(ah * s)), Image.LANCZOS)
x = (r.width - tw) // 2
y = min(int(r.height * 0.02), r.height - th)
r.crop((x, y, x + tw, y + th)).save(f"{IMG}/SXSxBewFpUbMT1trajLleO10P3Y.png")

# Team card: 336x336 svg wrapper around a square head-and-shoulders crop
sq = im.crop((0, int(h * 0.08), w, int(h * 0.08) + w)).resize((672, 672), Image.LANCZOS)
buf = io.BytesIO(); sq.save(buf, "JPEG", quality=88)
b64 = base64.b64encode(buf.getvalue()).decode()
open(f"{IMG}/9l4yP2TozMt7PV8IQVfJVwfPXVc.svg", "w").write(
    f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="336" height="336" viewBox="0 0 336 336">'
    f'<image width="336" height="336" preserveAspectRatio="xMidYMid slice" xlink:href="data:image/jpeg;base64,{b64}"/></svg>')
print("done")

# CTO Pranav Patil: 378x378 team avatar
f = "rqVSVnAHhoNthlE03dQvbuRWlM.png"
if not os.path.exists(f"backup/{f}"):
    shutil.copy(f"{IMG}/{f}", f"backup/{f}")
p = Image.open("pranav.webp").convert("RGB")
pw, ph = p.size
p.crop((0, int(ph * 0.10), pw, int(ph * 0.10) + pw)).resize((378, 378), Image.LANCZOS).save(f"{IMG}/{f}")
print("pranav done")

# Shinjini Mondal: 378x378 team avatar
f = "tqt3396FxEMSQd1qcaERFm8p29I.png"
if not os.path.exists(f"backup/{f}"):
    shutil.copy(f"{IMG}/{f}", f"backup/{f}")
p = Image.open("shinjini.webp").convert("RGB")
pw, ph = p.size
p.crop((0, int(ph * 0.10), pw, int(ph * 0.10) + pw)).resize((378, 378), Image.LANCZOS).save(f"{IMG}/{f}")
print("shinjini done")

# Divyanshu Patil (Lead Developer): 378x378 team avatar
f = "u07YBaHc16abPJ4SfKOSMz3o9Y.png"
if not os.path.exists(f"backup/{f}"):
    shutil.copy(f"{IMG}/{f}", f"backup/{f}")
p = Image.open("divyanshu.webp").convert("RGB")
pw, ph = p.size
p.crop((0, int(ph * 0.10), pw, int(ph * 0.10) + pw)).resize((378, 378), Image.LANCZOS).save(f"{IMG}/{f}")
print("divyanshu done")
