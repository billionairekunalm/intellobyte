# Team section: CTO gets the same large card as the CEO, John Doe removed.
# Layout: row 1 = CEO | CTO (large), row 2 = Shinjini | Vaibhav (small). Re-run after mirror.mjs (after content.mjs, photo.py).
import base64, glob, io
from PIL import Image

f = glob.glob("site/_fc/sites/*/wKdCdYdBgWSD0ogMJUdHCpg5x9_02irOBfc0F__PCCU.*.mjs")[0]
s = open(f, encoding="utf8").read()
if "framer-drsf1f" not in s:
    raise SystemExit("already applied")

# 1. CTO card image: same svg-wrapper recipe as the CEO card
p = Image.open("pranav.webp").convert("RGB")
pw, ph = p.size
sq = p.crop((0, int(ph * 0.10), pw, int(ph * 0.10) + pw)).resize((672, 672), Image.LANCZOS)
buf = io.BytesIO(); sq.save(buf, "JPEG", quality=88)
b64 = base64.b64encode(buf.getvalue()).decode()
open("site/_fc/images/pranavcard.svg", "w").write(
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="336" height="336" viewBox="0 0 336 336">'
    f'<image width="336" height="336" preserveAspectRatio="xMidYMid slice" xlink:href="data:image/jpeg;base64,{b64}"/></svg>')

# 2. restructure the JSX
EAQ = "v(`div`,{className:`framer-eaqeh8`,children:["
SMALL = "_(H,{breakpoint:y,overrides:{ie4L5hiuU:{width:`369px`}},children:_(U,{height:286,children:_(q,{className:`framer-%s-container`"
a = s.index(EAQ)
ceo_start = a + len(EAQ)
drs = s.index("v(`div`,{className:`framer-drsf1f`")
ceo = s[ceo_start:drs]  # ends with "}),"
shin = s[s.index(SMALL % "f11kka"):s.index("]})]}),v(`div`,{className:`framer-fxjusf`")]
shin = shin.replace("framer-f11kka-container", "framer-4i7bc4-container")  # reuse the row-2 sizing class John Doe's slot had
vaib = s[s.index(SMALL % "c4j0kc"):s.index(SMALL % "4i7bc4")].rstrip(",")
john_end = s.index("]})]})]})}),_(S.div,{className:`framer-wu36fu`")

cto = (ceo.replace("Kunal Manjare", "Pranav Patil").replace("`CEO`", "`CTO`")
          .replace("CFtXjD8ql", "CFtXjD8qX").replace("nwNu2S8Ia", "nwNu2S8Ib").replace("EQcyUImp0", "EQcyUImp1")
          .replace("9l4yP2TozMt7PV8IQVfJVwfPXVc.svg", "pranavcard.svg"))
assert cto.count("Pranav Patil") == 1 and "pranavcard.svg" in cto and "`CTO`" in cto

new = (EAQ + ceo + cto.rstrip(",") + "]}),v(`div`,{className:`framer-fxjusf`,\"data-framer-name\":`03`,children:[" + shin + "," + vaib)
s = s[:a] + new + s[john_end:]
open(f, "w", encoding="utf8").write(s)
print("team restructured")
