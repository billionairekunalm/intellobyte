# One-off image diet for the Framer mirror: cap size, recompress. PNGs become WebP bytes under the same
# .png name (app route sniffs the real type); embedded rasters inside SVGs are re-encoded as WebP.
import re, io, base64, glob, os, sys
from PIL import Image
CAP, MINB = 1600, 60_000
def enc(im, fmt):
    b = io.BytesIO()
    if fmt == "jpeg": im.convert("RGB").save(b, "JPEG", quality=78, optimize=True, progressive=True)
    else: im.save(b, "WEBP", quality=80, method=6)
    return b.getvalue()
def shrink(im, cap):
    if max(im.size) > cap: im.thumbnail((cap, cap), Image.LANCZOS)
    return im
saved = 0
for f in glob.glob("site/_fc/**/*", recursive=True):
    if not os.path.isfile(f) or os.path.getsize(f) < MINB: continue
    ext = os.path.splitext(f)[1].lower(); old = open(f, "rb").read(); new = None
    try:
        if ext in (".jpg", ".jpeg"):
            new = enc(shrink(Image.open(io.BytesIO(old)), CAP), "jpeg")
        elif ext == ".png":
            im = Image.open(io.BytesIO(old))
            if old[:4] == b"RIFF": continue  # already converted
            new = enc(shrink(im, CAP), "webp")
        elif ext == ".svg":
            t = old.decode("utf8")
            def sub(m):
                im = shrink(Image.open(io.BytesIO(base64.b64decode(m.group(2)))), 1200)
                return "data:image/webp;base64," + base64.b64encode(enc(im, "webp")).decode()
            t2 = re.sub(r"data:image/(jpeg|png);base64,([A-Za-z0-9+/=]+)", sub, t)
            if t2 != t: new = t2.encode("utf8")
    except Exception as e:
        print("skip", f, e); continue
    if new and len(new) < len(old):
        open(f, "wb").write(new); saved += len(old) - len(new)
print("saved MB:", round(saved / 1e6, 1))
